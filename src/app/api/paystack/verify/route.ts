import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { verifyTransaction } from '@/lib/paystack'
import { bookingConfirmationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reference } = body

    if (!reference) {
      return NextResponse.json({ error: 'Reference required' }, { status: 400 })
    }

    const verification = await verifyTransaction(reference)

    if (verification.status && verification.data.status === 'success') {
      const [booking] = await db.update(bookings)
        .set({ status: 'confirmed' })
        .where(eq(bookings.reference, reference))
        .returning()

      if (booking) {
        const [event] = await db.select().from(bookings)
          .where(eq(bookings.id, booking.id))

        await bookingConfirmationEmail({
          email: booking.email,
          name: booking.name,
          eventName: booking.eventId,
          date: new Date().toLocaleDateString('en-KE', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          }),
          time: '',
          venue: '',
        })
      }

      return NextResponse.json({ status: 'confirmed', booking })
    }

    if (verification.data.status === 'failed' || verification.data.status === 'abandoned') {
      return NextResponse.json({ status: 'failed' })
    }

    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    return NextResponse.json({ status: 'pending' })
  }
}
