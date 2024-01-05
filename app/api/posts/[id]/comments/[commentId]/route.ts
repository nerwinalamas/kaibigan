import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";


// DELETE COMMENT
export const DELETE = async (req: Request, { params } : { params : { commentId: string }}) => {
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    const commentId = params.commentId
    try {
        const deleteComment = await prisma?.comment.delete({
            where: { id: commentId }
        })
        return NextResponse.json(deleteComment, { status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

// UPDATE COMMENT
export const PUT = async (req: Request, { params } : { params : { commentId: string}}) => {
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }
    const commentId = params.commentId
    const { description } = await req.json();
    try {
        const updateComment = await prisma?.comment.update({
            data: { description },
            where: { id: commentId }
        })
        return NextResponse.json(updateComment, { status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

export const GET = async (req: Request, { params } : { params : { commentId: string}}) => {
    const commentId = params.commentId;
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    try {
        const comment = await prisma?.comment.findUnique({
            where: {
                id: commentId
            }
        })
        if (!comment) {
            return NextResponse.json({message: "Comment not found."}, { status: 404})
        }
        return NextResponse.json(comment, { status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong."}, { status: 500})
    }
}