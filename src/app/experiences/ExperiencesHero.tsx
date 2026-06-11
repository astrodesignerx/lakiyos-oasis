'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ExperiencesHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-coral/10 via-yellow/5 to-sage/10 pt-24">
      <div className="container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionLabel>Our Experiences</SectionLabel>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal font-bold mt-4 mb-6 max-w-3xl mx-auto">
            Choose Your Experience
          </h1>
          <p className="text-warm-gray text-lg max-w-xl mx-auto">
            Browse our experiences below, then head to the Events page to find an upcoming date that works for you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
