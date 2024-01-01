import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import moment from "moment";
import { getCurrentUser } from "@/utils/session";
import More from "./More";

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store"
  });

  if (!response) {
    throw new Error("Cannot get all post");
  }
  const data = await response.json();
  return data;
};

const Posts = async () => {
  const user = await getCurrentUser();
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col items-center gap-10">
      {posts.map((post: any) => (
        <div className="flex flex-col gap-10" key={post.id}>
          <Card className="w-80 lg:w-[500px]">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Link href={`/profile/${post.userEmail}`}>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={post.User.image} alt={post.User.name} />
                      <AvatarFallback>
                        {post.User.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col gap-1">
                    <Link href={`/profile/${post.userEmail}`}>
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
                  {post.User.email === user?.email && <More id={post.id} />}
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
