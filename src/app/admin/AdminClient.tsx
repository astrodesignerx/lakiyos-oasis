'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { formatPrice } from '@/lib/utils'
import { siteConfig } from '@/data/site'

type Tab = 'bookings' | 'orders' | 'waitlist' | 'contacts' | 'newsletter'

interface BookingRecord {
  id: string
  name: string
  email: string
  whatsapp: string
  amount: number
  status: string
  reference: string
  createdAt: string
  event: { name: string; date: string; time: string }
}

interface OrderRecord {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: string
  reference: string
  deliveryZone: string | null
  createdAt: string
  items: { name: string; price: number }[]
}

interface WaitlistEntry {
  id: string
  name: string
  whatsapp: string
  createdAt: string
  event: { name: string }
}

interface ContactEntry {
  id: string
  name: string
  email: string
  phone: string | null
  enquiry: string | null
  message: string
  createdAt: string
}

export function AdminClient() {
  const { isSignedIn, user } = useUser()
  const [activeTab, setActiveTab] = useState<Tab>('bookings')

  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [contacts, setContacts] = useState<ContactEntry[]>([])
  const [loading, setLoading] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchData = useCallback(async (endpoint: string) => {
    setLoading(true)
    try {
      const res = await fetch(endpoint)
      if (res.ok) return await res.json()
    } catch { /* silent */ }
    finally { setLoading(false) }
    return []
  }, [])

  const loadAll = useCallback(async () => {
    setBookings(await fetchData('/api/bookings'))
    setOrders(await fetchData('/api/orders'))
    setWaitlist(await fetchData('/api/waitlist'))
    setContacts(await fetchData('/api/contact'))
  }, [fetchData])

  useEffect(() => {
    if (isSignedIn) loadAll()
  }, [isSignedIn, loadAll])

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <h1 className="font-heading text-2xl text-charcoal font-bold mb-2">Admin Access</h1>
          <p className="text-sm text-warm-gray mb-6">Sign in to access the admin dashboard.</p>
          <a
            href="/sign-in"
            className="inline-block w-full bg-coral text-white rounded-xl py-3 font-medium hover:bg-coral-dark transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'bookings', label: 'Bookings', count: bookings.length },
    { key: 'orders', label: 'Orders', count: orders.length },
    { key: 'waitlist', label: 'Waitlist', count: waitlist.length },
    { key: 'contacts', label: 'Messages', count: contacts.length },
    { key: 'newsletter', label: 'Newsletter', count: 0 },
  ]

  const filteredBookings = bookings.filter((b) => {
    if (!startDate && !endDate) return true
    const d = new Date(b.createdAt).getTime()
    const s = startDate ? new Date(startDate).getTime() : 0
    const e = endDate ? new Date(endDate).setHours(23, 59, 59) : Infinity
    return d >= s && d <= e
  })

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-charcoal font-bold">Admin Dashboard</h1>
            <p className="text-sm text-warm-gray">{siteConfig.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-warm-gray">{user?.emailAddresses?.[0]?.emailAddress}</span>
            <a
              href="/"
              className="text-sm text-warm-gray hover:text-coral transition-colors"
            >
              View Site
            </a>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === t.key
                  ? 'bg-coral text-white shadow-md'
                  : 'bg-white text-charcoal/70 hover:text-charcoal border border-beige'
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {activeTab === 'bookings' && (
          <div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 rounded-xl border border-beige text-sm" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 rounded-xl border border-beige text-sm" />
              <button onClick={() => { setStartDate(''); setEndDate('') }} className="text-sm text-warm-gray hover:text-coral transition-colors">Clear</button>
            </div>
            {loading ? (
              <p className="text-warm-gray">Loading...</p>
            ) : filteredBookings.length === 0 ? (
              <p className="text-warm-gray py-8 text-center">No bookings found.</p>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="bg-white rounded-xl p-4 shadow-sm border border-beige">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-charcoal">{b.name}</p>
                        <p className="text-sm text-warm-gray">{b.event.name} — {new Date(b.event.date).toLocaleDateString()}</p>
                        <p className="text-xs text-warm-gray/60">{b.email} | {b.whatsapp}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          b.status === 'confirmed' ? 'bg-sage/20 text-sage-dark' : 'bg-yellow/20 text-yellow-dark'
                        }`}>
                          {b.status}
                        </span>
                        <p className="text-sm font-semibold text-charcoal mt-1">{formatPrice(b.amount)}</p>
                        <p className="text-xs text-warm-gray/60">Ref: {b.reference.slice(-8)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {loading ? (
              <p className="text-warm-gray">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-warm-gray py-8 text-center">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm border border-beige">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-charcoal">{o.customerName}</p>
                        <p className="text-xs text-warm-gray">{o.customerEmail}</p>
                        <p className="text-xs text-warm-gray/60 mt-1">
                          {o.items?.map((i: any) => i.name).join(', ') || 'No items'}
                        </p>
                        {o.deliveryZone && <p className="text-xs text-warm-gray/60">Zone: {o.deliveryZone}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          o.status === 'confirmed' ? 'bg-sage/20 text-sage-dark' : 'bg-yellow/20 text-yellow-dark'
                        }`}>
                          {o.status}
                        </span>
                        <p className="text-sm font-semibold text-charcoal mt-1">{formatPrice(o.total)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'waitlist' && (
          <div>
            {loading ? (
              <p className="text-warm-gray">Loading...</p>
            ) : waitlist.length === 0 ? (
              <p className="text-warm-gray py-8 text-center">No waitlist entries.</p>
            ) : (
              <div className="space-y-3">
                {waitlist.map((w) => (
                  <div key={w.id} className="bg-white rounded-xl p-4 shadow-sm border border-beige">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-charcoal">{w.name}</p>
                        <p className="text-sm text-warm-gray">{w.whatsapp}</p>
                        <p className="text-xs text-warm-gray/60">For: {w.event.name}</p>
                      </div>
                      <a
                        href={`https://wa.me/${w.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coral hover:text-coral-dark text-sm font-medium"
                      >
                        Message
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            {loading ? (
              <p className="text-warm-gray">Loading...</p>
            ) : contacts.length === 0 ? (
              <p className="text-warm-gray py-8 text-center">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm border border-beige">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-charcoal">{c.name}</p>
                        <p className="text-xs text-warm-gray">{c.email}{c.phone ? ` | ${c.phone}` : ''}</p>
                      </div>
                      {c.enquiry && <span className="text-xs bg-beige px-2 py-1 rounded-full text-warm-gray shrink-0">{c.enquiry}</span>}
                    </div>
                    <p className="text-sm text-charcoal/80 bg-beige/50 rounded-lg p-3">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div>
            <p className="text-warm-gray text-center py-8">
              Newsletter subscribers are managed via the WhatsApp broadcast list. No additional data available here yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
