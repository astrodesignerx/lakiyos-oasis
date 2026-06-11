'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/Badge'

const categories = ['All', 'Creative Wellness', 'Experiences', 'Nairobi Activities', 'Community Stories', 'Creativity At Home']

const posts = [
  {
    slug: 'sip-and-paint-nairobi-guide',
    title: 'What to Expect at a Sip & Paint Session in Nairobi',
    category: 'Experiences',
    excerpt: 'Never been to a sip and paint before? Here is everything you need to know — from what to wear to how the session flows.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    date: 'May 15, 2026',
  },
  {
    slug: 'creative-things-to-do-nairobi-weekend',
    title: '5 Creative Things to Do in Nairobi This Weekend',
    category: 'Nairobi Activities',
    excerpt: 'Looking for something different this weekend? Here are five creative experiences in Nairobi that go beyond the usual.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
    date: 'May 8, 2026',
  },
  {
    slug: 'coloring-as-adult-therapy',
    title: 'Why Coloring as an Adult is a Form of Therapy',
    category: 'Creative Wellness',
    excerpt: 'The simple act of coloring can reduce anxiety, improve focus, and bring you back to the present moment. Here is why.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80',
    date: 'April 28, 2026',
  },
  {
    slug: 'corporate-team-building-nairobi',
    title: 'How to Host a Creative Team-Building Event in Nairobi',
    category: 'Experiences',
    excerpt: 'Forget boring trust falls. Here is how creative team-building actually brings your team closer together.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    date: 'April 15, 2026',
  },
  {
    slug: 'how-yoasis-was-born',
    title: 'Our Story: How YOASIS Was Born',
    category: 'Community Stories',
    excerpt: 'From a small gathering of friends to a growing community — the story of how Lakiyo\'s Oasis came to be.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    date: 'March 30, 2026',
  },
  {
    slug: 'flower-workshop-beginners-guide',
    title: 'A Beginner\'s Guide to Flower Arrangement Workshops',
    category: 'Creativity At Home',
    excerpt: 'Everything you need to know before your first flower workshop — including tips for making your arrangement last longer.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
    date: 'March 18, 2026',
  },
]

export function JournalClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-sage/5 via-beige to-yellow/5 pt-24">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-accent text-coral text-lg">The Oasis Journal</span>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mt-4 mb-6">
              Stories, Guides & Inspiration
            </h1>
            <p className="text-warm-gray text-lg max-w-lg mx-auto">
              Creative wellness tips, experience guides, and stories from the YOASIS community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-beige text-charcoal/70 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.08}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="relative h-52 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <Badge variant={post.category === 'Creative Wellness' ? 'sage' : post.category === 'Experiences' ? 'coral' : 'yellow'}>
                        {post.category}
                      </Badge>
                      <h3 className="font-heading text-lg text-charcoal font-bold mt-3 mb-2 group-hover:text-coral transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-warm-gray mb-3 line-clamp-2">{post.excerpt}</p>
                      <span className="text-xs text-warm-gray/60">{post.date}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
