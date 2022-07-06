import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

// Heart and UnHeart not reacting to like change

const HeartButton = ({ post, incrementHeartCount, decrementHeartCount }) => {
  const { user } = useAuthContext();

  let isLiked = post.hearts.some((x) => x == user._id);

  const addHeart = async () => {
    //TODO: add heart with userId to collection

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
      isLiked = true;
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(decrementHeartCount);
  const removeHeart = async () => {
    //TODO: remove heart from collection
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
      isLiked = false;
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
