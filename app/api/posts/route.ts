import { NextResponse } from "next/server"
import prisma from "@/utils/connect"
import { getCurrentUser } from "@/utils/session";

// GET ALL POST
export const GET = async (req: Request) => {
    try {
        const posts = await prisma.post.findMany({
          include: {
            User: true,
            comments: true,
            likeBy: true
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        if (!posts) {
          return NextResponse.json({ message: "Posts not found!" }, { status: 404 });
        }
        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
    }
}

// CREATE POST
export async function POST(req: Request) {
    const user = await getCurrentUser();

    if(!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    const { description } = await req.json();
    const email = user.email

    if (!description) {
      return NextResponse.json({ message: 'Description is required' }, { status: 500 });
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          description, 
          userEmail: email
        }
      })
      return NextResponse.json(newPost, { status: 200});
    } catch(error) {
      console.log(error)
      return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 });
    }
  }
