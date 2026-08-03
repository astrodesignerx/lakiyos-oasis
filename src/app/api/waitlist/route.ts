import { NextResponse } from 'next/server'
import { db } from '@/db'
import { waitlist, events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { checkAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId, name, whatsapp } = body

    if (!eventId || !name || !whatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [event] = await db.select().from(events).where(eq(events.id, eventId))
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    await db.insert(waitlist).values({
      id: crypto.randomUUID(),
      eventId,
      name,
      whatsapp,
    })

    return NextResponse.json({ status: true, message: 'Added to waitlist' })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}

export async function GET() {
  const denied = await checkAdmin()
  if (denied) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const entries = await db.query.waitlist.findMany({
      with: { event: true },
      orderBy: (waitlist, { desc }) => [desc(waitlist.createdAt)],
    })
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 })
  }
}
