import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    // Make the API key available to both client and server
    NEXT_PUBLIC_RESEND_API_KEY: process.env.RESEND_API_KEY,
    // Also make it available with the name the API route expects
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    // Recipient email
    NEXT_PUBLIC_RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || 'pixelnext9@gmail.com',
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
