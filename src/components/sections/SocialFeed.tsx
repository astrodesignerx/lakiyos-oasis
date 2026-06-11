'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { siteConfig } from '@/data/site'

export function SocialFeed() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>Follow the Oasis</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
            @{siteConfig.social.instagram.split('/').pop()}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ScrollReveal key={i} delay={(i - 1) * 0.05}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square rounded-xl overflow-hidden bg-beige"
              >
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1513364776144-60967b0f800f' : i === 2 ? '1563241527-3004b7be0ffd' : i === 3 ? '1524995997946-a1c2e315a42f' : i === 4 ? '1529156069898-49953e39b3ac' : i === 5 ? '1513542789411-b6a5d4f31634' : '1452860606245-08befc0ff44b'}?w=400&q=80`}
                  alt={`YOASIS social moment ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coral font-medium hover:text-coral-dark transition-colors"
          >
            Follow Us on Instagram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
