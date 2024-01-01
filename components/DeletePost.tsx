"use client"

import { useRouter } from "next/navigation";

interface IDeletePost {
  id: string;
}

const DeletePost = ({ id }: IDeletePost) => {
  const router = useRouter();

  const handleSubmit = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
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

export default DeletePost;
