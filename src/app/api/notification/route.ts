import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { token, userId } = await request.json()
  const res = await fetch('http://localhost:4100/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    },
    body: JSON.stringify({ token, userId, deviceType: 'web' })
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to save token' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 200 })
}
