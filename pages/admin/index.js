import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { useAuthContext } from "../../contexts/AuthContext";
import * as request from "../../lib/request";

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
      await request.post("/post/create", postData, user);

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
      try {
        const data = await request.get("/post", user);

        setPosts(data.posts);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    };

    getPosts();
  }, [user]);
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
