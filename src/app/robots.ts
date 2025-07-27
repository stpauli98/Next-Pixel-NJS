import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';

/**
 * Automatski generirani robots.txt za NextPixel sajt
 * Definiše pravila za web crawlers i indeksiranje
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/blog/sr/',
          '/blog/en/',
          '/blog/de/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '*.json',
          '/*.json$',
          // Disallow crawling of dynamic API routes
          '/api/send',
          // Disallow crawling of development files
          '/src/',
          '/node_modules/',
          '/.git/',
          '/.env*',
        ],
        // Crawl delay za velike bot-ove
        crawlDelay: 1,
      },
      // Specifična pravila za Google bot
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog/',
          '/blog/sr/',
          '/blog/en/',
          '/blog/de/',
          '/opengraph-image.png',
          '/twitter-image.png',
          '/favicon.ico',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/static/chunks/', // Allow other _next but not chunks for analysis
        ],
        // Google može brže da crawl-uje
        crawlDelay: 0,
      },
      // Specifična pravila za Bing bot
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/blog/',
          '/opengraph-image.png',
          '/twitter-image.png',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
        ],
        crawlDelay: 2,
      },
      // Blokiranje spam botova
      {
        userAgent: [
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'SemrushBot',
          // Dodaj druge spam botove po potrebi
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Host direktiva za specifikovanje kanonskog URL-a
    host: baseUrl,
  };
}

/**
 * Dodatne SEO direktive koje se mogu dodati u META tagove
 */
export const seoDirectives = {
  // Robots meta tag direktive
  index: true,
  follow: true,
  noarchive: false,
  nosnippet: false,
  notranslate: false,
  noimageindex: false,
  
  // Crawling direktive
  maxSnippet: -1, // Nema ograničenja za snippet length
  maxImagePreview: 'large',
  maxVideoPreview: -1,
  
  // Social media crawling
  allowSocialCrawling: true,
} as const;