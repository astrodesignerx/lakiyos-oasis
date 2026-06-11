export type ExperienceType = 'sip-and-paint' | 'flower-workshop' | 'book-club' | 'corporate'

export type AvailabilityStatus = 'available' | 'limited' | 'waitlist' | 'sold-out'

export interface Event {
  id: string
  name: string
  slug: string
  type: ExperienceType
  date: string
  time: string
  venue: string
  price: number
  capacity: number
  status: AvailabilityStatus
  description: string
  image: string
  whatsAppMessage?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  collection: string
  type: 'physical' | 'digital'
  price: number
  description: string
  image: string
  features: string[]
}

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  body: string
  image: string
  author: string
  publishedAt: string
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  experience: string
  photo: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export interface NavLink {
  label: string
  href: string
}
