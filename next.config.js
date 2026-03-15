const createMDX = require('@next/mdx')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const securityHeaders = require('./next.config.headers')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,

  // SEO & Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // Redirect www.booking to booking (canonical)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.booking.nextpixel.dev' }],
        destination: 'https://booking.nextpixel.dev/:path*',
        permanent: true,
      },
      // Fix old blog URLs that Google is trying to crawl (404s in GSC)
      // Old format: /blog/{lang}/... → New format: /{lang}/blog/...
      {
        source: '/blog/:lang(sr|en|de)/:slug',
        destination: '/:lang/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/:lang(sr|en|de)',
        destination: '/:lang/blog',
        permanent: true,
      },
    ]
  },

  // Rewrites for manifest and booking subdomain SEO files
  async rewrites() {
    return {
      beforeFiles: [
        // Booking subdomain: robots.txt → API route
        {
          source: '/robots.txt',
          destination: '/api/booking-robots',
          has: [
            { type: 'host', value: 'booking.nextpixel.dev' },
          ],
        },
        {
          source: '/robots.txt',
          destination: '/api/booking-robots',
          has: [
            { type: 'host', value: 'booking.localhost:3000' },
          ],
        },
        // Booking subdomain: sitemap.xml → API route
        {
          source: '/sitemap.xml',
          destination: '/api/booking-sitemap',
          has: [
            { type: 'host', value: 'booking.nextpixel.dev' },
          ],
        },
        {
          source: '/sitemap.xml',
          destination: '/api/booking-sitemap',
          has: [
            { type: 'host', value: 'booking.localhost:3000' },
          ],
        },
      ],
      afterFiles: [
        // Manifest rewrite for locale paths
        {
          source: '/:lang(sr|en|de)/manifest.webmanifest',
          destination: '/manifest.webmanifest',
        },
      ],
    }
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
  env: {
    // BEZBEDNOSNA POPRAVKA: Uklonjen NEXT_PUBLIC_RESEND_API_KEY
    // API ključ mora ostati samo na server strani
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    // BEZBEDNOSNA POPRAVKA: Uklonjen NEXT_PUBLIC_RECIPIENT_EMAIL
    // Email adresa mora ostati samo na server strani
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || 'pixelnext9@gmail.com',
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config and bundle analyzer
module.exports = withBundleAnalyzer(withMDX(nextConfig))
