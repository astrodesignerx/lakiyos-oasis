'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { testimonials } from '@/data/site'

const avatarColors = ['bg-pink text-white', 'bg-sunshine text-ink', 'bg-green text-white', 'bg-blue text-white']
const cardRotations = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-1']

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-paper-dark border-y-2 border-ink">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>Word on the street</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-extrabold tracking-tight mt-6">
            People leave lighter
          </h2>
        </ScrollReveal>

        <div className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              className={`snap-center shrink-0 w-[85vw] md:w-[400px] ${cardRotations[index % cardRotations.length]}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white border-2 border-ink rounded-2xl p-8 shadow-[5px_5px_0_0_var(--color-ink)] h-full flex flex-col">
                <span className="font-accent text-4xl text-pink leading-none mb-3" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-ink/80 leading-relaxed flex-1 text-sm md:text-base">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t-2 border-ink/10">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-ink font-heading font-extrabold ${avatarColors[index % avatarColors.length]}`}
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
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
