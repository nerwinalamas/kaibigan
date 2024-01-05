import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server"

// GET ALL COMMENTS
export const GET = async (req: Request, { params }: { params : { id: string }}) => {
    const postId = params.id
    try {
        const comments = await prisma?.post.findUnique({
            include: {
                comments: { include: { User: true } },
                User: true,
            },
            where: {
                id: postId
            }
        })
        return NextResponse.json(comments, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong."}, {status: 500})
    }
}

// CREATE COMMENT
export const POST = async (req: Request, { params }: { params : { id: string }}) => {
    const user = await getCurrentUser();

    if(!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    const { description } = await req.json();
    const email = user.email
    const postId = params.id

    if (!description) {
      return NextResponse.json({ message: 'Description is required' }, { status: 500 });
    }
    try {
        const newComment = await prisma?.comment.create({
            data: {
              description, 
              userEmail: email,
              postId 
            }
          })
          return NextResponse.json(newComment, { status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong."}, {status: 500})
    }
}