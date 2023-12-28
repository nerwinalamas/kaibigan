import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const Comment = () => {
  return (
    <CardContent className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form className="w-full">
          <Textarea id="description" className="col-span-3" />
        </form>
      </div>
      <div className="flex justify-end">
        <Button>Send</Button>
      </div>
    </CardContent>
  );
};

export default Comment;
