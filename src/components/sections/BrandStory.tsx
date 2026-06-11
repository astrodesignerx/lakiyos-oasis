'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3 mb-6">
            A Space to Create, Connect & Feel Again
          </h2>
          <p className="text-warm-gray leading-relaxed text-base md:text-lg">
            Lakiyo&apos;s Oasis was born from a simple belief: creativity heals, connection matters, and everyone deserves a space where they can arrive exactly as they are. We create immersive experiences — from sip and paint nights to flower workshops and book clubs — that help you slow down, express yourself, and leave feeling lighter than you came.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 mt-6 text-coral font-medium hover:text-coral-dark transition-colors"
          >
            Meet the community
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
