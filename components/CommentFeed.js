import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuthContext } from "../contexts/AuthContext";
import AuthCheck from "./AuthCheck";
import * as request from "../lib/request";

const CommentFeed = ({ post }) => {
  return (
    <div className="w-full bg-white p-8 border-t border-black" id="comments">
      <h3 className="font-bold text-2xl mb-6">Discussion: </h3>

      <AuthCheck
        fallback={
          <Link href={`/login`}>
            <button className="py-3 bg-[#3b49df] text-white rounded w-full mb-6">
              💗 Log in to Comment
            </button>
          </Link>
        }
      >
        <CommentForm postId={post._id} />
      </AuthCheck>
      {post.comments.map((x) => (
        <CommentItem key={x._id} comment={x} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  const createdAt = new Date(comment.createdAt).toDateString();
  return (
    <div className="flex align-top gap-2 mb-6">
      <Link href={`/${comment.owner_username}`}>
        <div className="w-8 h-8 cursor-pointer rounded-full overflow-hidden">
          <img src={comment?.owner_avatar || `/img/hacker.jpg`} />
        </div>
      </Link>
      <div className="p-2 border border-[#b5bdc4] rounded w-10/12">
        <div className="">
          <Link href={`/${comment.owner_username}`}>
            <button className="p-1 font-bold hover:bg-[#f6f6f6] rounded">
              {comment.owner_username}
            </button>
          </Link>{" "}
          {createdAt}
        </div>

        <div className="p-1">{comment.content}</div>
      </div>
    </div>
  );
};

const CommentForm = ({ postId }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });
  const { user } = useAuthContext();
  const router = useRouter();
  const query = router.query;

  const addCommentHandler = async ({ content }) => {
    try {
      const body = {
        postId,
        content,
      };

      await request.post("/post/addComment", body, user);

      toast.success("Successfully added comment");
      reset({ content: "" });
      router.push(`/${query.username}/${query.slug}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(addCommentHandler)}>
      <div className="flex flex-wrap align-top gap-2 mb-6">
        <div className="w-8 h-8 cursor-pointer rounded-full overflow-hidden">
          <img src={user?.avatar || `/img/hacker.jpg`} />
        </div>
        <textarea
          className="border border-[#b5bdc4] rounded w-10/12 p-4"
          {...register("content")}
        ></textarea>
        <button className="w-10/12 sm:ml-10 py-3 bg-[#3b49df] text-white rounded">
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentFeed;
