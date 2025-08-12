import { Metadata } from 'next';

/**
 * Centralizovana metadata konfiguracija za NextPixel sajt
 * Eliminiše duplikovanje i omogućava konzistentnost kroz ceo sajt
 */

// Base URL konfiguracija - Optimized for AI tools and search engines
export const siteConfig = {
  name: 'NextPixel',
  title: 'NextPixel - Professional Web Development & Digital Solutions Agency Serbia',
  description: 'Leading web development agency in Serbia. We build custom websites, mobile apps, e-commerce solutions, and digital platforms. Expert developers in Belgrade, Novi Sad, and Niš creating modern web applications with React, Next.js, and Node.js.',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://nextpixel.com' 
    : 'http://localhost:3000',
  ogImage: '/opengraph-image.png',
  locale: 'sr_RS',
  // Enhanced keywords for AI tools and voice search
  keywords: [
    // Primary services
    'web development Serbia',
    'website design Belgrade',
    'mobile app development',
    'e-commerce solutions',
    'digital agency Serbia',
    'web developer Belgrade',
    'IT company Serbia',
    
    // Technologies
    'React developers',
    'Next.js experts',
    'Node.js development',
    'TypeScript programming',
    'JavaScript developers',
    'full-stack development',
    
    // Local SEO
    'izrada sajtova Beograd',
    'web dizajn Srbija',
    'aplikacije Novi Sad',
    'IT kompanija Niš',
    'digitalna agencija',
    'razvoj softvera',
    
    // AI and voice search optimization
    'best web developer near me',
    'how to build a website',
    'professional website creation',
    'custom web application development',
    'affordable web design services',
    'hire web developers Serbia',
    
    // Business focus
    'business website development',
    'corporate web solutions',
    'startup MVP development',
    'enterprise software solutions',
    'digital transformation services',
    'online presence optimization'
  ],
  // Additional metadata for AI crawlers
  aiOptimization: {
    chatGPT: true,
    claude: true,
    bard: true,
    voiceSearch: true,
    featuredSnippets: true
  }
};

// Twitter/X config
export const twitterConfig = {
  creator: '@nextpixel',
  site: '@nextpixel'
};

/**
 * Osnovni metadata objekt za root layout
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: twitterConfig.creator,
    site: twitterConfig.site,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  verification: {
    google: 'hN7E93Es-VTP6R-DtmFaYXYmz9aD7Cqhqr4AQLKePC8',
    // yandex: 'your-yandex-verification', // Add when you have Yandex verification
    // bing: 'your-bing-verification', // Add when you have Bing verification
  },
  // AI tools optimization is handled through robots.txt and meta tags
  other: {
    'chatgpt-bot': 'index,follow',
    'claude-web': 'index,follow',
    'bard-bot': 'index,follow',
  },
};

/**
 * Helper funkcija za kreiranje page-specific metadata
 */
export function createPageMetadata({
  title,
  description,
  keywords,
  image,
  path = '',
  noIndex = false,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  
  return {
    title,
    description: description || siteConfig.description,
    keywords: keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : undefined,
  };
}

/**
 * Blog-specific metadata
 */
export function createBlogMetadata({
  title,
  description,
  keywords,
  image,
  slug = '',
  publishedDate,
  modifiedDate,
  author = siteConfig.name,
  tags = [],
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  slug?: string;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  tags?: string[];
}): Metadata {
  const url = `${siteConfig.url}/blog/${slug}`;
  const ogImage = image || siteConfig.ogImage;
  const allKeywords = [
    ...siteConfig.keywords,
    ...(keywords || []),
    ...tags,
    'blog',
    'članak'
  ];
  
  return {
    title,
    description: description || siteConfig.description,
    keywords: allKeywords,
    authors: [
      {
        name: author,
        url: siteConfig.url,
      },
    ],
    openGraph: {
      type: 'article',
      title,
      description: description || siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [author],
      tags: tags,
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Predefinirane metadata objekte za česte stranice
 */
export const pageMetadata = {
  blog: createPageMetadata({
    title: 'NextPixel Blog',
    description: 'Pročitajte najnovije članke o web razvoju, dizajnu i digitalnom marketingu.',
    keywords: ['blog', 'članci', 'web razvoj', 'digitalni marketing'],
    path: '/blog'
  }),

  privacy: createPageMetadata({
    title: 'Privacy Policy',
    description: 'Politika privatnosti NextPixel digitalne agencije.',
    keywords: ['privacy policy', 'privatnost', 'GDPR'],
    path: '/privacy-policy',
    noIndex: true // Ne indeksiramo legal stranice
  }),

  terms: createPageMetadata({
    title: 'Terms of Service',
    description: 'Uslovi korišćenja NextPixel digitalnih usluga.',
    keywords: ['terms of service', 'uslovi', 'korišćenje'],
    path: '/terms',
    noIndex: true // Ne indeksiramo legal stranice
  }),

  contact: createPageMetadata({
    title: 'Kontakt',
    description: 'Kontaktirajte NextPixel digitalnu agenciju. Pošaljite nam poruku ili nas pozovite.',
    keywords: ['kontakt', 'poruka', 'telefon', 'email'],
    path: '/contact'
  }),

  portfolio: createPageMetadata({
    title: 'Portfolio',
    description: 'Pogledajte naše najnovije projekte i uspešne realizacije.',
    keywords: ['portfolio', 'projekti', 'realizacije', 'rad'],
    path: '/portfolio'
  }),

  services: createPageMetadata({
    title: 'Usluge',
    description: 'Naše digitalne usluge: web dizajn, razvoj softvera, digitalni marketing i SEO.',
    keywords: ['usluge', 'web dizajn', 'softver', 'marketing'],
    path: '/services'
  }),

  about: createPageMetadata({
    title: 'O nama',
    description: 'Upoznajte NextPixel tim eksperata za digitalne tehnologije.',
    keywords: ['o nama', 'tim', 'eksperti', 'agencija'],
    path: '/about'
  }),
};

/**
 * Structured data helpers za SEO
 */
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RS', // Serbia
    },
    sameAs: [
      // Dodati socijalne mreže kad budu dostupne
      // 'https://www.facebook.com/nextpixel',
      // 'https://www.linkedin.com/company/nextpixel',
      // 'https://twitter.com/nextpixel'
    ],
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://nextpixel.com/#business',
    name: 'NextPixel',
    alternateName: 'NextPixel Digital Agency',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: [
      `${siteConfig.url}/images/office-belgrade.jpg`,
      `${siteConfig.url}/images/team.jpg`,
      `${siteConfig.url}/images/work.jpg`
    ],
    telephone: '+381-60-123-4567',
    email: 'info@nextpixel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Knez Mihailova 10',
      addressLocality: 'Belgrade',
      addressRegion: 'Central Serbia',
      postalCode: '11000',
      addressCountry: 'RS'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.8176,
      longitude: 20.4633
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Belgrade',
        '@id': 'https://www.wikidata.org/wiki/Q3711'
      },
      {
        '@type': 'City', 
        name: 'Novi Sad',
        '@id': 'https://www.wikidata.org/wiki/Q55630'
      },
      {
        '@type': 'City',
        name: 'Niš',
        '@id': 'https://www.wikidata.org/wiki/Q55632'
      },
      {
        '@type': 'Country',
        name: 'Serbia',
        '@id': 'https://www.wikidata.org/wiki/Q403'
      },
      {
        '@type': 'Place',
        name: 'Europe'
      },
      {
        '@type': 'Place',
        name: 'Worldwide',
        description: 'Remote services available globally'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal', 'Cryptocurrency'],
    currenciesAccepted: 'RSD, EUR, USD',
    founder: {
      '@type': 'Person',
      name: 'NextPixel Team'
    },
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50
    },
    slogan: 'Building Digital Excellence',
    knowsAbout: [
      'Web Development',
      'Mobile App Development', 
      'E-commerce Solutions',
      'UI/UX Design',
      'Digital Marketing',
      'SEO Optimization',
      'Cloud Solutions',
      'API Development',
      'Progressive Web Apps',
      'React Development',
      'Next.js Development',
      'Node.js Development'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Website Development',
            description: 'Professional website development with modern technologies'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development',
            description: 'Complete online store solutions with payment integration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO & Digital Marketing',
            description: 'Search engine optimization and online marketing'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Milan Petrović'
        },
        reviewBody: 'Excellent web development services. Professional team and great results!'
      }
    ],
    sameAs: [
      'https://www.facebook.com/nextpixel',
      'https://www.linkedin.com/company/nextpixel',
      'https://twitter.com/nextpixel',
      'https://www.instagram.com/nextpixel',
      'https://github.com/nextpixel'
    ]
  }
};