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
    <div className="border border-[#b5bdc4] p-4 md:p-8 rounded bg-white mb-8">
      <Link href={`/${post.owner.username}`}>
        <a className="font-bold p-1  hover:bg-[#F6F6F6] rounded">
          By @{post.owner.username}{" "}
        </a>
      </Link>
      <Link href={`/${post.owner.username}/${post.slug}`}>
        <h2 className="my-4 font-bold text-xl hover:text-[#3b49df] cursor-pointer">
          <a>{post.title}</a>
        </h2>
      </Link>
      <div className="flex gap-8 mb-4">
        <span> 💗 {post.hearts.length} Hearts </span>
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {post.comments.length}{" "}
          {post.comments.length == 1 ? "Comment" : "Comments"}
        </span>
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
