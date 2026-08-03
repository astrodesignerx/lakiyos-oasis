'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Badge, AvailabilityBadge } from '@/components/ui/Badge'
import { experiences, siteConfig } from '@/data/site'
import { formatDate, formatPrice } from '@/lib/utils'

export function FeaturedExperience() {
  const event = experiences[0]

  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <Badge variant="coral" className="-rotate-2">Next Up</Badge>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-extrabold tracking-tight mt-5">
            Featured experience
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-4xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0_0_var(--color-ink)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full min-h-[280px] md:border-r-2 border-b-2 md:border-b-0 border-ink">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div>
                  <AvailabilityBadge status={event.status} />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl text-ink font-extrabold mt-4 mb-4">
                  {event.name}
                </h3>
                <p className="text-warm-gray mb-6 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-sm text-ink/80 font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-pink shrink-0">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink/80 font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-pink shrink-0">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink/80 font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-pink shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink/80 font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-pink shrink-0">
                      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                    <span>{formatPrice(event.price)} per person</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href={`/events`} size="md">
                    Book Now
                  </Button>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to know more about ${event.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-heading font-bold text-ink bg-paper border-2 border-ink rounded-2xl shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all duration-150 min-h-[44px]"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
