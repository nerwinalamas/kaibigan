import { NextResponse } from "next/server"
import prisma from "@/utils/connect"
import { getCurrentUser } from "@/utils/session";

// GET ALL POST
// export const GET = async (req: Request) => {
//     try {
//         const posts = await prisma.post.findMany({
//             include: { user: true }
//         });
//         return NextResponse.json(posts, { status: 200 })
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
//     }
// }

export async function POST(req: Request) {
    const user = await getCurrentUser();
  
    try {
      if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
      }
  
      const { description } = await req.json();
      const newPost = await prisma.post.create({
        data: {
          description, userEmail: user.email
        }
      })
      return NextResponse.json({newPost}, { status: 200})
  
    } catch(error) {
      return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
  }
