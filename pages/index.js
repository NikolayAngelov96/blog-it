import dbConnect from "../lib/dbConnect";
import Post from "../models/Post";
import { useState } from "react";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import User from "../models/User";
import Comment from "../models/Comment";

// add pagination with limit() and skip() maybe?

export async function getServerSideProps() {
  await dbConnect();

  // hack because of some Error caused by imports?
  User.find({});
  Comment.find({});

  const postsDoc = await Post.find({ published: true })
    .sort({ createdAt: -1 })
    .populate("owner")
    .lean();

  const posts = JSON.parse(JSON.stringify(postsDoc));

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="md:w-3/4 mx-auto">
      <PostFeed posts={props.posts} />

      <Loader show={loading} />
    </div>
  );
}
