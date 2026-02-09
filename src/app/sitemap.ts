import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextpixel.dev'
  // Use a fixed date for sitemap stability (update when content changes)
  const lastModified = '2025-02-01'

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

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Blog index page
  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }

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

  return [rootPage, ...mainPages, ...staticPages, blogIndex, ...blogPages]
}
