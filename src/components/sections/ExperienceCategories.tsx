'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { experienceTypes } from '@/data/site'
import { staggerContainer, staggerItem } from '@/components/shared/Animations'

const cardAccents = {
  coral: 'bg-pink text-white',
  yellow: 'bg-sunshine text-ink',
  sage: 'bg-green text-white',
  charcoal: 'bg-blue text-white',
}

const cardRotations = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1']

export function ExperienceCategories() {
  return (
    <section className="py-20 md:py-28 bg-paper-dark border-y-2 border-ink">
      <div className="container-main">
        <ScrollReveal className="text-center mb-14">
          <SectionLabel>Our Experiences</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-extrabold tracking-tight mt-6">
            Pick your kind of fun
          </h2>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {experienceTypes.map((exp, i) => (
            <motion.div key={exp.id} variants={staggerItem} className={cardRotations[i % cardRotations.length]}>
              <Link href={`/experiences#${exp.id}`} className="group block h-full">
                <div className="bg-white border-2 border-ink rounded-2xl overflow-hidden shadow-[5px_5px_0_0_var(--color-ink)] transition-all duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[3px_3px_0_0_var(--color-ink)] h-full flex flex-col">
                  <div className="relative h-48 border-b-2 border-ink overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-heading text-xl text-ink font-extrabold">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-warm-gray mt-1 flex-1">
                      {exp.tagline}
                    </p>
                    <span
                      className={`inline-flex self-start items-center gap-1 mt-4 px-3 py-1 rounded-full border-2 border-ink text-xs font-bold ${cardAccents[exp.color]}`}
                    >
                      {exp.price}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
