import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/studio', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
