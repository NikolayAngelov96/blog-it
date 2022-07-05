import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Post from "../../models/Post";

export async function getServerSideProps({ query }) {
  const { username } = query;

  await dbConnect();
  const userDoc = await User.findOne({ username }).populate("posts").lean();

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  const user = JSON.parse(JSON.stringify(userDoc));

  let postsDoc = await Post.find({ owner: userDoc._id, published: true })
    .sort({ createdAt: -1 })
    .populate("owner")
    .lean();

  let posts = JSON.parse(JSON.stringify(postsDoc));

  return {
    props: { user, posts },
  };
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </>
  );
};

export default UserProfilePage;
