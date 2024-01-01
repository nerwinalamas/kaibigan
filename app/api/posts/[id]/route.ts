import { NextResponse } from "next/server"
import prisma from "@/utils/connect"
import { getCurrentUser } from "@/utils/session";

// GET SPECIFIC POST
export const GET = async (req: Request, { params } : { params: {id: string}}) => {
    const id = params.id
    try {
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        })

        if (!post) {
            return NextResponse.json({ message: "Post not found!" }, { status: 404 });
        }
        console.log("Get specific post");
        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

// UPDATE POST
export const PUT = async (req: Request, { params } : { params : { id: string}}) => {
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }
    const id = params.id
    const { description } = await req.json();
    try {
        const updatePost = await prisma.post.update({
            data: { description },
            where: { id }
        })
        console.log("Update post");
        return NextResponse.json(updatePost, { status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

// DELETE POST
export const DELETE = async (req: Request, { params } : { params : { id: string }}) => {
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    const id = params.id
    try {
        const deletePost = await prisma.post.delete({
            where: { id }
        })
        console.log("Delete post");
        return NextResponse.json(deletePost, { status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}