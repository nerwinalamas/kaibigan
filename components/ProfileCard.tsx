"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FC } from "react";

interface IProfileCard {
  id?: any;
  name?: any;
  email?: any;
  image?: any;
}

const ProfileCard: FC<IProfileCard> = ({ id, name, email, image }) => {

  return (
    <div>
      <Card className="w-80 lg:w-[350px] flex flex-col items-center justify-center text-center">
        <CardHeader>
          <Avatar className="cursor-pointer w-28 h-28">
            <AvatarImage src={`${image}`} alt="@shadcn" />
            <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-sm">
          <h1 className="font-semibold text-xl capitalize">{name}</h1>
          <p className="text-gray-500">{email}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
