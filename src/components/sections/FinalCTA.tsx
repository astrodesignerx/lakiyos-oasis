'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-pink overflow-hidden border-t-2 border-ink">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute top-[15%] right-[12%] animate-float hidden md:block" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 6 L38 24 L58 24 L42 36 L48 56 L32 44 L16 56 L22 36 L6 24 L26 24 Z" fill="var(--color-sunshine)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <svg className="absolute bottom-[18%] left-[8%] animate-float-delayed hidden md:block" width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="20" fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth="3" />
        </svg>
        <svg className="absolute top-[20%] left-[20%] hidden lg:block" width="60" height="32" viewBox="0 0 60 32" fill="none">
          <path d="M4 24 Q 16 6, 30 16 T 56 12" stroke="var(--color-paper)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className="container-main relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-4xl md:text-6xl text-white font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to make something?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-xl mx-auto">
            Your creative playground is waiting. Book an experience, shop the Oasis, or just come say hello.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="/events" variant="secondary" size="lg">
              Book Your Experience
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
