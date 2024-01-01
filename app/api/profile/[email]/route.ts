import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

// GET USER
export async function GET(req: Request, { params }: { params: { email: string } }) {
  const email = params.email;
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Post: { orderBy: { createdAt: "desc" }},
      },
    });
    return NextResponse.json(findUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 }
    );
  }
}
