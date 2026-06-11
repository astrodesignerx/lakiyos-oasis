'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/site'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80" />
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80"
          alt="Creative sanctuary atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-4 h-4 rounded-full bg-yellow/40 animate-float" />
        <div className="absolute top-1/3 right-[15%] w-6 h-6 rounded-full bg-coral/30 animate-float-delayed" />
        <div className="absolute bottom-1/3 left-[20%] w-3 h-3 rounded-full bg-sage/40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-[25%] w-5 h-5 rounded-full bg-yellow/25 animate-float-delayed" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-[10%] w-8 h-8 rounded-full border-2 border-white/20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block font-accent text-yellow text-lg md:text-xl mb-4">
            Nairobi&apos;s Creative Sanctuary
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          Where Creativity Meets Oliver
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          A warm creative sanctuary in Nairobi where you reconnect with yourself and others through art, expression, and meaningful experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
        >
          <Button href="/events" variant="primary" size="lg">
            Book an Experience
          </Button>
          <Button href="/oasis-at-home" variant="outline" size="lg">
            Shop the Oasis
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.6">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  )
}
