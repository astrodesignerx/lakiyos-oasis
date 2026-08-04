import { siteConfig } from '@/data/site'

function toISODateTime(date: string, time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/)
  if (!match) return `${date}T00:00:00`
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const modifier = match[3].toUpperCase()
  if (modifier === 'PM' && hours < 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0
  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  return `${date}T${hh}:${mm}:00`
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lakiyasoasis.com',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: 'https://lakiyasoasis.com',
    email: siteConfig.email,
    telephone: siteConfig.whatsapp,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      siteConfig.social.snapchat,
    ],
    knowsAbout: [
      'Creative experiences',
      'Sip and paint',
      'Flower arrangement workshops',
      'Book clubs',
      'Corporate team building',
      'Creative wellness',
      'Art therapy',
      'Social wellness',
    ],
  }
}

export function eventSchema(event: {
  name: string
  date: string
  time: string
  venue: string
  price: number
  description: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: toISODateTime(event.date, event.time),
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      url: event.url || 'https://lakiyasoasis.com/events',
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: 'https://lakiyasoasis.com',
    },
  }
}

export function productSchema(product: {
  name: string
  description: string
  price: number
  image: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      url: product.url || 'https://lakiyasoasis.com/oasis-at-home',
    },
  }
}

export function articleSchema(article: {
  title: string
  excerpt: string
  image: string
  date: string
  author?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    url: article.url,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://lakiyasoasis.com${item.url}`,
    })),
  }
}
