import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/experiences', '/events', '/oasis-at-home', '/community', '/journal', '/contact']

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/events' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
