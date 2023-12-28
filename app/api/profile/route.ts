import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";
import prisma from "@/utils/connect"

export async function GET(req: Request) {
    const user = await getCurrentUser();
  
    try {
      if(!user?.email) {
        return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
      }
  
      const findUser = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })
      return NextResponse.json({findUser}, { status: 200})
  
    } catch(error) {
      return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
  }
