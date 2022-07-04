import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import Post from "../../models/Post";

export async function getServerSideProps({ query }) {
  const { username } = query;

  await dbConnect();
  // Post find() called because next throws an Error(maybe something with imports)
  Post.find({});
  const user = await User.findOne({ username }).populate("posts").lean();

  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = user._id.toString();

  let posts = user.posts;
  posts = posts.map((doc) => {
    doc._id = doc._id.toString();
  });

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
