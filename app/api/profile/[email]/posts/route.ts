import { NextResponse } from "next/server"

// GET ALL POST OF A USER
export const GET = async (req: Request, { params } : { params : { email : string}}) => {
    const email = params.email
    try {
        const posts = await prisma?.post.findMany({
            where: {
                userEmail: email
            },
            include: {
                User: true,
                comments: true,
                likeBy: true
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        if (!posts) {
            return NextResponse.json({ message: "Cannot get posts" }, { status: 404 })
        }
        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Something went wrong."}, { status: 500})
    }
}