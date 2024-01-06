"use client";

import { useEffect, useState } from "react";
import DeleteComment from "./DeleteComment";
import moment from "moment";
import { useRouter } from "next/navigation";

interface IEditComment {
  createdAt: string;
  commentUserEmail: string;
  userEmail?: string;
  postId: string;
  commentId: string;
}

const EditComment = ({
  createdAt,
  commentUserEmail,
  userEmail,
  postId,
  commentId,
}: IEditComment) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getComment = async (postId: string, commentId: string) => {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`)
      if (!response) {
        throw new Error("Cannot get post");
      }
      const data = await response.json()
      setDescription(data.description)
    }
    getComment(postId, commentId);
  }, [postId])

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBack = () => {
    setIsOpen(false);
  };

  const handleUpdate = async (id: string, commentId: string) => {
    try {
      const response = await fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        router.refresh();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="px-3 flex justify-between">
        <span className="text-xs text-slate-500">
          {moment(createdAt).startOf("seconds").fromNow()}
        </span>
        {commentUserEmail === userEmail && (
          <div className="flex items-center gap-2">
            <p className="text-xs cursor-pointer hover:underline text-green-600 font-semibold">
              <button onClick={handleClick}>Edit</button>
            </p>
            <p className="text-xs cursor-pointer hover:underline text-red-600 font-semibold">
              <DeleteComment id={postId} commentId={commentId} />
            </p>
          </div>
        )}
      </div>
      <div className="pl-5">
        {isOpen && (
          <>
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 px-5 outline-none rounded-md text-sm dark:bg-slate-900"
            />
            <div className="text-xs mt-1 pr-3 flex justify-end gap-2">
              <button onClick={handleBack} className="hover:underline">
                Cancel
              </button>
              <button onClick={() => handleUpdate(postId, commentId)} className="hover:underline">Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditComment;
