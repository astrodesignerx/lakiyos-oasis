import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
import { initializeTransaction, generateReference } from '@/lib/paystack'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, total, customerName, customerEmail, customerPhone, address, deliveryZone } = body

    if (!customerName || !customerEmail || !items) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const reference = generateReference()
    const orderId = crypto.randomUUID()

    const payment = await initializeTransaction({
      email: customerEmail,
      amount: total,
      reference,
      channels: ['mpesa'],
      metadata: {
        customerName,
        type: 'order',
        items: JSON.stringify(items),
      },
    })

    await db.insert(orders).values({
      id: orderId,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      address: address || null,
      deliveryZone: deliveryZone || null,
      reference,
      total,
      status: 'pending',
    })

    for (const item of items) {
      await db.insert(orderItems).values({
        id: crypto.randomUUID(),
        orderId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })
    }

    return NextResponse.json({
      reference,
      authorization_url: payment.data.authorization_url,
      status: true,
    })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allOrders = await db.query.orders.findMany({
      with: { items: true },
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })
    return NextResponse.json(allOrders)
  } catch (error) {
    return NextResponse.json([])
  }
}
