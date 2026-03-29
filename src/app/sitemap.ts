import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { siteConfig } from '@/config/metadata'
import { i18nConfig } from '@/config/i18n'
import { getBlogTranslations } from '@/lib/blog'

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
  // Use current build date so Google re-crawls on each deployment
  const lastModified = new Date().toISOString().split('T')[0]

  const locales = i18nConfig.locales

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
  // Uses translation mapping for cross-language hreflang alternates
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
        const fileStat = fs.statSync(path.join(langDir, file))

        // Build hreflang alternates from translation mapping
        const translations = getBlogTranslations(slug)
        const hasTranslations = Object.keys(translations).length > 1
        const alternates = hasTranslations ? {
          languages: {
            ...Object.fromEntries(
              Object.entries(translations).map(([l, s]) => [l, `${baseUrl}/${l}/blog/${s}`])
            ),
            'x-default': translations['en']
              ? `${baseUrl}/en/blog/${translations['en']}`
              : `${baseUrl}/${lang}/blog/${slug}`,
          },
        } : undefined

        blogPages.push({
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified: fileStat.mtime.toISOString().split('T')[0],
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          ...(alternates ? { alternates } : {}),
        })
      }
    }
  }

  return [...mainPages, ...blogIndexPages, ...blogPages]
}
