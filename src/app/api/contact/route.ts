import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactSubmissions } from '@/db/schema'
import { checkAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, enquiry, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await db.insert(contactSubmissions).values({
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || null,
      enquiry: enquiry || null,
      message,
    })

    return NextResponse.json({ status: true, message: 'Message received' })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
  }
}

export async function GET() {
  const denied = await checkAdmin()
  if (denied) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const submissions = await db.query.contactSubmissions.findMany({
      orderBy: (contactSubmissions, { desc }) => [desc(contactSubmissions.createdAt)],
    })
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json([])
  }
}
