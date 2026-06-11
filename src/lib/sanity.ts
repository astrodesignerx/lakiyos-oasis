import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export const eventsQuery = `*[_type == "event" && date >= now()] | order(date asc)`
export const productsQuery = `*[_type == "product"] | order(name asc)`
export const articlesQuery = `*[_type == "article"] | order(publishedAt desc)`
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc)`
export const galleryQuery = `*[_type == "galleryImage"] | order(order asc)`
