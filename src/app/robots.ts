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
          '/sr/',
          '/en/',
          '/de/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '*.json',
          '/*.json$',
          '/api/send',
          '/src/',
          '/node_modules/',
          '/.git/',
          '/.env*',
          '/twitter-image*',
          '/opengraph-image*',
        ],
      },
      // Specifična pravila za Google bot — bez crawlDelay za brži crawl malog sajta
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/sr/',
          '/en/',
          '/de/',
          '/favicon.ico',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/static/chunks/',
          '/twitter-image*',
          '/opengraph-image*',
        ],
      },
      // Specifična pravila za Bing bot
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/sr/',
          '/en/',
          '/de/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/twitter-image*',
          '/opengraph-image*',
        ],
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