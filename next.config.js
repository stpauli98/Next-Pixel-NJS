/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig
