import { NextResponse } from 'next/server'
import { db } from '@/db'
import { newsletterSubscribers } from '@/db/schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phone } = body

    if (!phone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    await db.insert(newsletterSubscribers).values({
      id: crypto.randomUUID(),
      phone,
    })

    return NextResponse.json({ status: true, message: 'Subscribed successfully' })
  } catch (error: any) {
    return NextResponse.json({ status: true, message: 'Already subscribed' })
  }
}

export async function GET() {
  try {
    const subscribers = await db.query.newsletterSubscribers.findMany({
      orderBy: (newsletterSubscribers, { desc }) => [desc(newsletterSubscribers.createdAt)],
    })
    return NextResponse.json(subscribers)
  } catch (error) {
    return NextResponse.json([])
  }
}
