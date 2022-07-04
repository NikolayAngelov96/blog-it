import Link from "next/link";

const PostFeed = ({ posts }) => {
  return (
    <>
      <h1 className="text-center text-3xl uppercase font-bold mb-4">
        Blog feed
      </h1>
      {posts.map((post) => <PostItem key={post._id} post={post} />) || null}
    </>
  );
};

const PostItem = ({ post }) => {
  return (
    <div className="border border-[#b5bdc4] p-8 rounded bg-white mb-8">
      <Link href={`/${post.owner.username}`}>
        <a className="font-bold p-1  hover:bg-[#F6F6F6] rounded">
          {" "}
          {post.owner.username}{" "}
        </a>
      </Link>
      <Link href={`/${post.owner.username}/${post.slug}`}>
        <h2 className="my-4 font-bold text-xl hover:text-[#3b49df] cursor-pointer">
          <a>{post.title}</a>
        </h2>
      </Link>
      <div className="flex justify-between">
        <span>Comments: {post.comments.length}</span>
        <span> 💗 {post.heartCount} Hearts </span>
      </div>
    </div>
  );
};

export default PostFeed;
