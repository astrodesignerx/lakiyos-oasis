'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Badge, AvailabilityBadge } from '@/components/ui/Badge'
import { experiences, siteConfig } from '@/data/site'
import { formatDate, formatPrice } from '@/lib/utils'
import type { ExperienceType } from '@/types'

export function EventsClient() {
  const [activeFilter, setActiveFilter] = useState<ExperienceType | 'all'>('all')
  const [bookingEvent, setBookingEvent] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState<string | null>(null)
  const [bookingStep, setBookingStep] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'sent' | 'confirmed' | 'failed'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' })
  const [waitlistData, setWaitlistData] = useState({ name: '', whatsapp: '' })
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const paymentRef = useRef<string | null>(null)
  const pollCount = useRef(0)

  useEffect(() => {
    if (paymentStatus !== 'sent' || !paymentRef.current) return

    const interval = setInterval(async () => {
      pollCount.current += 1
      if (pollCount.current > 30) {
        clearInterval(interval)
        return
      }
      try {
        const res = await fetch('/api/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: paymentRef.current }),
        })
        const data = await res.json()
        if (data.status === 'confirmed') {
          setPaymentStatus('confirmed')
          clearInterval(interval)
        } else if (data.status === 'failed') {
          setPaymentStatus('failed')
          clearInterval(interval)
        }
      } catch {
        // keep polling
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [paymentStatus])

  const filters = [
    { label: 'All Events', value: 'all' as const },
    { label: 'Sip & Paint', value: 'sip-and-paint' as const },
    { label: 'Flower Workshops', value: 'flower-workshop' as const },
    { label: 'Book Club', value: 'book-club' as const },
    { label: 'Corporate', value: 'corporate' as const },
  ]

  const filteredExperiences = useMemo(
    () => (activeFilter === 'all' ? experiences : experiences.filter((e) => e.type === activeFilter)),
    [activeFilter]
  )

  const handleBook = (id: string) => {
    setBookingEvent(id)
    setBookingStep(1)
    setFormData({ name: '', email: '', whatsapp: '' })
    setPaymentStatus('idle')
  }

  const handleSubmitBooking = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: bookingEvent,
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process booking')
      }

      paymentRef.current = data.reference
      pollCount.current = 0
      setPaymentStatus('sent')
      setBookingStep(3)
    } catch (err) {
      setPaymentStatus('failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleJoinWaitlist = async () => {
    if (!showWaitlist) return
    setSubmitting(true)
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: showWaitlist,
          name: waitlistData.name,
          whatsapp: waitlistData.whatsapp,
        }),
      })
      setWaitlistSubmitted(true)
    } catch {
      // silently fail, user can try again
    } finally {
      setSubmitting(false)
    }
  }

  const currentEvent = experiences.find((e) => e.id === bookingEvent)

  return (
    <section className="pt-28 pb-20 min-h-screen bg-cream">
      <div className="container-main">
        {bookingStep === 0 && showWaitlist === null && (
          <>
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-4">
                Upcoming Events
              </h1>
              <p className="text-warm-gray text-lg max-w-xl mx-auto">
                All upcoming sessions with dates, venues, and booking. Choose an experience, find your date, and secure your spot.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === f.value
                      ? 'bg-coral text-white shadow-md'
                      : 'bg-white text-charcoal/70 hover:text-charcoal border border-beige'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filteredExperiences.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-warm-gray mb-4">No events are currently listed for this category.</p>
                <p className="text-sm text-warm-gray/70 mb-6">
                  New sessions are added regularly. Join the WhatsApp broadcast list to get first access.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi! I would like to join the YOASIS broadcast list.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-coral font-medium hover:text-coral-dark transition-colors"
                >
                  Join the WhatsApp Broadcast List
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {filteredExperiences.map((event, index) => (
                  <ScrollReveal key={event.id} delay={index * 0.1}>
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="relative h-48">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <Badge variant={event.type === 'sip-and-paint' ? 'coral' : event.type === 'flower-workshop' ? 'yellow' : 'sage'}>
                            {event.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                          <AvailabilityBadge status={event.status} />
                        </div>
                        <h3 className="font-heading text-xl text-charcoal font-bold mb-3">{event.name}</h3>
                        <div className="space-y-1.5 mb-4 text-sm text-charcoal/70">
                          <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 font-semibold text-charcoal">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral shrink-0"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                            <span>{formatPrice(event.price)} / person</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {event.status === 'sold-out' || event.status === 'waitlist' ? (
                            <Button onClick={() => { setShowWaitlist(event.id); setWaitlistSubmitted(false); setWaitlistData({ name: '', whatsapp: '' }) }} variant="primary" size="md" className="w-full">
                              Join Waitlist
                            </Button>
                          ) : (
                            <Button onClick={() => handleBook(event.id)} variant="primary" size="md" className="w-full">
                              Book Now — {formatPrice(event.price)}
                            </Button>
                          )}
                          <a
                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to book ${event.name} on ${formatDate(event.date)}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-sm text-warm-gray hover:text-charcoal transition-colors py-1"
                          >
                            Book via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {bookingEvent && currentEvent && bookingStep > 0 && (
        <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            {bookingStep === 1 && (
              <div>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-4">Confirm Your Booking</h3>
                <div className="bg-beige rounded-xl p-4 mb-6 space-y-1 text-sm">
                  <p className="font-semibold text-charcoal">{currentEvent.name}</p>
                  <p className="text-warm-gray">{formatDate(currentEvent.date)} &middot; {currentEvent.time}</p>
                  <p className="text-warm-gray">{currentEvent.venue}</p>
                  <p className="font-semibold text-coral">{formatPrice(currentEvent.price)} per person</p>
                </div>
                <Button onClick={() => setBookingStep(2)} variant="primary" className="w-full">
                  Continue
                </Button>
                <button
                  onClick={() => { setBookingEvent(null); setBookingStep(0) }}
                  className="w-full mt-2 text-sm text-warm-gray hover:text-charcoal py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            {bookingStep === 2 && (
              <div>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-4">Your Details</h3>
                <div className="space-y-4 mb-6">
                  <input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm"
                  />
                </div>
                <Button onClick={handleSubmitBooking} variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? 'Processing...' : `Pay ${formatPrice(currentEvent.price)} with M-Pesa`}
                </Button>
                <button
                  onClick={() => setBookingStep(1)}
                  className="w-full mt-2 text-sm text-warm-gray hover:text-charcoal py-2 transition-colors"
                >
                  Back
                </button>
              </div>
            )}
            {bookingStep === 3 && paymentStatus === 'sent' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-yellow/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Check Your Phone</h3>
                <p className="text-warm-gray text-sm mb-2">
                  An M-Pesa STK Push prompt has been sent to your phone.
                </p>
                <p className="text-warm-gray text-sm mb-6">
                  Enter your M-Pesa PIN to complete payment. Your spot will be confirmed automatically.
                </p>
                <p className="text-xs text-warm-gray/70">
                  Waiting for payment confirmation...
                </p>
              </div>
            )}
            {bookingStep === 3 && paymentStatus === 'confirmed' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-warm-gray text-sm mb-4">
                  Your spot at <strong>{currentEvent.name}</strong> is reserved.
                </p>
                <p className="text-xs text-warm-gray/70 mb-6">
                  A confirmation has been sent to your email and WhatsApp.
                </p>
                <Button onClick={() => { setBookingEvent(null); setBookingStep(0); paymentRef.current = null; pollCount.current = 0; setPaymentStatus('idle') }} variant="primary">
                  Done
                </Button>
              </div>
            )}
            {paymentStatus === 'failed' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7603A" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Payment Failed</h3>
                <p className="text-warm-gray text-sm mb-6">
                  Something went wrong. You can try again or book via WhatsApp.
                </p>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => { setBookingStep(2); setPaymentStatus('idle'); paymentRef.current = null; pollCount.current = 0 }} variant="primary" className="w-full">
                    Try Again
                  </Button>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to book ${currentEvent?.name}. I had an issue with payment.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-warm-gray hover:text-charcoal py-2 transition-colors"
                  >
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            {waitlistSubmitted ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-charcoal font-bold mb-2">You&apos;re on the List!</h3>
                <p className="text-sm text-warm-gray mb-4">We&apos;ll notify you if a spot opens up.</p>
                <Button onClick={() => { setShowWaitlist(null); setWaitlistSubmitted(false) }} variant="primary" size="sm">
                  Done
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Join the Waitlist</h3>
                <p className="text-sm text-warm-gray mb-6">
                  Enter your details and we&apos;ll notify you if a spot opens up.
                </p>
                <div className="space-y-4 mb-6">
                  <input
                    placeholder="Full Name"
                    value={waitlistData.name}
                    onChange={(e) => setWaitlistData({ ...waitlistData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={waitlistData.whatsapp}
                    onChange={(e) => setWaitlistData({ ...waitlistData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm"
                  />
                </div>
                <Button onClick={handleJoinWaitlist} variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
                <button onClick={() => setShowWaitlist(null)} className="w-full mt-2 text-sm text-warm-gray hover:text-charcoal py-2 transition-colors">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
