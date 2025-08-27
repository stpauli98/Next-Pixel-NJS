# NextPixel Project Overview

## Project Purpose
NextPixel is a multilingual web development agency website built with Next.js 15 and TypeScript. It showcases services, portfolio, and provides a contact system for potential clients.

## Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.17
- **UI Libraries**: Framer Motion, React Icons, Lucide React
- **Internationalization**: react-i18next with 3 languages (Serbian, German, English)
- **Email Service**: Resend API
- **Analytics**: Vercel Analytics, Google Analytics
- **SEO**: next-sitemap, structured data, meta tags optimization

## Project Structure
```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable components
├── config/        # Configuration files (i18n, SEO, metadata)
├── context/       # React contexts (Language)
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries
├── locales/       # Translation files
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Key Features
- Multilingual support (SR, DE, EN)
- SEO optimization with structured data
- Contact form with email integration
- Portfolio showcase with modal previews
- Price calculator for services
- Blog system with MDX support
- Responsive design with mobile optimization
- Security headers and CSP implementation