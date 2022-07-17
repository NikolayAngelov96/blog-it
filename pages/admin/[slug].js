import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthCheck from "../../components/AuthCheck";
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";
import { useAuthContext } from "../../contexts/AuthContext";
import * as request from "../../lib/request";

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

const postSchema = yup.object().shape({
  content: yup
    .string()
    .required("Content is required")
    .min(6, "Content must be at least 6 characters")
    .max(20000, "Content must be below 20 000 characters"),
});

const AdminEditPage = (props) => {
  return (
    <AuthCheck>
      <PostManager post={props.post} />
    </AuthCheck>
  );
};

const PostManager = ({ post }) => {
  const [preview, setPreview] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-14 md:gap-4">
      <section className="w-full md:w-3/4">
        <h1 className="text-3xl mb-4">{post.title}</h1>
        <p>ID: {post.slug}</p>

        <PostForm defaultValues={post} preview={preview} />
      </section>

      <aside className="w-full md:w-1/4 relative">
        <div className="sticky top-[200px] right-0">
          <h3 className="font-bold text-2xl mb-8">Tools</h3>
          <button
            className="px-4 py-2 bg-[#3b49df] text-white rounded w-full md:w-1/2"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
      </aside>
    </div>
  );
};

const PostForm = ({ defaultValues, preview }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(postSchema),
  });

  const { user } = useAuthContext();
  const router = useRouter();

  const updatePost = async ({ content, published }) => {
    try {
      const body = { content, published, postId: defaultValues._id };

      await request.put("/post/update", body, user);

      reset({ content, published });

      toast.success("Post updated successfully");

      router.push(`/${user.username}/${defaultValues.slug}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      {preview && (
        <div className="border-none w-full text-lg px-4 py-6 mt-6 bg-white rounded">
          <ReactMarkdown className="prose">{watch("content")}</ReactMarkdown>
        </div>
      )}

      {!preview && (
        <form onSubmit={handleSubmit(updatePost)}>
          <div>
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
            <textarea
              className={`h-[60vh] border-none w-full text-lg rounded px-4 py-2 mt-6 ${
                errors.content && "outline-red-500"
              }`}
              {...register("content", { required: true })}
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
