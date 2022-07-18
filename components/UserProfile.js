import Image from "next/image";

const UserProfile = ({ user }) => {
  return (
    <div className="text-center">
      <div className="w-[144px] h-[144px] mx-auto">
        <img src={user?.avatar || "/img/hacker.jpg"} className="rounded-full" />
      </div>
      <p>{user.email}</p>
      <h1 className="text-3xl font-bold my-4 capitalize">{user.username}</h1>
    </div>
  );
};

export default UserProfile;
