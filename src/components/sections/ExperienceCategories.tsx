'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { experienceTypes } from '@/data/site'
import { staggerContainer, staggerItem } from '@/components/shared/Animations'

export function ExperienceCategories() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>Our Experiences</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
            Find Your Experience
          </h2>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {experienceTypes.map((exp) => (
            <motion.div key={exp.id} variants={staggerItem}>
              <Link href={`/experiences#${exp.id}`} className="group block">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl text-white font-bold mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {exp.tagline}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
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
