'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { siteConfig } from '@/data/site'

export function CommunityClient() {
  const values = [
    { title: 'Creativity', icon: '🎨', description: 'Everyone is creative. We just provide the space to remember that.' },
    { title: 'Connection', icon: '🤝', description: 'Real bonds form when people create side by side.' },
    { title: 'Joy', icon: '✨', description: 'Experiences designed to bring genuine, unforced joy.' },
    { title: 'Expression', icon: '💬', description: 'A safe space to feel, share, and express without judgment.' },
    { title: 'Belonging', icon: '🏡', description: 'YOASIS is a community you can always come home to.' },
  ]

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80" alt="YOASIS community" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal/70" />
        </div>
        <div className="container-main relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-accent text-yellow text-lg">The Heart of YOASIS</span>
            <h1 className="font-heading text-4xl md:text-6xl text-white font-bold mt-4 mb-6 max-w-3xl mx-auto">
              A Community Built on Creativity & Connection
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div>
                <SectionLabel>Our Story</SectionLabel>
                <h2 className="font-heading text-3xl text-charcoal font-bold mt-3 mb-4">
                  The Story Behind the Oasis
                </h2>
                <div className="space-y-4 text-warm-gray leading-relaxed">
                  <p>
                    Lakiyo&apos;s Oasis began with a simple observation: in a city that never stops moving, there was no warm, welcoming space where people could simply come as they are, create something with their hands, and connect with others without pressure.
                  </p>
                  <p>
                    What started as a small sip and paint gathering among friends quickly grew into something bigger — a community of people craving creative connection, emotional safety, and genuine joy. YOASIS was born from the belief that creativity is not a talent, but a human need.
                  </p>
                  <p>
                    Today, we host experiences that bring people together — from paint nights and flower workshops to book clubs and corporate team-building — all designed with one thing in mind: helping you reconnect with yourself and the people around you.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-beige/50">
        <div className="container-main">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-coral">
                <SectionLabel>Our Mission</SectionLabel>
                <p className="text-warm-gray mt-4 leading-relaxed">
                  To create accessible creative experiences that restore joy, foster genuine connection, and provide emotional sanctuary for anyone who needs it. We believe everyone deserves a space where they can arrive as they are and leave lighter than they came.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-sage">
                <SectionLabel>Our Vision</SectionLabel>
                <p className="text-warm-gray mt-4 leading-relaxed">
                  A world where creative wellness is a normal part of everyday life — where communities gather not just to consume, but to create, express, and heal together. We see YOASIS growing into a network of creative sanctuaries across Africa.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-main max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel>Our Philosophy</SectionLabel>
            <h2 className="font-heading text-3xl text-charcoal font-bold mt-3 mb-6">
              A Safe Space to Create and Feel
            </h2>
            <p className="text-warm-gray leading-relaxed text-lg">
              Creative wellness is the practice of using artistic expression to support mental and emotional health. At YOASIS, we believe that making something with your hands — whether it is a painting, a flower arrangement, or a story — is one of the most powerful ways to process emotions, reduce stress, and reconnect with joy. Our spaces are intentionally designed to be pressure-free, judgment-free, and warmly welcoming to everyone, regardless of skill level.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-coral to-coral-dark text-white">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What is YOASIS?
            </h2>
            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-4">
              YOASIS stands for &ldquo;You + Oasis&rdquo; — because you are the most important part of this community. It is a reminder that you deserve a space to breathe, create, and belong. When you attend a YOASIS event, you are not just booking an experience — you are joining a community of people who believe that creativity and connection are essential to a well-lived life.
            </p>
            <p className="text-white/70 text-sm">
              YOASIS is where you arrive as you are and leave lighter than you came.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
              What We Stand For
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="bg-cream rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-300 h-full">
                  <span className="text-3xl mb-3 block">{v.icon}</span>
                  <h3 className="font-heading text-lg text-charcoal font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-warm-gray">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80" alt="Community" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-sage/90 to-sage-dark/80" />
        </div>
        <div className="container-main relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-4">
              Become Part of YOASIS
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Join an experience, subscribe to our newsletter, or simply follow along on social media. There is always a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/events" variant="secondary">
                Join an Experience
              </Button>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi! I would like to join the YOASIS broadcast list.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300 min-h-[44px]"
              >
                Subscribe on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
