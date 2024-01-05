"use client"

import { useRouter } from "next/navigation";

interface IDeleteComment {
  id: string;
  commentId: string;
}

const DeleteComment = ({ id, commentId }: IDeleteComment) => {
  const router = useRouter();

  const handleSubmit = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: "DELETE"
      });

      if (response.status === 200) {
        router.refresh();
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={() => handleSubmit(id)}>Delete</button>
  );
};

export default DeleteComment;
