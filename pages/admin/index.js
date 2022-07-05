import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { useAuthContext } from "../../contexts/AuthContext";

const AdminCreatePage = () => {
  return (
    <div>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </div>
  );
};

const CreateNewPost = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const isValid = title.length > 2 && title.length < 50;

  const slug = encodeURI(kebabCase(title));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      slug,
      published: false,
      content: "# hello world",
    };

    try {
      const res = await fetch("http://localhost:3000/api/post/create", {
        headers: {
          "X-Authorization": user.token,
        },
        method: "POST",
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (res.ok != true) {
        throw new Error(data.message);
      }

      toast.success("Post created!");

      router.push(`/admin/${slug}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Title"
          className="w-full p-4 mb-4 rounded focus:outline-[#3b49df]"
        />

        {/* FIX Button styles */}
        <button
          type="submit"
          disabled={!isValid}
          className="px-4 py-2 text-white bg-[#3b49df] rounded border border-[#3b49df] disabled:brightness-50 disabled:cursor-not-allowed"
        >
          Create New Post
        </button>
      </form>

      <p className="mt-4">
        <strong>Slug:</strong> {slug}
      </p>
    </>
  );
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("http://localhost:3000/api/post", {
        method: "GET",
        headers: {
          "X-Authorization": user.token,
        },
      });

      const data = await res.json();

      setPosts(data.posts);
    };

    getPosts();
  }, [user.token]);
  return (
    <>
      <h1 className="text-center text-3xl uppercase font-bold mb-4">
        Manage Your Posts
      </h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

export default AdminCreatePage;
