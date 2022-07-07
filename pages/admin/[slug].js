import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await dbConnect();

  const postDoc = await Post.findOne({ slug }).lean();

  if (!postDoc) {
    return {
      notFound: true,
    };
  }

  const post = JSON.parse(JSON.stringify(postDoc));

  return {
    props: {
      post,
    },
  };
}

const AdminEditPage = (props) => {
  // add post request and Link to Edit post in post feed pass boolean admin and dipslay edit btn
  return (
    <AuthCheck>
      <PostManager post={props.post} />
    </AuthCheck>
  );
};

const PostManager = ({ post }) => {
  const [preview, setPreview] = useState(false);

  console.log(post);
  return (
    <div className="flex gap-4">
      <section className="w-3/4">
        <h1 className="text-3xl mb-4">{post.title}</h1>
        <p>ID: {post.slug}</p>

        <PostForm defaultValues={post} preview={preview} />
      </section>

      <aside className="w-1/4">
        <h3 className="font-bold text-2xl mb-8">Tools</h3>
        <button
          className="px-4 py-2 bg-[#3b49df] text-white rounded w-1/2"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Edit" : "Preview"}
        </button>
      </aside>
    </div>
  );
};

const PostForm = ({ defaultValues, preview }) => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { user } = useAuthContext();
  const router = useRouter();

  const updatePost = async ({ content, published }) => {
    try {
      const res = await fetch("http://localhost:3000/api/post/update", {
        method: "POST",
        headers: {
          "X-Authorization": user.token,
        },
        body: JSON.stringify({ content, published, postId: defaultValues._id }),
      });

      const data = await res.json();

      reset({ content, published });

      toast.success("Post updated successfully");

      router.push(`/${user.username}/${defaultValues.slug}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {preview && (
        <div className="h-[60vh] border-none w-full text-lg rounded px-4 py-6 mt-6 bg-white rounded">
          <ReactMarkdown className="prose">{watch("content")}</ReactMarkdown>
        </div>
      )}

      {!preview && (
        <form onSubmit={handleSubmit(updatePost)}>
          <div>
            <textarea
              className="h-[60vh] border-none w-full text-lg rounded px-4 py-2 mt-6"
              {...register("content")}
            ></textarea>

            <fieldset className="mt-6">
              <input
                className="cursor-pointer"
                {...register("published")}
                id="published"
                type="checkbox"
              />
              <label htmlFor="published" className="cursor-pointer text-lg">
                Published
              </label>
            </fieldset>

            <button
              type="submit"
              className="w-full bg-[#3b49df] rounded text-white py-3 mt-6"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AdminEditPage;
