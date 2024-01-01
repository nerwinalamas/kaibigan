"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts", { 
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json"
        }
       });

      if (response.status === 200) {
        router.refresh();
        setDescription("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Textarea
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your thoughts and ideas to the world."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
