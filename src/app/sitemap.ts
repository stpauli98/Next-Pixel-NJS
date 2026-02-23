import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { siteConfig } from '@/config/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  // Use a fixed date for sitemap stability (update when content changes)
  const lastModified = '2026-02-23'

  const locales = ['sr', 'en', 'de']

  // Main pages for each locale
  const mainPages = locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  // Root URL
  const rootPage = {
    url: baseUrl,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  // Legal pages for each locale
  const legalPages = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${locale}/impressum`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${locale}/cookie-policy`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ])

  // Blog index pages for each locale
  const blogIndexPages = locales.map(locale => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamically discover blog posts from content directory
  const blogPages: MetadataRoute.Sitemap = []
  const blogDir = path.join(process.cwd(), 'content', 'blog')

  if (fs.existsSync(blogDir)) {
    const languages = fs.readdirSync(blogDir).filter(file =>
      fs.statSync(path.join(blogDir, file)).isDirectory()
    )

    for (const lang of languages) {
      const langDir = path.join(blogDir, lang)
      const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'))

      for (const file of files) {
        const slug = file.replace(/\.mdx$/, '')
        blogPages.push({
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })
      }
    }
  }

  return [rootPage, ...mainPages, ...legalPages, ...blogIndexPages, ...blogPages]
}
