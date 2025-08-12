/**
 * Enhanced SEO Configuration with GEO/Local Optimization
 * Comprehensive SEO settings for improved search visibility
 */

import { Metadata } from 'next';

// GEO/Local Business Information
export const geoConfig = {
  // Primary Business Location
  primary: {
    country: 'BA',
    countryName: 'Bosnia and Herzegovina',
    city: 'Gradiška',
    region: 'Republika Srpska',
    postalCode: '78400',
    streetAddress: '', // Add actual street address when available
    latitude: 45.1447, // Gradiška coordinates
    longitude: 17.2522,
    serviceArea: ['Bosnia and Herzegovina', 'Serbia', 'Croatia', 'Montenegro'],
    languages: ['sr', 'en', 'de'],
    currency: 'BAM',
    timezone: 'Europe/Sarajevo',
  },
  
  // Business Contact Information
  contact: {
    phone: '+387 66 603 900',
    whatsapp: '+387 66 603 900',
    email: 'pixelnext9@gmail.com',
    supportEmail: 'pixelnext9@gmail.com',
  },
  
  // Business Hours
  hours: {
    monday: '09:00-17:00',
    tuesday: '09:00-17:00',
    wednesday: '09:00-17:00',
    thursday: '09:00-17:00',
    friday: '09:00-17:00',
    saturday: 'Closed',
    sunday: 'Closed',
    timezone: 'Europe/Sarajevo',
  },
  
  // Local Keywords for GEO Optimization
  localKeywords: {
    sr: [
      'web dizajn Republika Srpska',
      'izrada sajtova BiH',
      'digitalna agencija Gradiška',
      'SEO optimizacija Bosna',
      'web development BiH',
      'aplikacije Republika Srpska',
      'softverska rešenja BiH',
      'e-commerce Bosna i Hercegovina',
      'online prodavnica BiH',
      'web shop Republika Srpska',
    ],
    en: [
      'web design Bosnia Herzegovina',
      'web development Republika Srpska',
      'digital agency Gradiška',
      'SEO BiH',
      'software development Bosnia',
      'mobile apps Republika Srpska',
      'e-commerce BiH',
      'web solutions Bosnia Herzegovina',
    ],
    de: [
      'Webdesign Bosnien',
      'Webentwicklung Republika Srpska',
      'Digitalagentur Gradiška',
      'SEO BiH',
      'Softwareentwicklung Bosnien',
      'E-Commerce Bosnien Herzegowina',
    ],
  },
};

// Enhanced Structured Data for Local SEO
export const enhancedStructuredData = {
  // Local Business Schema with GEO data
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://nextpixel.dev/#organization',
    name: 'NextPixel',
    alternateName: 'NextPixel Digital Agency',
    description: 'Professional digital agency specialized in web design, software development, and digital marketing in Bosnia and Herzegovina',
    url: 'https://nextpixel.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nextpixel.dev/images/NextPixelV2.png',
      width: 500,
      height: 350,
    },
    image: [
      'https://nextpixel.dev/images/NextPixelV2.png',
      'https://nextpixel.dev/opengraph-image.png',
    ],
    telephone: geoConfig.contact.phone,
    email: geoConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: geoConfig.primary.country,
      addressLocality: geoConfig.primary.city,
      addressRegion: geoConfig.primary.region,
      postalCode: geoConfig.primary.postalCode,
      streetAddress: geoConfig.primary.streetAddress,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geoConfig.primary.latitude,
      longitude: geoConfig.primary.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: geoConfig.primary.serviceArea.map(area => ({
      '@type': 'Country',
      name: area,
    })),
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal'],
    currenciesAccepted: 'RSD, EUR, USD',
    availableLanguage: [
      {
        '@type': 'Language',
        name: 'Serbian',
        alternateName: 'sr',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'German',
        alternateName: 'de',
      },
    ],
    knowsAbout: [
      'Web Development',
      'Mobile App Development',
      'E-Commerce Solutions',
      'SEO Optimization',
      'Digital Marketing',
      'UI/UX Design',
      'Custom Software Development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development',
            description: 'Custom website development with modern technologies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-Commerce Solutions',
            description: 'Online shop development and optimization',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization',
            description: 'Search engine optimization for better visibility',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1',
    },
  },
  
  // BreadcrumbList for better navigation in search results
  breadcrumbList: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  
  // Service Schema for specific services
  service: (serviceName: string, description: string, price?: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Organization',
      name: 'NextPixel',
    },
    description,
    areaServed: geoConfig.primary.serviceArea,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://nextpixel.dev/#contact',
      servicePhone: geoConfig.contact.phone,
      availableLanguage: geoConfig.primary.languages,
    },
    offers: price ? {
      '@type': 'Offer',
      price,
      priceCurrency: 'RSD',
    } : undefined,
  }),
  
  // FAQ Schema for common questions
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),
};

// Hreflang configuration for multi-language support
export const hreflangConfig = {
  languages: ['sr', 'en', 'de'],
  defaultLanguage: 'sr',
  
  // Generate hreflang links for a given path
  generateHreflangLinks: (path: string) => {
    const baseUrl = 'https://nextpixel.dev';
    return {
      'sr': `${baseUrl}/sr${path}`,
      'en': `${baseUrl}/en${path}`,
      'de': `${baseUrl}/de${path}`,
      'x-default': `${baseUrl}${path}`, // Fallback for unmatched languages
    };
  },
};

// Performance optimization settings
export const performanceConfig = {
  // Image optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Font optimization
  fonts: {
    display: 'swap', // Improve CLS
    preload: true,
  },
  
  // Core Web Vitals targets
  targets: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 600, // Time to First Byte (ms)
  },
};

// Generate location-specific pages metadata
export function generateLocationMetadata(city: string, lang: 'sr' | 'en' | 'de' = 'sr'): Metadata {
  const titles = {
    sr: `Web Dizajn ${city} | NextPixel - Digitalna Agencija`,
    en: `Web Design ${city} | NextPixel - Digital Agency`,
    de: `Webdesign ${city} | NextPixel - Digitalagentur`,
  };
  
  const descriptions = {
    sr: `Profesionalna izrada web sajtova i aplikacija u ${city}. NextPixel - vaš partner za digitalne usluge.`,
    en: `Professional website and application development in ${city}. NextPixel - your digital services partner.`,
    de: `Professionelle Website- und Anwendungsentwicklung in ${city}. NextPixel - Ihr Partner für digitale Dienstleistungen.`,
  };
  
  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: [...geoConfig.localKeywords[lang], city],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      locale: lang === 'sr' ? 'sr_RS' : lang === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

// AI Search Optimization (for ChatGPT, Bing AI, Google SGE)
export const aiSearchOptimization = {
  // Structured content for AI understanding
  businessSummary: {
    whatWeDo: 'NextPixel is a digital agency that creates modern websites, e-commerce solutions, and custom software applications.',
    whoWeServe: 'Small to medium businesses, startups, and enterprises in Serbia and the Balkans region.',
    whyChooseUs: 'Expert team, modern technologies, competitive pricing, and local market understanding.',
    keyServices: [
      'Website Development',
      'E-Commerce Solutions',
      'Mobile App Development',
      'SEO Optimization',
      'Digital Marketing',
      'Custom Software Development',
    ],
  },
  
  // Conversational keywords for voice search
  voiceSearchKeywords: {
    sr: [
      'ko pravi najbolje sajtove u Beogradu',
      'gde mogu da napravim web shop',
      'koliko košta izrada sajta',
      'najbolja digitalna agencija u Srbiji',
    ],
    en: [
      'who makes the best websites in Belgrade',
      'where can I create an online shop',
      'how much does website development cost',
      'best digital agency in Serbia',
    ],
  },
  
  // Featured snippet optimization
  featuredSnippets: {
    'What is NextPixel?': 'NextPixel is a professional digital agency based in Serbia, specializing in website development, e-commerce solutions, and custom software development.',
    'How much does a website cost?': 'Website development costs vary based on complexity, typically ranging from €500 for basic sites to €5000+ for complex e-commerce solutions.',
    'Why do I need a website in 2025?': 'A website is essential for business credibility, 24/7 availability, reaching more customers, and competing in the digital marketplace.',
  },
};

const seoEnhanced = {
  geoConfig,
  enhancedStructuredData,
  hreflangConfig,
  performanceConfig,
  generateLocationMetadata,
  aiSearchOptimization,
};

export default seoEnhanced;