'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, staggerItem } from '@/components/shared/Animations'
import { galleryImages } from '@/data/site'

export function Gallery() {
  return (
    <section className="py-20 md:py-28 bg-beige/30">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>Moments from the Oasis</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
            Every Session Leaves You Lighter
          </h2>
          <p className="text-warm-gray mt-4 max-w-xl mx-auto">
            Real moments from our community — laughter, creativity, and connection.
          </p>
        </ScrollReveal>

        <motion.div
          className="columns-2 md:columns-3 gap-4 space-y-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              className="break-inside-avoid overflow-hidden rounded-xl group relative cursor-pointer border-2 border-ink shadow-[4px_4px_0_0_var(--color-ink)]"
              variants={staggerItem}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300 rounded-xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
