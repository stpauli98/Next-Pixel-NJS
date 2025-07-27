const createMDX = require('@next/mdx')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images: {
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
