"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IEditPost {
  params: {
    id: string;
  };
}

const EditPost: FC<IEditPost> = ({ params }) => {
  const id = params.id;

  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getPost = async (id: string) => {
      const response = await fetch(`/api/posts/${id}`)
      if (!response) {
        throw new Error("Cannot get post");
      }
      const data = await response.json()
      setDescription(data.description)
    }
    getPost(id);
  }, [id])

  const handleSubmit = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type" : "application/json"
        }
      });

      if (response.status === 200) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-80 lg:w-[500px]">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={router.back}>
            Cancel
          </Button>
          <Button type="button" onClick={() => handleSubmit(id)}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditPost;
