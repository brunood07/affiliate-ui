import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    credentials: {
      name: "Credentials",
      type: "credentials"
    }
  })
}
