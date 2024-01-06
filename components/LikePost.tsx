"use client";

import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ILikePost {
  postId: string;
  userEmail: string | undefined;
  like: number;
}

const LikePost = ({ postId, userEmail, like }: ILikePost) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const router = useRouter();

  useEffect(() => {
    const getIfLike = async (id: string) => {
      const response = await fetch(`/api/posts/${id}/likes`);

      if (!response) {
        throw new Error("Cannot get post");
      } else {
        const data = await response.json();
        if (data?.userEmail === userEmail && data.postId === postId) {
          setIsLiked(true);
        }
      }
    };
    getIfLike(postId);
  }, [postId]);

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}/likes`, {
        method: "POST",
        body: JSON.stringify({ like: likeCount }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        router.refresh();
        console.log("data ng like: ", data);
        setIsLiked((prev) => !prev);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${isLiked ? "text-[#0ff]" : null}`}>
      <ThumbsUp onClick={() => handleLike(postId)} className="cursor-pointer" />
    </div>
  );
};

export default LikePost;
