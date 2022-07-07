import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const HeartButton = ({ post, incrementHeartCount, decrementHeartCount }) => {
  const { user } = useAuthContext();

  let initialBtnState = post.hearts.some((x) => x == user._id);

  const [isLiked, setIsLiked] = useState(initialBtnState);

  const addHeart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post._id, userId: user._id }),
      });

      if (res.ok != true) {
        let error = await res.json();
        throw new Error(error.message);
      }

      incrementHeartCount();
      setIsLiked(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeHeart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/post/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post._id, userId: user._id }),
      });

      if (res.ok != true) {
        let error = await res.json();
        throw new Error(error.message);
      }

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
