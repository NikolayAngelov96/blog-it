import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import * as request from "../lib/request";

const HeartButton = ({ post, incrementHeartCount, decrementHeartCount }) => {
  const { user } = useAuthContext();

  let initialBtnState = post.hearts.some((x) => x == user._id);

  const [isLiked, setIsLiked] = useState(initialBtnState);

  const addHeart = async () => {
    try {
      const body = { postId: post._id, userId: user._id };

      await request.post("/post/like", body, user);

      incrementHeartCount();
      setIsLiked(true);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const removeHeart = async () => {
    try {
      const body = { postId: post._id, userId: user._id };

      await request.post("/post/unlike", body, user);

      decrementHeartCount();
      setIsLiked(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return isLiked ? (
    <button
      className="py-3 bg-[#b5bdc4] text-black rounded w-full"
      onClick={removeHeart}
    >
      💔 Unheart
    </button>
  ) : (
    <button
      className="py-3 bg-[#b5bdc4] text-black rounded w-full"
      onClick={addHeart}
    >
      💗 Heart
    </button>
  );
};

export default HeartButton;
