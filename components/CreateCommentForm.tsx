"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Forward } from "lucide-react";
import { useRouter } from "next/navigation";

interface ICreateCommentForm {
  id: string;
}

const CreateCommentForm = ({ id }: ICreateCommentForm) => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}/comments`, { 
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
    <form className="relative flex-1">
      <Textarea
        placeholder="Reply to this post"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Forward
        type="submit"
        onClick={() => handleSubmit(id)}
        strokeWidth={3}
        className="w-8 h-8 p-2 rounded-full flex items-center justify-center absolute right-2 bottom-2 z-10 cursor-pointer bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900"
      />
    </form>
  );
};

export default CreateCommentForm;
