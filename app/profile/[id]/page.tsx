import Post from "@/app/_components/Post";
import ProfileCard from "@/app/_components/ProfileCard";
import prisma from "@/utils/connect"
import { FC } from "react";

interface IProfileId {
  params: {
    id: string;
  };
}

const ProfileId: FC<IProfileId> = async ({ params }) => {
  const userProfile = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center lg:items-start lg:flex-row lg:justify-evenly gap-10 p-24">
      <ProfileCard 
         id={userProfile?.id}
         name={userProfile?.name}
         email={userProfile?.email}
         image={userProfile?.image}
      />
      <Post email={userProfile?.email}/>
    </div>
  );
};

export default ProfileId;
