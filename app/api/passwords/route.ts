import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { Password } from "@/models/Password"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    await connectToDB()
    const saved = await Password.create({ ...body, userId })

    return NextResponse.json({ success: true, data: saved })
  } catch (err) {
    console.error("Error saving password:", err)
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 })
  }
}

export async function GET() {
  const authResult = await auth();
  const userId = authResult?.userId;
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectToDB();
  const data = await Password.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json({ success: true, data }); 
}
