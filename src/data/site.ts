import type { NavLink, Event, Product, Testimonial, GalleryImage } from '@/types'

export const siteConfig = {
  name: 'Lakiyo\'s Oasis',
  shortName: 'YOASIS',
  tagline: 'Where creativity meets connection',
  taglines: ['Create. Connect. Feel again.', 'Arrive as you are, leave lighter than you came.'],
  description:
    'A creative sanctuary where people reconnect with themselves and others through immersive experiences, emotional expression, and accessible creativity.',
  email: 'lakiyooasis@gmail.com',
  whatsapp: '+254700000000',
  whatsappMessage: 'Hi! I would like to know more about your experiences at Lakiyo\'s Oasis.',
  location: 'Nairobi, Kenya',
  responseTime: 'We typically respond within 24 hours',
  social: {
    instagram: 'https://instagram.com/lakiyasoasis',
    tiktok: 'https://tiktok.com/@lakiyasoasis',
    snapchat: 'https://snapchat.com/add/lakiyasoasis',
  },
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Events', href: '/events' },
  { label: 'Oasis at Home', href: '/oasis-at-home' },
  { label: 'Community', href: '/community' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export const experiences: Event[] = [
  {
    id: 'sip-paint',
    name: 'Sip & Paint',
    slug: 'sip-and-paint',
    type: 'sip-and-paint',
    date: '2026-06-20',
    time: '3:00 PM - 6:00 PM',
    venue: 'Nairobi',
    price: 2500,
    capacity: 20,
    status: 'available',
    description:
      'Guided painting sessions where you sip, create, and connect. No experience needed — just show up and let your creativity flow.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: 'flower-workshop',
    name: 'Flower Arrangement Workshop',
    slug: 'flower-workshop',
    type: 'flower-workshop',
    date: '2026-06-27',
    time: '10:00 AM - 12:00 PM',
    venue: 'Nairobi',
    price: 3500,
    capacity: 15,
    status: 'available',
    description:
      'Slow down and create something beautiful. Learn the art of floral design and take home your own arrangement.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80',
  },
  {
    id: 'book-club',
    name: 'Book Club',
    slug: 'book-club',
    type: 'book-club',
    date: '2026-07-04',
    time: '4:00 PM - 6:00 PM',
    venue: 'Nairobi',
    price: 1500,
    capacity: 12,
    status: 'limited',
    description:
      'Themed reading circles where stories spark connection. Curious minds welcome — read, discuss, belong.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
  },
]

export const experienceTypes = [
  {
    id: 'sip-and-paint',
    title: 'Sip & Paint',
    tagline: 'Paint, sip, and connect',
    description:
      'Guided painting sessions where you sip, create, and connect. No experience needed — just show up and let your creativity flow.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    details: ['All materials provided', 'Couples to groups of 20+', 'Perfect for friends & corporates'],
    price: 'From KES 2,500/person',
    color: 'coral' as const,
  },
  {
    id: 'flower-workshop',
    title: 'Flower Workshops',
    tagline: 'Design, arrange, take home',
    description:
      'Slow down and create something beautiful. Learn the art of floral design and take home your own arrangement.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80',
    details: ['Take home your arrangement', '~2 hour sessions', 'Complete beginners welcome'],
    price: 'From KES 3,500/person',
    color: 'yellow' as const,
  },
  {
    id: 'book-club',
    title: 'Book Clubs',
    tagline: 'Read, discuss, belong',
    description:
      'Themed reading circles where stories spark connection. Curious minds welcome — read, discuss, belong.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    details: ['Rotating themes & genres', 'Monthly gatherings', 'Inclusive & welcoming'],
    price: 'From KES 1,500/session',
    color: 'sage' as const,
  },
  {
    id: 'corporate',
    title: 'Corporate Experiences',
    tagline: 'Team building, reimagined creatively',
    description:
      'Custom creative team-building packages that your team will actually remember. Fully tailored to your company.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    details: ['Fully customised packages', 'Min 10 people', 'All materials & facilitation included'],
    price: 'Custom quote',
    color: 'charcoal' as const,
  },
]

export const products: Product[] = [
  {
    id: 'oasis-moments',
    name: 'Oasis Moments',
    slug: 'oasis-moments',
    collection: 'Coloring Book',
    type: 'physical',
    price: 1200,
    description: 'Nature-inspired pages that transport you to a calm, beautiful place.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80',
    features: ['20 nature-inspired pages', 'Premium paper', 'Suitable for all ages'],
  },
  {
    id: 'sip-paint-home',
    name: 'Sip & Paint At Home Edition',
    slug: 'sip-paint-home',
    collection: 'Coloring Book',
    type: 'physical',
    price: 1200,
    description: 'Paint-and-color hybrid pages inspired by our signature experience.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80',
    features: ['15 hybrid pages', 'Includes paint guide', 'Perfect for date nights'],
  },
  {
    id: 'feel-flow',
    name: 'Feel & Flow Pages',
    slug: 'feel-flow',
    collection: 'Coloring Book',
    type: 'physical',
    price: 1200,
    description: 'Emotional expression coloring pages for your quiet moments.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80',
    features: ['25 expressive pages', 'Journaling prompts', 'Therapeutic themes'],
  },
  {
    id: 'digital-pack-1',
    name: 'Digital Coloring Pack - Vol 1',
    slug: 'digital-pack-1',
    collection: 'Digital Downloads',
    type: 'digital',
    price: 500,
    description: 'Instant download of 10 beautifully designed coloring pages. Print at home or color on your device.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    features: ['10 printable pages', 'PDF format', 'Instant download'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah',
    quote: 'I walked in feeling stressed and left feeling lighter than I have in weeks. The sip and paint session was exactly what I needed.',
    experience: 'Sip & Paint',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: '2',
    name: 'James',
    quote: 'The flower workshop was such a calming, meditative experience. I surprised myself with what I created. Coming back for the paint night!',
    experience: 'Flower Workshop',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: '3',
    name: 'Amina',
    quote: 'YOASIS is more than an event — it is a community. I have met some of the most genuine people at the book club. Truly special.',
    experience: 'Book Club',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: '4',
    name: 'David',
    quote: 'We booked a corporate session and it was the best team-building we have ever done. Everyone was engaged, laughing, and creating together.',
    experience: 'Corporate Event',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
]

export const galleryImages: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', alt: 'Guests painting at a YOASIS event', width: 600, height: 800 },
  { id: '2', src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80', alt: 'Flower arrangement workshop in Nairobi', width: 600, height: 600 },
  { id: '3', src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80', alt: 'Book club gathering', width: 600, height: 450 },
  { id: '4', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', alt: 'Creative team building event', width: 600, height: 750 },
  { id: '5', src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80', alt: 'Sip and paint at home kit', width: 600, height: 600 },
  { id: '6', src: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80', alt: 'Creative session atmosphere', width: 600, height: 450 },
  { id: '7', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80', alt: 'Friends laughing at YOASIS event', width: 600, height: 600 },
  { id: '8', src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', alt: 'Coloring book product shot', width: 600, height: 750 },
  { id: '9', src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80', alt: 'Creative wellness moment', width: 600, height: 600 },
]
