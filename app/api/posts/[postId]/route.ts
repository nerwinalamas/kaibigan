import { NextResponse } from "next/server"
import prisma from "@/utils/connect"
import { NextApiRequest, NextApiResponse } from "next";

// GET ALL POST BY INDIVIDUAL USER
// export const GET = async (req: NextApiRequest) => {
//     const { postId } = req.query;
//     try {
//         const posts = await prisma.post.findMany({
//             where: {
//                 id: {
//                     contains: postId
//                 }
//             }
//         });
//         return NextResponse.json(posts, { status: 200 })
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
//     }
// }