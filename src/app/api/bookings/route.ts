import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { initializeTransaction, generateReference } from '@/lib/paystack'
import { checkAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId, name, email, whatsapp } = body

    if (!eventId || !name || !email || !whatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [event] = await db.select().from(events).where(eq(events.id, eventId))
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const reference = generateReference()

    const payment = await initializeTransaction({
      email,
      amount: event.price,
      reference,
      channels: ['mpesa'],
      metadata: {
        eventId,
        eventName: event.name,
        customerName: name,
        customerWhatsapp: whatsapp,
        type: 'booking',
      },
    })

    await db.insert(bookings).values({
      id: crypto.randomUUID(),
      eventId,
      name,
      email,
      whatsapp,
      reference,
      amount: event.price,
      status: 'pending',
    })

    return NextResponse.json({
      reference,
      authorization_url: payment.data.authorization_url,
      status: true,
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to initialize booking' }, { status: 500 })
  }
}

export async function GET() {
  const denied = await checkAdmin()
  if (denied) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const allBookings = await db.query.bookings.findMany({
      with: {
        event: true,
      },
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    })
    return NextResponse.json(allBookings)
  } catch (error) {
    return NextResponse.json([])
  }
}
