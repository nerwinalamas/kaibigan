import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import moment from "moment";
import { getCurrentUser } from "@/utils/session";
import More from "./More";
import Comment from "./Comment";
import Image from "next/image";
import LikePost from "./LikePost";

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
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

  const hasImage = false;

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
                      <h1 className="text-sm capitalize font-semibold cursor-pointer">
                        {post.User.name}
                      </h1>
                    </Link>
                    <p className="text-xs text-gray-600">
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
              {/* DESCRIPTION */}
              <p className="text-sm line-clamp-6">{post.description}</p>
              {/* IMAGE */}
              {hasImage && (
                <div className="w-full h-80 mt-2 bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={"/photo2.jpg"}
                    alt="John doe"
                    height={300}
                    width={200}
                    priority
                    className="w-max h-full mx-auto object-cover object-center"
                  />
                </div>
              )}
              {/* NO. OF LIKES AND COMMENTS */}
              {(post.comments.length > 0 || post.like > 0) && (
                <div className="mt-5 text-sm font-normal dark:text-slate-500 flex gap-5 justify-end">
                  {post.comments.length > 0 && (
                    <p className="hover:cursor-pointer hover:underline">
                      {post.comments.length}
                      {post.comments.length === 1 && post.comments.length > 0
                        ? " comment"
                        : " comments"}
                    </p>
                  )}
                  {post.like > 0 && (
                    <p className="hover:cursor-pointer hover:underline">
                      {post.like}
                      {post.like === 1 && post.like > 0 ? " like" : " likes"}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
            <Separator className="w-[90%] mx-auto mb-5" />
            <CardFooter className="flex gap-5">
              <LikePost
                postId={post.id}
                userEmail={user?.email || undefined}
                like={post.like}
              />
              <Comment
                id={post.id}
                email={post.userEmail}
                image={post.image}
                userImage={post.User.image}
                userName={post.User.name}
                createdAt={post.createdAt}
                description={post.description}
                like={post.like}
                comments={post.comments.length}
              />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Posts;
