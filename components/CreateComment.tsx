import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/utils/session";
import { redirect } from "next/navigation"
import CreateCommentForm from "./CreateCommentForm";

const getComments = async (id: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}/comments`);
  if (!response) {
    throw new Error("Error: Cannot get comment.")
  }
  const data = await response.json();
  return data;
}

interface ICreateComment {
  id: string;
}

const CreateComment = async ({ id }: ICreateComment) => {
  const user = await getCurrentUser();
  const comments = await getComments(id);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="w-[100%] h-24 dark:bg-slate-950">
      <div className="w-[100%] flex gap-5">
        <Avatar className="cursor-pointer">
          <AvatarImage src={`${user.image}`} alt={user.name + "photo"} />
          <AvatarFallback>user.name.splice(0, 2)</AvatarFallback>
        </Avatar>
        <CreateCommentForm id={id}/>
      </div>
    </div>
  );
};

export default CreateComment;
