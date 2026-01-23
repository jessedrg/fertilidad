import { sendLeadEmail } from "@/lib/send-lead-email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const result = await sendLeadEmail(data)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in send-lead API:", error)
    return NextResponse.json({ success: false, error: "Failed to send lead" }, { status: 500 })
  }
}
