'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-paper relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-12 left-[8%] hidden md:block" width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="16" stroke="var(--color-green)" strokeWidth="4" strokeDasharray="6 8" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-16 right-[10%] hidden md:block" width="56" height="30" viewBox="0 0 56 30" fill="none">
          <path d="M3 22 Q 14 6, 28 16 T 53 12" stroke="var(--color-sunshine)" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="container-main relative z-10">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-extrabold tracking-tight mt-6 mb-6">
            A space to create, connect &amp; <span className="squiggle">feel again</span>
          </h2>
          <p className="text-warm-gray leading-relaxed text-base md:text-lg">
            Lakiyo&apos;s Oasis was born from a simple belief: creativity heals, connection matters, and everyone deserves a space where they can arrive exactly as they are. We create immersive experiences — from sip and paint nights to flower workshops and book clubs — that help you slow down, express yourself, and leave feeling lighter than you came.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 mt-8 font-heading font-bold text-pink-dark hover:text-pink transition-colors underline underline-offset-4 decoration-2"
          >
            Meet the community
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
