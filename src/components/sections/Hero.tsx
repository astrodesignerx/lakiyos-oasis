'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AvailabilityBadge } from '@/components/ui/Badge'
import { experienceTypeLabels, formatDateShort } from '@/lib/utils'
import type { Event } from '@/types'

// Only the styling lives here — images and names come from the events themselves,
// so swapping in genuine event photos updates the hero too.
const polaroidStyles = [
  { rotate: '-rotate-6', accent: 'bg-sunshine' },
  { rotate: 'rotate-3', accent: 'bg-pink' },
  { rotate: '-rotate-2', accent: 'bg-green' },
]

export function Hero({ nextEvent, events }: { nextEvent: Event | null; events: Event[] }) {
  const polaroids = events.slice(0, polaroidStyles.length).map((event, i) => ({
    src: event.image,
    alt: `${event.name} at Lakiyo's Oasis`,
    caption: experienceTypeLabels[event.type] ?? event.name,
    ...polaroidStyles[i],
  }))

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
        {/* 80vh leaves a sliver of the next section showing, which reads as "keep scrolling". */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-32 pb-16 md:pt-40 md:pb-24 min-h-[80vh]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-block"
            >
              {/* Literal before lyrical: the headline carries the feeling, this says what we sell. */}
              <span className="inline-block font-accent text-lg md:text-xl font-bold bg-sunshine text-ink border-2 border-ink rounded-2xl px-5 py-1.5 leading-snug shadow-[3px_3px_0_0_var(--color-ink)]">
                Sip &amp; paint · Flower workshops · Book clubs — Nairobi
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
              Feel again.
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

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
            >
              {nextEvent ? (
                <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 bg-white border-2 border-ink rounded-2xl px-4 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-warm-gray">
                    Next up
                  </span>
                  <span className="font-heading text-lg text-ink">{nextEvent.name}</span>
                  <span className="text-sm text-warm-gray">
                    {formatDateShort(nextEvent.date)} · {nextEvent.time.split(' - ')[0]} · {nextEvent.venue}
                  </span>
                  <AvailabilityBadge status={nextEvent.status} />
                  <Link
                    href={`/events?book=${nextEvent.id}`}
                    className="text-sm font-bold text-pink-dark underline underline-offset-4 decoration-2 hover:text-pink transition-colors duration-150"
                  >
                    Book this →
                  </Link>
                </div>
              ) : (
                <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 bg-white border-2 border-ink rounded-2xl px-4 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-warm-gray">
                    Next up
                  </span>
                  <span className="text-sm text-ink">New dates are being planned.</span>
                  <Link
                    href="/contact"
                    className="text-sm font-bold text-pink-dark underline underline-offset-4 decoration-2 hover:text-pink transition-colors duration-150"
                  >
                    Get told first →
                  </Link>
                </div>
              )}
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
                  top: `${2 + i * 22}%`,
                  left: `${i % 2 === 0 ? 4 + i * 8 : 42}%`,
                  // Earlier cards sit on top, so each card's caption stays clear of the
                  // one stacked below it. Ascending z-index buried every caption but the last.
                  zIndex: polaroids.length - i,
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
    </section>
  )
}
