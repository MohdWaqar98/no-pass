import { connectToDB } from "@/lib/mongodb"
import { Card } from "@/models/Card"
import { currentUser } from "@clerk/nextjs/server"
export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user?.id) return new Response("Unauthorized", { status: 401 })
    const userId = user.id

    const { cardNumber, cvv, expiry } = await req.json()
    await connectToDB()

    const saved = await Card.create({ userId, cardNumber, cvv, expiry })
    return Response.json(saved)
  } catch {
    return new Response("Something went wrong", { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await currentUser()
    if (!user?.id) return new Response("Unauthorized", { status: 401 })
    const userId = user.id

    await connectToDB()
    const data = await Card.find({ userId }).sort({ createdAt: -1 })
    return Response.json(data)
  } catch {
    return new Response("Error fetching", { status: 500 })
  }
}
