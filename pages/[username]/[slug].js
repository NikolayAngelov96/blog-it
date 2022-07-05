import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Post from "../../models/Post";
import PostContent from "../../components/PostContent";

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
  return (
    <div className="flex gap-4 justify-center">
      <section className="w-3/4 bg-white rounded p-8 border border-[#b5bdc4]">
        <PostContent post={post} user={user} />
      </section>

      <aside className="bg-white rounded p-4 w-1/5">
        <p>{post.heartCount} 💗</p>
      </aside>
    </div>
  );
};

export default PostPage;
