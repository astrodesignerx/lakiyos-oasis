'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const tickerItems = [
  'Sip & Paint',
  'Flower Workshops',
  'Book Club',
  'Corporate Experiences',
  'Oasis at Home',
  'Nairobi, Kenya',
]

const polaroids = [
  {
    src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    alt: 'Guests painting at a YOASIS sip and paint event',
    caption: 'paint night!',
    rotate: '-rotate-6',
    accent: 'bg-sunshine',
  },
  {
    src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80',
    alt: 'Flower arrangement workshop in Nairobi',
    caption: 'fresh blooms',
    rotate: 'rotate-3',
    accent: 'bg-pink',
  },
  {
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    alt: 'Book club gathering at YOASIS',
    caption: 'book club',
    rotate: '-rotate-2',
    accent: 'bg-green',
  },
]

export function Hero() {
  return (
    <section className="relative bg-paper overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-sunshine/40 blur-2xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-pink/20 blur-2xl" />
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-green/20 blur-2xl" />
        <svg className="absolute top-28 right-[12%] hidden lg:block animate-wobble" width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path d="M8 40 Q 20 8, 38 22 T 62 30" stroke="var(--color-pink)" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
        <svg className="absolute bottom-[22%] left-[6%] hidden lg:block" width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d="M26 4 L31 19 L47 19 L34 29 L39 45 L26 35 L13 45 L18 29 L5 19 L21 19 Z" fill="var(--color-sunshine)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-32 pb-16 md:pt-40 md:pb-24 min-h-[92vh]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-block"
            >
              <span className="inline-block font-accent text-xl md:text-2xl font-bold bg-sunshine text-ink border-2 border-ink rounded-full px-5 py-1 shadow-[3px_3px_0_0_var(--color-ink)]">
                Nairobi&apos;s creative playground
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-ink font-extrabold leading-[0.95] tracking-tight mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              Make <span className="squiggle">stuff</span>.
              <br />
              Make <span className="text-pink">friends</span>.
              <br />
              Feel <span className="relative inline-block">
                again
                <svg className="absolute -right-8 -top-4 w-8 h-8 hidden sm:block" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 2 L19 12 L29 12 L21 18 L24 29 L16 22 L8 29 L11 18 L3 12 L13 12 Z" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </span>.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-warm-gray mt-6 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Sip &amp; paint nights, flower workshops, book clubs and at-home creative kits.
              No talent required — just show up as you are.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <Button href="/events" variant="primary" size="lg">
                Book an Experience
              </Button>
              <Button href="/oasis-at-home" variant="secondary" size="lg">
                Shop the Oasis
              </Button>
            </motion.div>
          </div>

          {/* Polaroid collage */}
          <motion.div
            className="relative hidden md:flex items-center justify-center h-[480px] lg:h-[560px]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          >
            {polaroids.map((p, i) => (
              <div
                key={p.caption}
                className={`absolute w-56 lg:w-64 bg-white border-2 border-ink shadow-[6px_6px_0_0_var(--color-ink)] p-3 pb-10 ${p.rotate}`}
                style={{
                  top: `${8 + i * 26}%`,
                  left: `${i % 2 === 0 ? 4 + i * 8 : 42}%`,
                  zIndex: i + 1,
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 224px, 256px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-accent text-xl text-ink whitespace-nowrap">
                  {p.caption}
                </span>
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${p.accent} border-2 border-ink rotate-2`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative border-y-2 border-ink bg-pink text-white overflow-hidden py-3">
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {tickerItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center font-heading font-bold uppercase tracking-wider text-sm md:text-base">
                  <span className="px-6">{item}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="sr-only">{tickerItems.join(', ')}</span>
      </div>
    </section>
  )
}
