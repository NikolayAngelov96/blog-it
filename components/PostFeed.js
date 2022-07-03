const PostFeed = ({ posts }) => {
  return (
    <div className="border border-[#b5bdc4] p-8 rounded bg-white">
      <a href="#" className="font-bold p-1  hover:bg-[#F6F6F6] rounded">
        {" "}
        bobbysue{" "}
      </a>
      <h2 className="my-4 font-bold text-xl hover:text-[#3b49df] cursor-pointer">
        I Like Turtles
      </h2>
      <div className="flex justify-between">
        <span>Comments: 5</span>
        <span> 💗 0 Hearts </span>
      </div>
    </div>
  );
};

export default PostFeed;
