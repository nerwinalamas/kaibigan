import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import moment from "moment";
import More from "./More";

interface IPost {
  name: string;
  email: string;
  image: string;
  postId: string;
  description: string;
  img: string;
  like: number;
  createdAt: string;
  updatedAt: string;
}

const Post: FC<IPost> = async ({ name, email, image, postId, description, img, like, createdAt, updatedAt }) => {
  return (
    <div className="flex flex-col gap-10">
      <Card className="w-80 lg:w-[500px]">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Link href={`/profile/${email}`}>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback>
                    {name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col gap-1">
                <Link href={`/profile/${email}`}>
                  <h1 className="text-sm cursor-pointer">
                    {name}
                  </h1>
                </Link>
                <p className="text-xs font-semibold text-gray-600">
                  {moment(createdAt).startOf("seconds").fromNow()}
                </p>
              </div>
            </div>

            <div className="relative">
              <More id={postId} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{description}</p>
        </CardContent>
        <Separator className="w-[90%] mx-auto mb-5" />
        <CardFooter className="flex gap-5">
          <ThumbsUp className="cursor-pointer" />
          <MessageCircle className="cursor-pointer" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
