import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import moment from "moment";
import CreateComment from "./CreateComment";
import DeleteComment from "./DeleteComment";
import { getCurrentUser } from "@/utils/session";
import EditComment from "./EditComment";

const getPost = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts/${id}/comments`,
    {
      cache: "no-store",
    }
  );
  if (!response) {
    throw new Error("Error cannot get comments");
  }

  const data = await response.json();
  return data;
};

interface IComment {
  id: string;
  email: string;
  image: string;
  userImage: string;
  userName: string;
  createdAt: string;
  description: string;
  like: number;
  comments: number;
}

const Comment = async ({
  id,
  email,
  image,
  userImage,
  userName,
  createdAt,
  description,
  like,
  comments,
}: IComment) => {
  const post = await getPost(id);
  const user = await getCurrentUser();

  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle className="cursor-pointer" />
      </DialogTrigger>
      <div className="flex flex-col">
        <DialogContent
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr 70px",
          }}
          className="gap-3 sm:max-w-[425px] md:max-w-[55%] xl:max-w-[35%]"
        >
          {/* USER PROFILE SECTION */}
          <DialogHeader className="h-max flex flex-col gap-5">
            <DialogTitle>Comment on {userName} post</DialogTitle>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Link href={`/profile/${email}`}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback>userName.splice(0, 2)</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col gap-1">
                  <Link href={`/profile/${email}`}>
                    <h1 className="text-sm capitalize font-semibold cursor-pointer">
                      {userName}
                    </h1>
                  </Link>
                  <p className="text-xs text-gray-600">
                    {moment(createdAt).startOf("seconds").fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* POST SECTION */}
          <div
            className="h-96 mb-2 flex-1 flex flex-col
             gap-3 overflow-y-auto scroll-smooth"
          >
            {/* DESCRIPTION */}
            <p className="text-sm font-normal">{description}</p>
            {/* IMAGE */}
            {image && (
              <Image
                src={image}
                alt="John doe"
                height={300}
                width={200}
                priority
                className="w-max h-80 mx-auto object-contain object-center"
              />
            )}
            {/* NO. OF LIKES AND COMMENTS */}
            {(comments > 0 || like > 0) && (
                <div className="mt-5 text-sm font-normal dark:text-slate-500 flex gap-5 justify-end">
                  {comments > 0 && (
                    <p className="hover:cursor-pointer hover:underline">
                      {comments} {comments === 1 && comments > 0
                        ? " comment"
                        : " comments"}
                    </p>
                  )}
                  {like > 0 && (
                    <p className="hover:cursor-pointer hover:underline">
                      {like} {like === 1 && like > 0 ? " like" : " likes"}
                    </p>
                  )}
                </div>
              )}

            {/* LIKE & COMMENT ICONS */}
            <div className="flex gap-5">
              <ThumbsUp className="cursor-pointer" />
              <MessageCircle className="cursor-pointer" />
            </div>
            <Separator className="w-[100%] mx-auto" />

            {/* COMMENT SECTION */}
            <div className="mt-3 mb-5 flex flex-col gap-5">
              {post.comments.length > 0 ? (
                post.comments?.map((comment: any) => (
                  <div className="w-[100%] flex gap-5">
                    <Link href={`/profile/${comment.User.email}`}>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={comment.User.image}
                          alt={comment.User.name + "photo"}
                        />
                        <AvatarFallback>
                          {comment.User.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm px-4 py-3 rounded-2xl flex flex-col gap-2 bg-slate-200 dark:bg-slate-900">
                        <div className="flex justify-between">
                          <p className="cursor-pointer text-sm capitalize font-semibold">
                            <Link href={`/profile/${comment.User.email}`}>
                              {comment.User.name}
                            </Link>
                          </p>
                        </div>
                        <p className="min-w-56 font-normal dark:text-slate-400">
                          {comment.description}
                        </p>
                      </div>
                      {/* <div className="px-3 flex justify-between">
                        <span className="text-xs text-slate-500">
                          {moment(comment.createdAt)
                            .startOf("seconds")
                            .fromNow()}
                        </span>
                        {comment.userEmail === user?.email &&
                          <div className="flex items-center gap-2">
                          <p className="text-xs cursor-pointer hover:underline text-green-600 font-semibold">
                            <EditComment />
                          </p>
                          <p className="text-xs cursor-pointer hover:underline text-red-600 font-semibold">
                            <DeleteComment id={comment.postId} commentId={comment.id} />
                          </p>
                        </div>}
                      </div> */}
                      <EditComment  
                        createdAt={comment.createdAt}
                        commentUserEmail={comment.userEmail}
                        userEmail={user?.email || undefined}
                        postId={comment.postId}
                        commentId={comment.id}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No Comments</p>
              )}
            </div>
          </div>
          {/* REPLY SECTION */}
          <div className="w-full z-10 p-2 absolute bottom-0 right-0">
            <CreateComment id={id} />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Comment;
