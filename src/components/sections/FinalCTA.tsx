'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/site'

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80"
          alt="Community at YOASIS"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coral/90 via-coral/80 to-coral/70" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-[20%] w-16 h-16 rounded-full border-2 border-white/10 animate-float" />
        <div className="absolute bottom-1/3 left-[10%] w-8 h-8 rounded-full bg-white/5 animate-float-delayed" />
      </div>

      <div className="container-main relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-5xl text-white font-bold leading-tight max-w-3xl mx-auto">
            Ready to Create, Connect & Feel Again?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-xl mx-auto">
            Your creative sanctuary is waiting. Book an experience, shop the Oasis, or just come say hello.
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
