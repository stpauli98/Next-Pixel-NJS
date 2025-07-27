import { Metadata } from 'next';

/**
 * Centralizovana metadata konfiguracija za NextPixel sajt
 * Eliminiše duplikovanje i omogućava konzistentnost kroz ceo sajt
 */

// Base URL konfiguracija
export const siteConfig = {
  name: 'NextPixel',
  title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
  description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://next-pixel-njs.onrender.com' 
    : 'http://localhost:3000',
  ogImage: '/opengraph-image.png',
  locale: 'sr_RS',
  keywords: [
    'digitalna agencija',
    'web dizajn', 
    'razvoj softvera',
    'digitalni marketing',
    'SEO',
    'web aplikacije',
    'web stranica',
    'NextJS',
    'React',
    'TypeScript'
  ]
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Dodati kada budemo imali Google Search Console setup
    // google: 'google-site-verification-code',
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
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: '+381-XX-XXX-XXXX', // Dodati pravi broj kad bude dostupan
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RS',
      // addressLocality: 'Grad',
      // streetAddress: 'Adresa'
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    priceRange: '$$',
  }
};