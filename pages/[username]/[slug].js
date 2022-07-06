import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Post from "../../models/Post";
import PostContent from "../../components/PostContent";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import { useAuthContext } from "../../contexts/AuthContext";

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

  let post = await Post.findOne({ slug }).lean();

  if (!post) {
    return {
      notFound: true,
    };
  }
  post._id = post._id.toString();
  post.owner = post.owner.toString();
  post.createdAt = post.createdAt.getTime();
  post.updatedAt = post.updatedAt.getTime();

  return {
    props: { post, user },
  };
}

const PostPage = ({ post, user }) => {
  const { user: currentUser } = useAuthContext();

  return (
    <div className="flex gap-4 justify-center">
      <section className="w-3/4 bg-white rounded p-8 border border-[#b5bdc4]">
        <PostContent post={post} user={user} />
      </section>

      <aside className="bg-white rounded p-4 w-1/4">
        <p className="mb-4 text-center">
          <strong>{post.hearts.length} 🤍</strong>
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
          <HeartButton />
        </AuthCheck>

        {/* add delete btn for owner  */}

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
  );
};

const DeleteButton = ({ postId }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleDelete = async () => {
    const isSure = confirm("Are you sure");

    if (isSure) {
      try {
        await fetch("http://localhost:3000/api/post/delete", {
          method: "POST",
          headers: {
            "X-Authorization": user.token,
          },
          body: JSON.stringify({ postId }),
        });

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
