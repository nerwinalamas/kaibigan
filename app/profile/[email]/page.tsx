import Post from "@/components/Post";
import ProfileCard from "@/components/ProfileCard";
import { getCurrentUser } from "@/utils/session";
import { redirect } from "next/navigation";
import { FC } from "react";

const getProfile = async (email: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${email}`, {
    cache: "no-store",
  })
  if (!response) {
    throw new Error("Cannot get user profile")
  }
  const data = await response.json();
  return data;
}

interface IProfile {
  params: {
    email: string;
  };
}

const ProfileEmail: FC<IProfile> = async ({ params }) => {
  const email = params.email;
  const userProfile = await getProfile(email);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center lg:items-start lg:flex-row lg:justify-evenly gap-10 p-24">
      <ProfileCard 
         id={userProfile?.id}
         name={userProfile?.name}
         email={userProfile?.email}
         image={userProfile?.image}
      />
      <div className="flex flex-col gap-10">
        {userProfile.Post.length > 0 && userProfile ? userProfile.Post.map((post: any) => (
          <Post 
            key={post.id}
            name={userProfile.name}
            email={userProfile.email}
            image={userProfile.image}
            postId={post.id} 
            description={post.description}
            img={post.img}
            like={post.like}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
        )) : <p>No Post</p>}
      </div>
    </div>
  );
};

export default ProfileEmail;
