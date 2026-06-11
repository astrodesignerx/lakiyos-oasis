'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { siteConfig } from '@/data/site'

const colorMap = {
  coral: { bg: 'from-coral/10 via-white to-coral/5', border: 'border-coral/20', badge: 'coral' as const, text: 'text-coral' },
  yellow: { bg: 'from-yellow/10 via-white to-yellow/5', border: 'border-yellow/20', badge: 'yellow' as const, text: 'text-yellow-dark' },
  sage: { bg: 'from-sage/10 via-white to-sage/5', border: 'border-sage/20', badge: 'sage' as const, text: 'text-sage-dark' },
  charcoal: { bg: 'from-charcoal/[0.03] via-white to-charcoal/[0.02]', border: 'border-charcoal/10', badge: 'charcoal' as const, text: 'text-charcoal' },
}

interface ExperienceDetailProps {
  experience: {
    id: string
    title: string
    tagline: string
    description: string
    image: string
    details: string[]
    price: string
    color: 'coral' | 'yellow' | 'sage' | 'charcoal'
  }
  index: number
}

export function ExperienceDetail({ experience, index }: ExperienceDetailProps) {
  const colors = colorMap[experience.color]
  const isReversed = index % 2 !== 0

  return (
    <section id={experience.id} className={`py-16 md:py-24 bg-gradient-to-br ${colors.bg}`}>
      <div className="container-main">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`${isReversed ? 'md:order-2' : ''}`}>
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className={`${isReversed ? 'md:order-1' : ''}`}>
              <Badge variant={colors.badge}>{experience.color === 'charcoal' ? 'For Teams' : 'Experience'}</Badge>
              <h2 className="font-heading text-2xl md:text-3xl text-charcoal font-bold mt-3 mb-2">
                {experience.title}
              </h2>
              <p className={`font-accent text-lg ${colors.text} mb-4`}>
                {experience.tagline}
              </p>
              <p className="text-warm-gray leading-relaxed mb-6">
                {experience.description}
              </p>
              <ul className="space-y-2 mb-6">
                {experience.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-charcoal mb-6">
                {experience.price}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/events" variant="primary" size="md">
                  See Upcoming Dates
                </Button>
                {experience.id !== 'corporate' ? (
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to know more about ${experience.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-charcoal border-2 border-charcoal/10 rounded-xl hover:bg-charcoal/5 transition-all duration-300 min-h-[44px]"
                  >
                    Enquire on WhatsApp
                  </a>
                ) : (
                  <Button href="/contact" variant="outline" size="md">
                    Request a Custom Quote
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
