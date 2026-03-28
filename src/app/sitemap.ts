import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { siteConfig } from '@/config/metadata'

// Helper to generate hreflang alternates for a given path across all locales
function generateAlternates(baseUrl: string, pagePath: string) {
  return {
    languages: {
      sr: `${baseUrl}/sr${pagePath}`,
      en: `${baseUrl}/en${pagePath}`,
      de: `${baseUrl}/de${pagePath}`,
      'x-default': `${baseUrl}/en${pagePath}`,
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  // Update this date when content changes — tells Google to re-crawl
  const lastModified = '2026-03-15'

  const locales = ['sr', 'en', 'de']

  // Main pages for each locale (with hreflang alternates)
  const mainPages = locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: generateAlternates(baseUrl, ''),
  }))

  // Blog index pages for each locale (with hreflang alternates)
  const blogIndexPages = locales.map(locale => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: generateAlternates(baseUrl, '/blog'),
  }))

  // Dynamically discover blog posts from content directory
  // Note: blog posts have different slugs per language, so no cross-language alternates
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

  return [...mainPages, ...blogIndexPages, ...blogPages]
}
