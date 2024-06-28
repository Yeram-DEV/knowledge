import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { bookId, userId } = await request.json()
  const res = await fetch('http://localhost:4100/rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    },
    body: JSON.stringify({ bookId, userId })
  })

  if (!res.ok) {
    const errorData = await res.json()
    return NextResponse.json({ error: errorData.message || 'Failed to rental' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 200 })
}
