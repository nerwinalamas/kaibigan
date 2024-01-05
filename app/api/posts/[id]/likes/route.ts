import { getCurrentUser } from "@/utils/session"
import { NextResponse } from "next/server"
import prisma from "@/utils/connect"

// LIKE POST
export const POST = async (req: Request, { params } : { params: { id: string}}) => {
    const postId = params.id
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    try {
        const like = await prisma.likedPost.findFirst({
            where: {
                postId,
                userEmail: user.email
            }
        })

        if (like) {
            // UNLIKE THE POST
            await prisma.likedPost.delete({
              where: { id: like.id },
            });
            await prisma.post.update({
              where: { id: postId },
              data: {
                like: {
                  decrement: 1,
                },
              },
            });
          } else {
            // LIKE THE POST
            await prisma.likedPost.create({
              data: {
                userEmail: user.email,
                postId,
                likedAt: new Date(),
              },
            });
            await prisma.post.update({
              where: { id: postId },
              data: {
                like: {
                  increment: 1,
                },
              },
            });
          }
          return NextResponse.json({message: "Like"}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Something went wrong."}, { status: 500 })
    }
}

// GET LIKE POST
export const GET = async (req: Request, { params } : { params : { id : string}}) => {
    const postId = params.id
    const user = await getCurrentUser();

    if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
    }

    try {
        const like = await prisma.likedPost.findFirst({
            where: {
                postId: postId,
                userEmail: user.email
            }
        })
        return NextResponse.json(like, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong."}, {status: 200})
    }
}