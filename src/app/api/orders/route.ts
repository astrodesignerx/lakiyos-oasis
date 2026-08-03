import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
import { initializeTransaction, generateReference } from '@/lib/paystack'
import { checkAdmin } from '@/lib/admin'
import { products } from '@/data/site'
import { deliveryZones } from '@/data/delivery'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customerName, customerEmail, customerPhone, address, deliveryZone } = body

    if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Prices come from the catalog, never from the client
    const lineItems: { id: string; name: string; price: number; quantity: number }[] = []
    for (const item of items) {
      const product = products.find((p) => p.id === item.id || p.slug === item.id || p.name === item.name)
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${item.name ?? item.id}` }, { status: 400 })
      }
      const quantity = Math.min(Math.max(parseInt(item.quantity, 10) || 1, 1), 50)
      lineItems.push({ id: product.id, name: product.name, price: product.price, quantity })
    }

    const zone = deliveryZones.find((z) => z.id === deliveryZone || z.label === deliveryZone)
    const deliveryFee = zone?.price ?? 0
    const total = lineItems.reduce((sum, li) => sum + li.price * li.quantity, 0) + deliveryFee

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
        items: JSON.stringify(lineItems.map(({ name, quantity }) => ({ name, quantity }))),
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

    for (const item of lineItems) {
      await db.insert(orderItems).values({
        id: crypto.randomUUID(),
        orderId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
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
  const denied = await checkAdmin()
  if (denied) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
