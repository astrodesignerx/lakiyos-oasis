'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { siteConfig } from '@/data/site'

export function SubscriptionPreview() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-yellow/5 via-white to-sage/5">
      <div className="container-main">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-beige">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80"
                alt="Creative subscription kit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coral/20 to-transparent" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <ScrollReveal>
                <SectionLabel>Coming Soon</SectionLabel>
                <h2 className="font-heading text-2xl md:text-3xl text-charcoal font-bold mt-3 mb-4">
                  The YOASIS Monthly Kit
                </h2>
                <p className="text-warm-gray leading-relaxed mb-4">
                  A curated creative experience delivered to your door every month. Each kit includes a themed coloring book, art supplies, creative prompts, and access to an exclusive digital session.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Themed coloring book', 'Premium art supplies', 'Creative prompt cards', 'Exclusive digital session access'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7603A" strokeWidth="2" className="shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi! I am interested in the YOASIS Monthly Kit. Keep me updated!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-coral rounded-xl hover:bg-coral-dark transition-all duration-300 min-h-[44px]"
                  >
                    Join the Waitlist
                  </a>
                  <Button href="/oasis-at-home" variant="ghost" size="md">
                    Shop Current Products
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
