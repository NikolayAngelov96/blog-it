const Loader = ({ show }) => {
  return show ? (
    <div className="border-[10px] border-[#eef0f1] border-t-[10px] border-t-[#3b49df] rounded-full w-[50px] h-[50px] animate-spin"></div>
  ) : null;
};

export default Loader;
