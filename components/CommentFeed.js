import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthContext } from "../contexts/AuthContext";
import AuthCheck from "./AuthCheck";

const comments = [1, 2, 3];

const CommentFeed = ({ post }) => {
  return (
    <div className="w-full bg-white p-8 border-t border-black">
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
      {/* post.comments.map */}
      {comments.map((x) => (
        <CommentItem key={x} />
      ))}
    </div>
  );
};

const CommentItem = () => {
  return (
    <div className="flex align-top gap-2 mb-6">
      {/* Link to profile of user */}
      <div className="w-8 h-8 cursor-pointer">
        <img src={`/img/hacker.jpg`} />
      </div>
      <div className="p-2 border border-[#b5bdc4] rounded w-full">
        <div className="">
          <button className="p-1 font-bold hover:bg-[#f6f6f6] rounded">
            {/* Link to user profile */}
            pesho12
          </button>{" "}
          18 Jul
        </div>

        <div className="p-1">Very interesting post. Love it </div>
      </div>
    </div>
  );
};

const CommentForm = ({ postId }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuthContext();

  const addCommentHandler = async (data) => {
    console.log(data);
    console.log(postId);
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
        <button className="w-full py-3 bg-[#3b49df] text-white rounded">
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentFeed;
