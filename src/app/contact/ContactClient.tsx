'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/site'

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', enquiry: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      // silent
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-coral/5 via-yellow/5 to-sage/5 pt-24">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-accent text-coral text-lg">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mt-4 mb-6">
              We Would Love to Hear From You
            </h1>
            <p className="text-warm-gray text-lg max-w-lg mx-auto">
              Whether you have a question, want to book a private event, or just want to say hello — we are here.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto">
            <div className="md:col-span-3 order-2 md:order-1">
              <ScrollReveal>
                <h2 className="font-heading text-2xl text-charcoal font-bold mb-6">Send Us a Message</h2>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-sage/10 border border-sage/20 rounded-2xl p-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Message Sent!</h3>
                    <p className="text-warm-gray text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm" />
                    <input type="email" placeholder="Email Address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm" />
                    <input type="tel" placeholder="WhatsApp Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm" />
                    <select value={form.enquiry} onChange={(e) => setForm({ ...form, enquiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm text-charcoal/70 bg-white">
                      <option value="">What is your enquiry about?</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Event Booking">Event Booking</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Shop Order">Shop Order</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea placeholder="Your Message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-colors text-sm resize-none" />
                    <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    <p className="text-xs text-warm-gray/70 text-center">{siteConfig.responseTime}</p>
                  </form>
                )}
              </ScrollReveal>
            </div>

            <div className="md:col-span-2 order-1 md:order-2">
              <ScrollReveal delay={0.15}>
                <div className="bg-cream rounded-2xl p-8 space-y-6">
                  <h2 className="font-heading text-xl text-charcoal font-bold mb-2">Contact Details</h2>

                  <div>
                    <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-2">WhatsApp</p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-coral font-medium hover:text-coral-dark transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chat with Us on WhatsApp
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-2">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-charcoal hover:text-coral transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-2">Location</p>
                    <p className="text-sm text-warm-gray">{siteConfig.location}</p>
                    <p className="text-xs text-warm-gray/70 mt-1">
                      We host experiences at rotating venues across Nairobi. Specific locations are shared upon booking.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-beige">
                    <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-4">Follow Us</p>
                    <div className="flex items-center gap-4">
                      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-coral transition-colors" aria-label="Instagram">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-coral transition-colors" aria-label="TikTok">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                      </a>
                      <a href={siteConfig.social.snapchat} target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-coral transition-colors" aria-label="Snapchat">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.02c-5.066 0-9.172 3.943-9.172 8.808 0 2.146.926 4.086 2.404 5.512-.036.234-.06.474-.06.718 0 .525.113 1.022.296 1.474.267.214.623.315.998.315.069 0 .137-.004.206-.01.438.878 1.384 1.733 2.551 2.015 1.162.28 2.246.018 2.928-.74.106-.118.204-.248.295-.385.582.438 1.274.73 2.046.73.718 0 1.363-.265 1.926-.668.577.648 1.477.95 2.556.702 1.204-.276 2.182-1.175 2.626-2.08.067.005.134.01.2.01.354 0 .689-.105.949-.302.179-.466.289-.975.289-1.511 0-.246-.025-.488-.064-.725 1.462-1.426 2.376-3.356 2.376-5.487 0-4.865-4.106-8.808-9.172-8.808z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
