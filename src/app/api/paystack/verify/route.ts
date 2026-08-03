import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, events } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { verifyTransaction } from '@/lib/paystack'
import { bookingConfirmationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reference } = body

    if (!reference) {
      return NextResponse.json({ error: 'Reference required' }, { status: 400 })
    }

    const [existing] = await db.select().from(bookings)
      .where(eq(bookings.reference, reference))

    if (!existing) {
      return NextResponse.json({ status: 'pending' })
    }
    if (existing.status === 'confirmed') {
      return NextResponse.json({ status: 'confirmed' })
    }

    const verification = await verifyTransaction(reference)

    if (verification.status && verification.data.status === 'success') {
      if (verification.data.amount !== existing.amount * 100) {
        console.error(`Amount mismatch for ${reference}: paid ${verification.data.amount}, expected ${existing.amount * 100}`)
        return NextResponse.json({ status: 'pending' })
      }

      // The pending guard means only one of this route or the webhook
      // performs the transition — and only that one sends the email.
      const [booking] = await db.update(bookings)
        .set({ status: 'confirmed', updatedAt: new Date() })
        .where(and(eq(bookings.reference, reference), eq(bookings.status, 'pending')))
        .returning()

      if (booking) {
        const [event] = await db.select().from(events)
          .where(eq(events.id, booking.eventId))

        await bookingConfirmationEmail({
          email: booking.email,
          name: booking.name,
          eventName: event?.name ?? booking.eventId,
          date: event
            ? new Date(event.date).toLocaleDateString('en-KE', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })
            : '',
          time: event?.time ?? '',
          venue: event?.venue ?? '',
        })
      }

      return NextResponse.json({ status: 'confirmed' })
    }

    if (verification.data.status === 'failed' || verification.data.status === 'abandoned') {
      return NextResponse.json({ status: 'failed' })
    }

    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    return NextResponse.json({ status: 'pending' })
  }
}
