const HeartButton = ({ isLiked }) => {
  const addHeart = async () => {
    //TODO: add heart with userId to collection
  };

  const removeHeart = async () => {
    //TODO: remove heart from collection
  };

  return isLiked ? (
    <button className="px-4 py-2 bg-red-500">💔 Unheart</button>
  ) : (
    <button className="py-3 bg-[#3b49df] text-white rounded w-full">
      💗 Heart
    </button>
  );
};

export default HeartButton;
