import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Post from "../../models/Post";
import PostContent from "../../components/PostContent";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import { useAuthContext } from "../../contexts/AuthContext";
import * as request from "../../lib/request";

export async function getServerSideProps({ params }) {
  const { username, slug } = params;

  await dbConnect();

  const userDoc = await User.findOne({ username }).lean();

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  const user = JSON.parse(JSON.stringify(userDoc));

  let postDoc = await Post.findOne({ slug }).lean();

  if (!postDoc) {
    return {
      notFound: true,
    };
  }

  const post = JSON.parse(JSON.stringify(postDoc));

  return {
    props: { post, user },
  };
}

const PostPage = ({ post, user }) => {
  const { user: currentUser } = useAuthContext();

  const [heartCount, setHeartCount] = useState(post.hearts.length);

  const incrementHeartCount = () => setHeartCount(heartCount + 1);

  const decrementHeartCount = () => setHeartCount(heartCount - 1);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start relative">
        <section className="w-full md:w-3/4 bg-white rounded p-8 border border-[#b5bdc4]">
          <PostContent post={post} user={user} />
          <div className="w-full bg-white p-8 border-t border-black">
            <h3 className="font-bold text-2xl mb-6">Discussion: </h3>

            {/* Comment Item */}
            <div className="flex align-top gap-2">
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
          </div>
        </section>

        <aside className="bg-white rounded p-4 w-full md:w-1/4 sticky top-[100px] right-0">
          <p className="mb-4 text-center">
            <strong>{heartCount} 🤍</strong>
          </p>

          <AuthCheck
            fallback={
              <Link href={`/login`}>
                <button className="py-3 bg-[#3b49df] text-white rounded w-full">
                  💗 Sign up
                </button>
              </Link>
            }
          >
            <HeartButton
              post={post}
              incrementHeartCount={incrementHeartCount}
              decrementHeartCount={decrementHeartCount}
            />
          </AuthCheck>

          {currentUser?._id == post.owner && (
            <>
              <Link href={`/admin/${post.slug}`}>
                <button className="py-2 mt-4 bg-[#3b49df] w-full rounded text-white">
                  Edit Post
                </button>
              </Link>

              <DeleteButton postId={post._id} />
            </>
          )}
        </aside>
      </div>
    </>
  );
};

const DeleteButton = ({ postId }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleDelete = async () => {
    const isSure = confirm("Are you sure");

    if (isSure) {
      try {
        await request.post("/post/delete", { postId }, user);

        router.push("/admin");

        toast.success("Post annihilated", { icon: "🗑️" });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <button
      className="py-2 mt-4 bg-[#df3b3b] w-full rounded text-white"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default PostPage;
