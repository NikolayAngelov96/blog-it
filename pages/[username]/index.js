import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";

const UserProfilePage = ({ user, posts }) => {
  return (
    <>
      <UserProfile user={{ email: "gosho@abv.bg", username: "Gosho" }} />
      <PostFeed />
    </>
  );
};

export default UserProfilePage;
