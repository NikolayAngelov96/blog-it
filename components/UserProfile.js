import Image from "next/image";

const UserProfile = ({ user }) => {
  return (
    <div className="text-center">
      <Image
        src={user?.avatar || `/img/hacker.jpg`}
        width={144}
        height={144}
        alt="Profile Picture"
        className="rounded-full"
      />
      <p>{user.email}</p>
      <h1 className="text-3xl font-bold my-4 capitalize">{user.username}</h1>
    </div>
  );
};

export default UserProfile;
