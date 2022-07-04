import dbConnect from "../lib/dbConnect";
import Post from "../models/Post";
import { useState } from "react";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import User from "../models/User";

// add pagination with limit() and skip() maybe?
const LIMIT = 1;

export async function getServerSideProps() {
  await dbConnect();

  await User.find({});

  const postsDoc = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("owner")
    .lean();

  const posts = postsDoc.map((post) => {
    post._id = post._id.toString();

    post.owner._id = post.owner._id.toString();

    post.createdAt = post.createdAt.getTime();
    post.updatedAt = post.updatedAt.getTime();

    return post;
  });
  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-3/4 mx-auto">
      <PostFeed posts={posts} />

      <Loader show={loading} />
    </div>
  );
}
