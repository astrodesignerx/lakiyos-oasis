'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'

const posts: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  'sip-and-paint-nairobi-guide': {
    title: 'What to Expect at a Sip & Paint Session in Nairobi',
    category: 'Experiences',
    date: 'May 15, 2026',
    content: [
      'So you have booked your first sip and paint session at Lakiyo\'s Oasis — welcome to the community! Whether you are coming solo, with a friend, or on a date, here is exactly what to expect so you can arrive feeling confident and excited.',
      'First things first: no experience is needed. Really. Our sessions are designed for absolute beginners. We have a talented facilitator who will guide the group step by step through creating a painting. By the end of the session, you will be genuinely surprised at what you have created.',
      'What should you bring? Just yourself. We provide all the materials — canvas, paints, brushes, aprons, and refreshments. Wear something comfortable that you do not mind getting a little paint on (though our aprons do a great job).',
      'The atmosphere is warm, relaxed, and social. Music plays softly in the background. People chat, laugh, and help each other. There is no pressure to create a masterpiece — this is about the experience, not the outcome.',
      'Each session runs for approximately 3 hours, including a short break. You will leave with your completed painting, a few new friends, and the warm feeling that comes from creating something with your hands.',
      'Ready to book your spot? Check our upcoming events page.',
    ],
  },
  'creative-things-to-do-nairobi-weekend': {
    title: '5 Creative Things to Do in Nairobi This Weekend',
    category: 'Nairobi Activities',
    date: 'May 8, 2026',
    content: [
      'Nairobi is full of energy, but sometimes you want to do something that nourishes your soul rather than just fills your time. Here are five creative activities to try this weekend.',
      '1. Join a Sip & Paint Session — Our signature experience. Paint, sip, and connect with new people in a warm, welcoming setting. No experience needed.',
      '2. Try a Flower Arrangement Workshop — Spend a quiet morning arranging beautiful blooms. You will leave with a stunning creation and a calmer mind.',
      '3. Attend a Book Club Meeting — Our themed book discussions are the perfect way to meet thoughtful, interesting people. This month\'s theme: Stories of Home.',
      '4. Explore a Local Art Market — Nairobi has a vibrant art scene. Spend a Saturday morning browsing local artists at the Village Market or Kazuri Beads.',
      '5. Have a Creative Night In — Pick up one of our coloring books, brew some tea, and spend an evening coloring and unwinding. Sometimes the best creative activity is the one you do alone.',
    ],
  },
  'coloring-as-adult-therapy': {
    title: 'Why Coloring as an Adult is a Form of Therapy',
    category: 'Creative Wellness',
    date: 'April 28, 2026',
    content: [
      'Remember the simple joy of coloring as a child? It turns out that joy is not just nostalgia — it is actually good for your brain.',
      'Adult coloring has gained recognition as a legitimate form of art therapy. The repetitive motion of coloring, the focus on staying within lines, and the creative decision-making all work together to create a meditative state. It is one of the few activities that engages both the creative and analytical parts of your brain simultaneously.',
      'Studies have shown that coloring for just 20 minutes can significantly reduce cortisol levels — the hormone associated with stress. It forces you to be present in the moment, much like mindfulness meditation, but with a tangible, beautiful result at the end.',
      'At YOASIS, we designed our coloring book collections — Oasis Moments, Sip & Paint At Home Edition, and Feel & Flow Pages — specifically with adult wellness in mind. Each page is an invitation to slow down, breathe, and create.',
      'Whether you are dealing with anxiety, going through a transition, or simply need a break from screens, picking up a coloring book might be the most productive thing you do for yourself today.',
    ],
  },
}

export function ArticleDetail({ slug }: { slug: string }) {
  const post = posts[slug]

  if (!post) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="container-main">
          <h1 className="font-heading text-3xl text-charcoal font-bold mb-4">Article Not Found</h1>
          <p className="text-warm-gray mb-6">The article you are looking for does not exist.</p>
          <Button href="/journal">Back to Journal</Button>
        </div>
      </div>
    )
  }

  return (
    <article className="pt-28 pb-20">
      <div className="container-main max-w-3xl mx-auto">
        <ScrollReveal>
          <Link href="/journal" className="text-sm text-coral hover:text-coral-dark transition-colors inline-flex items-center gap-1 mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Journal
          </Link>
          <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-2">{post.category}</p>
          <h1 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-warm-gray/60 mb-10">{post.date}</p>
          <div className="space-y-5 text-warm-gray leading-relaxed text-base md:text-lg">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-16 bg-gradient-to-br from-coral/5 via-yellow/5 to-sage/5 rounded-2xl p-8 md:p-10 text-center">
          <h3 className="font-heading text-2xl text-charcoal font-bold mb-3">
            Ready to experience it in person?
          </h3>
          <p className="text-warm-gray mb-6">
            Book your spot at our next event and discover the YOASIS difference.
          </p>
          <Button href="/events" variant="primary" size="lg">
            Book an Experience
          </Button>
        </div>
      </div>
    </article>
  )
}
