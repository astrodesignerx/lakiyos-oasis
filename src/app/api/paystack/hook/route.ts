import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, orders } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { verifyTransaction } from '@/lib/paystack'
import { bookingConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.event === 'charge.success') {
      const { reference } = body.data

      const verification = await verifyTransaction(reference)
      if (!verification.status) {
        return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
      }

      const metadata = body.data.metadata
      const type = metadata?.type

      if (type === 'booking') {
        const [booking] = await db.update(bookings)
          .set({ status: 'confirmed' })
          .where(eq(bookings.reference, reference))
          .returning()

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

      if (type === 'order') {
        await db.update(orders)
          .set({ status: 'confirmed' })
          .where(eq(orders.reference, reference))
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Paystack webhook endpoint ready' })
}
