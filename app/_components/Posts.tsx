import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import prisma from "@/utils/connect";
import moment from "moment";

const Posts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center gap-10">
      {posts.map((post: any) => (
        <div className="flex flex-col gap-10" key={post.id}>
          <Card className="w-80 lg:w-[500px]">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Link href={`/profile/${post.User.id}`}>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={post.User.image} alt={post.User.name} />
                      <AvatarFallback>
                        {post.User.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col gap-1">
                    <Link href={`/profile/${post.User.id}`}>
                      <h1 className="text-sm cursor-pointer">
                        {post.User.name}
                      </h1>
                    </Link>
                    <p className="text-xs font-semibold text-gray-600">
                      {moment(post.createdAt).startOf("seconds").fromNow()}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 h-36 absolute right-1 top-1">
                      <div className="flex flex-col gap-2">
                        <Link href="/edit-post">Edit</Link>
                        <p className="cursor-pointer">Delete</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.description}</p>
            </CardContent>
            <Separator className="w-[90%] mx-auto mb-5" />
            <CardFooter className="flex gap-5">
              <ThumbsUp className="cursor-pointer" />
              <MessageCircle className="cursor-pointer" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Posts;
