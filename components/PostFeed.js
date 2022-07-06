import Link from "next/link";

const PostFeed = ({ posts, admin }) => {
  return (
    posts.map((post) => (
      <PostItem key={post._id} post={post} admin={admin} />
    )) || null
  );
};

const PostItem = ({ post, admin }) => {
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
      <div className="flex justify-between mb-6">
        <span>Comments: {post.comments.length}</span>
        <span> 💗 {post.hearts.length} Hearts </span>
      </div>

      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <a className="px-8 py-2 text-white bg-[#3b49df] rounded border border-[#3b49df] mt-4">
              Edit
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default PostFeed;
