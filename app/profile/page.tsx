
import Post from "../_components/Post";
import ProfileCard from "../_components/ProfileCard";
import { getCurrentUser } from "@/utils/session";

const Profile = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div className="flex flex-col min-h-screen items-center p-24">
      <p>Please Login</p>
    </div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center lg:items-start lg:flex-row lg:justify-evenly gap-10 p-24">
      <div>
        <ProfileCard 
          name={user?.name}
          email={user?.email}
          image={user?.image}
        />
      </div>
      <Post email={user?.email}/>
    </div>
  );
};

export default Profile;
