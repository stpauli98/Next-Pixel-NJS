import { Metadata } from 'next';

/**
 * Centralizovana metadata konfiguracija za NextPixel sajt
 * Eliminiše duplikovanje i omogućava konzistentnost kroz ceo sajt
 */

// Base URL konfiguracija - Optimized for AI tools and search engines
export const siteConfig = {
  name: 'NextPixel',
  title: 'NextPixel - Professional Web Development & Digital Solutions Agency Bosnia and Herzegovina',
  description: 'Leading web development agency in Republika Srpska, Bosnia and Herzegovina. We build custom websites, mobile apps, e-commerce solutions, and digital platforms. Expert developers creating modern web applications with React, Next.js, and Node.js.',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://nextpixel.dev' 
    : 'http://localhost:3000',
  ogImage: '/opengraph-image.png',
  locale: 'sr_RS',
  // Enhanced keywords for AI tools and voice search
  keywords: [
    // Primary services
    'web development Republika Srpska',
    'website design BiH',
    'mobile app development',
    'e-commerce solutions',
    'digital agency Bosnia',
    'web developer Gradiška',
    'IT company BiH',
    
    // Technologies
    'React developers',
    'Next.js experts',
    'Node.js development',
    'TypeScript programming',
    'JavaScript developers',
    'full-stack development',
    
    // Local SEO
    'izrada sajtova Republika Srpska',
    'web dizajn BiH',
    'digitalna agencija',
    'razvoj softvera',
    
    // AI and voice search optimization
    'best web developer near me',
    'how to build a website',
    'professional website creation',
    'custom web application development',
    'affordable web design services',
    'hire web developers Bosnia Herzegovina',
    
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

/**
 * Locale-specific metadata configuration
 */
export const localeMetadata = {
  sr: {
    title: 'NextPixel - Profesionalan Web Development & Digitalna Rješenja | BiH',
    description: 'Vodeca web development agencija u Republici Srpskoj i BiH. Gradimo prilagođene web stranice, mobilne aplikacije, e-commerce rješenja. Stručni developeri specijalizovani za React, Next.js i Node.js.',
    keywords: 'web development Republika Srpska, web dizajn Gradiška, izrada sajtova BiH, izrada aplikacija, web developer Bosnia, WordPress BiH, e-commerce Srpska, SEO optimizacija, responsive design, React developer, Next.js, Node.js, mobilne aplikacije, online prodavnica, digitalni marketing',
  },
  en: {
    title: 'NextPixel - Professional Web Development & Digital Solutions | Bosnia',
    description: 'Leading web development agency in Republika Srpska, Bosnia and Herzegovina. We build custom websites, mobile apps, e-commerce solutions. Expert developers specializing in React, Next.js, and Node.js.',
    keywords: 'web development Bosnia, website design BiH, mobile app development, e-commerce solutions, digital agency Bosnia, web developer Gradiska, React developers, Next.js experts, Node.js development, TypeScript programming, full-stack development',
  },
  de: {
    title: 'NextPixel - Professionelle Webentwicklung & Digitale Lösungen | Bosnien',
    description: 'Führende Webentwicklungsagentur in der Republika Srpska, Bosnien und Herzegowina. Wir erstellen maßgeschneiderte Websites, mobile Apps und E-Commerce-Lösungen. Experten für React, Next.js und Node.js.',
    keywords: 'Webentwicklung Bosnien, Website-Design BiH, Mobile-App-Entwicklung, E-Commerce-Lösungen, Digitalagentur Bosnien, Webentwickler Gradiska, React-Entwickler, Next.js-Experten, Node.js-Entwicklung, TypeScript-Programmierung',
  },
} as const;

/**
 * Generate locale-specific metadata
 */
export function getLocaleMetadata(locale: 'sr' | 'en' | 'de'): Metadata {
  const localeData = localeMetadata[locale];
  const baseUrl = siteConfig.url;
  const localeCode = locale === 'sr' ? 'sr_RS' : locale === 'en' ? 'en_US' : 'de_DE';

  return {
    title: localeData.title,
    description: localeData.description,
    keywords: localeData.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'sr-RS': `${baseUrl}/sr`,
        'en-US': `${baseUrl}/en`,
        'de-DE': `${baseUrl}/de`,
        'x-default': `${baseUrl}/sr`,
      },
    },
    openGraph: {
      title: localeData.title,
      description: localeData.description,
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.name,
      locale: localeCode,
      alternateLocale: ['sr_RS', 'en_US', 'de_DE'].filter(l => l !== localeCode),
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${localeData.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localeData.title,
      description: localeData.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'content-language': locale,
      'language': locale,
    },
  };
}

/**
 * Page-specific locale metadata
 */
export const pageLocaleMetadata = {
  home: {
    sr: {
      title: 'Web Development & Digitalna Rješenja',
      description: 'Web development agencija u BiH. Profesionalne web stranice, aplikacije i e-commerce rješenja. React, Next.js i Node.js ekspertiza.',
    },
    en: {
      title: 'Web Development & Digital Solutions',
      description: 'Web development agency in Bosnia. Professional websites, apps and e-commerce solutions. React, Next.js and Node.js expertise.',
    },
    de: {
      title: 'Webentwicklung & Digitale Lösungen',
      description: 'Webentwicklungsagentur in Bosnien. Professionelle Websites, Apps und E-Commerce-Lösungen. React, Next.js und Node.js Expertise.',
    },
  },
  blog: {
    sr: {
      title: 'Blog | NextPixel - Web Development Savjeti i Vodici',
      description: 'Najnovije informacije o web developmentu, dizajnu, SEO-u i digitalnom marketingu. Stručni članci i tutorijali.',
    },
    en: {
      title: 'Blog | NextPixel - Web Development Tips and Guides',
      description: 'Latest insights on web development, design, SEO, and digital marketing. Expert articles and tutorials.',
    },
    de: {
      title: 'Blog | NextPixel - Webentwicklung Tipps und Anleitungen',
      description: 'Neueste Erkenntnisse über Webentwicklung, Design, SEO und digitales Marketing. Expertenartikel und Tutorials.',
    },
  },
  terms: {
    sr: {
      title: 'Uslovi Korištenja | NextPixel',
      description: 'Uslovi korištenja web stranice NextPixel. Prava i obaveze korisnika.',
    },
    en: {
      title: 'Terms of Service | NextPixel',
      description: 'Terms of service for NextPixel website. User rights and obligations.',
    },
    de: {
      title: 'Nutzungsbedingungen | NextPixel',
      description: 'Nutzungsbedingungen für die NextPixel-Website. Rechte und Pflichten der Nutzer.',
    },
  },
  privacy: {
    sr: {
      title: 'Politika Privatnosti | NextPixel',
      description: 'Politika privatnosti NextPixel web stranice. Zaštita vaših podataka.',
    },
    en: {
      title: 'Privacy Policy | NextPixel',
      description: 'NextPixel privacy policy. Protection of your data.',
    },
    de: {
      title: 'Datenschutzrichtlinie | NextPixel',
      description: 'NextPixel Datenschutzrichtlinie. Schutz Ihrer Daten.',
    },
  },
} as const;

/**
 * Generate page-specific metadata for a locale
 */
export function getPageMetadata(
  page: keyof typeof pageLocaleMetadata,
  locale: 'sr' | 'en' | 'de'
): Metadata {
  const pageData = pageLocaleMetadata[page][locale];
  const baseUrl = siteConfig.url;

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'sr-RS': `${baseUrl}/sr`,
        'en-US': `${baseUrl}/en`,
        'de-DE': `${baseUrl}/de`,
        'x-default': `${baseUrl}/sr`,
      },
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.name,
      locale: locale === 'sr' ? 'sr_RS' : locale === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [siteConfig.ogImage],
    },
  };
}

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
    logo: `${siteConfig.url}/images/NextPixelV2.webp`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jovana Ducica 15',
      addressLocality: 'Gradiska',
      addressRegion: 'Republika Srpska',
      postalCode: '78400',
      addressCountry: 'BA',
    },
    sameAs: [
      'https://www.instagram.com/pixelnext9'
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
    '@id': 'https://nextpixel.dev/#business',
    name: 'NextPixel',
    alternateName: 'NextPixel Digital Agency',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/NextPixelV2.webp`,
    image: [
      `${siteConfig.url}/images/NextPixelV2.webp`,
      `${siteConfig.url}/images/team.webp`
    ],
    telephone: '+387 66 603 900',
    email: 'pixelnext9@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jovana Ducica 15',
      addressLocality: 'Gradiska',
      addressRegion: 'Republika Srpska',
      postalCode: '78400',
      addressCountry: 'BA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.1447,
      longitude: 17.2522
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Bosnia and Herzegovina'
      },
      {
        '@type': 'Country',
        name: 'Serbia'
      },
      {
        '@type': 'Place',
        name: 'Europe'
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
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal'],
    currenciesAccepted: 'EUR, BAM, USD',
    founder: {
      '@type': 'Person',
      name: 'NextPixel Team'
    },
    foundingDate: '2025',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 10
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
    sameAs: [
      'https://www.instagram.com/pixelnext9'
    ]
  }
};