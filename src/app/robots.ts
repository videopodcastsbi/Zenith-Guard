import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual deployed Vercel domain
  const baseUrl = 'https://zenith-guard.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api', '/admin', '/settings', '/games', '/players', '/alerts', '/analytics', '/api-keys', '/billing'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
