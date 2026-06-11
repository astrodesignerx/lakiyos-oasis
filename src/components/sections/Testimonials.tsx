'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { testimonials } from '@/data/site'

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-sage/5 via-beige to-yellow/5">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>What the YOASIS Community Says</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
            Real Stories from Real People
          </h2>
        </ScrollReveal>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              className="snap-center shrink-0 w-[85vw] md:w-[400px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-md h-full flex flex-col">
                <svg className="text-coral/20 mb-4" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-warm-gray leading-relaxed flex-1 text-sm md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-beige">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-warm-gray">{t.experience}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
