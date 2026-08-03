import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { db } from '@/db'
import { bookings, orders, events } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { bookingConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    const signature = req.headers.get('x-paystack-signature')
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!signature || !secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const expected = createHmac('sha512', secret).update(rawBody).digest('hex')
    const sigBuf = Buffer.from(signature)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const body = JSON.parse(rawBody)

    if (body.event === 'charge.success') {
      const { reference, amount } = body.data
      const type = body.data.metadata?.type

      if (type === 'booking') {
        // Only confirm when the paid amount matches; the pending guard
        // makes confirmation (and the email) fire exactly once.
        const [pending] = await db.select().from(bookings)
          .where(eq(bookings.reference, reference))

        if (!pending) {
          return NextResponse.json({ received: true })
        }
        if (amount !== pending.amount * 100) {
          console.error(`Amount mismatch for ${reference}: paid ${amount}, expected ${pending.amount * 100}`)
          return NextResponse.json({ received: true })
        }

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
      }

      if (type === 'order') {
        const [pending] = await db.select().from(orders)
          .where(eq(orders.reference, reference))

        if (pending && amount === pending.total * 100) {
          await db.update(orders)
            .set({ status: 'confirmed', updatedAt: new Date() })
            .where(and(eq(orders.reference, reference), eq(orders.status, 'pending')))
        } else if (pending) {
          console.error(`Amount mismatch for ${reference}: paid ${amount}, expected ${pending.total * 100}`)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
