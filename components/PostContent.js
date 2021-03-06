import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const PostContent = ({ post, user }) => {
  const createdAt = new Date(post.createdAt).toDateString();

  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="font-bold text-3xl my-4">{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${user.username}`}>
          <a className="text-[#3b49df]">@{user?.username}</a>
        </Link>{" "}
        on {createdAt}
      </span>

      <div className="my-4 prose">
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
