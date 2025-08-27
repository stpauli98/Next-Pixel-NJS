// SEO Structured Data Configuration
// Optimized for search engines and AI visibility

export const businessInfo = {
  name: 'NextPixel',
  legalName: 'NextPixel Development Agency',
  url: 'https://nextpixel.dev',
  logo: 'https://nextpixel.dev/logo.png',
  image: 'https://nextpixel.dev/og-image.png',
  telephone: '+38766603900',
  email: 'pixelnext9@gmail.com',
  foundingDate: '2022-01-01',
  founders: [
    {
      '@type': 'Person',
      name: 'NextPixel Team',
      jobTitle: 'Founder & Lead Developer'
    }
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 5,
    maxValue: 15
  }
} as const;

export const addressInfo = {
  '@type': 'PostalAddress',
  streetAddress: 'Vidovdanska',
  addressLocality: 'Gradiška',
  addressRegion: 'Republika Srpska',
  postalCode: '78400',
  addressCountry: 'BA'
} as const;

export const geoInfo = {
  '@type': 'GeoCoordinates',
  latitude: 45.1447,
  longitude: 17.2522
} as const;

export const socialProfiles = [
  'https://www.instagram.com/pixelnext9',
  'https://github.com/nextpixel',
  'https://www.linkedin.com/company/nextpixel'
];

export const urgentKeywords = [
  'hitna izrada web stranice',
  'express web development',
  'brza izrada sajta',
  'web stranica za 7 dana',
  'hitno trebam sajt',
  'urgent website creation',
  'fast web development BiH',
  'express izrada aplikacija',
  'brzi web dizajn',
  'hitna web rješenja',
];

export const services = [
  {
    '@type': 'Service',
    name: 'Custom Web Development',
    description: 'Professional website development with Next.js, React, Node.js. Modern, fast, SEO-optimized web applications.',
    provider: { '@id': 'https://nextpixel.dev/#organization' },
    areaServed: ['Bosnia and Herzegovina', 'Serbia', 'Croatia', 'Europe', 'Worldwide'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter Website',
          description: 'Perfect for small businesses and startups',
          price: '500',
          priceCurrency: 'EUR'
        },
        {
          '@type': 'Offer',
          name: 'Business Website',
          description: 'Advanced features for growing companies',
          price: '2000',
          priceCurrency: 'EUR'
        },
        {
          '@type': 'Offer',
          name: 'Enterprise Solution',
          description: 'Custom enterprise-grade applications',
          price: '5000',
          priceCurrency: 'EUR'
        }
      ]
    }
  },
  {
    '@type': 'Service',
    name: 'Mobile App Development',
    description: 'React Native and Flutter mobile applications for iOS and Android',
    provider: { '@id': 'https://nextpixel.dev/#organization' }
  },
  {
    '@type': 'Service',
    name: 'E-commerce Solutions',
    description: 'Complete online stores with payment integration, inventory management, and analytics',
    provider: { '@id': 'https://nextpixel.dev/#organization' }
  },
  {
    '@type': 'Service',
    name: 'UI/UX Design',
    description: 'Modern, responsive design that converts visitors into customers',
    provider: { '@id': 'https://nextpixel.dev/#organization' }
  },
  {
    '@type': 'Service',
    name: 'SEO Optimization',
    description: 'Technical SEO, content optimization, and local SEO for better rankings',
    provider: { '@id': 'https://nextpixel.dev/#organization' }
  },
  {
    '@type': 'Service',
    name: 'Website Maintenance',
    description: '24/7 monitoring, updates, backups, and technical support',
    provider: { '@id': 'https://nextpixel.dev/#organization' }
  }
];

export const reviews = [
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Marko Petrović' },
    reviewBody: 'Odličan tim, profesionalan pristup i fantastični rezultati. Preporučujem!',
    datePublished: '2024-01-15'
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Ana Jovanović' },
    reviewBody: 'NextPixel je transformisao naš online biznis. Najbolja investicija!',
    datePublished: '2024-02-20'
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Stefan Nikolić' },
    reviewBody: 'Brzina, kvalitet i podrška na najvišem nivou. Svaka preporuka!',
    datePublished: '2024-03-10'
  }
];

export const faqs = [
  {
    '@type': 'Question',
    name: 'Koliko košta izrada web sajta?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Cijena izrade web sajta zavisi od kompleksnosti i funkcionalnosti. Osnovni sajtovi počinju od 500€, poslovni sajtovi od 2000€, a kompleksne aplikacije od 5000€. Kontaktirajte nas za besplatnu ponudu prilagođenu vašim potrebama.'
    }
  },
  {
    '@type': 'Question',
    name: 'Koliko traje izrada web sajta?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Vremenski okvir zavisi od obima projekta. Osnovni sajt 2-3 sedmice, poslovni sajt 4-8 sedmica, kompleksne aplikacije 3-6 mjeseci. Uvijek dostavljamo detaljan vremenski plan prije početka rada.'
    }
  },
  {
    '@type': 'Question',
    name: 'Da li nudite održavanje web sajta?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Da, nudimo kompletne pakete održavanja koji uključuju redovne update-ove, sigurnosni monitoring, optimizaciju performansi, ažuriranje sadržaja i tehničku podršku 24/7.'
    }
  },
  {
    '@type': 'Question',
    name: 'Koje tehnologije koristite?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Koristimo najmodernije tehnologije: Next.js, React, Node.js, TypeScript, Tailwind CSS za frontend; Node.js, Python, PostgreSQL, MongoDB za backend; AWS, Vercel, Docker za deployment.'
    }
  },
  {
    '@type': 'Question',
    name: 'Da li radite SEO optimizaciju?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Da, svi naši sajtovi dolaze sa osnovnom SEO optimizacijom. Nudimo i napredne SEO usluge koje uključuju tehničku optimizaciju, content marketing, local SEO i link building strategije.'
    }
  }
];

// Generate complete structured data
export function generateStructuredData(locale: string = 'sr') {
  const baseUrl = 'https://nextpixel.dev';
  const currentUrl = locale === 'sr' ? baseUrl : `${baseUrl}/${locale}`;
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: businessInfo.name,
        legalName: businessInfo.legalName,
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: businessInfo.logo,
          width: 512,
          height: 512
        },
        image: businessInfo.image,
        telephone: businessInfo.telephone,
        email: businessInfo.email,
        address: addressInfo,
        geo: geoInfo,
        sameAs: socialProfiles,
        foundingDate: businessInfo.foundingDate,
        founders: businessInfo.founders,
        numberOfEmployees: businessInfo.numberOfEmployees,
        knowsAbout: [
          'Web Development',
          'Mobile App Development',
          'E-commerce',
          'UI/UX Design',
          'React',
          'Next.js',
          'Node.js',
          'TypeScript',
          'SEO'
        ],
        owns: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`
        }
      },
      // LocalBusiness
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${baseUrl}/#business`,
        name: businessInfo.name,
        image: businessInfo.image,
        description: locale === 'sr' 
          ? 'Profesionalna agencija za web development i digitalna rješenja u Republici Srpskoj. Kreiramo prilagođene web stranice, mobilne aplikacije i digitalna iskustva koja pokreću rast poslovanja.'
          : 'Professional web development and digital solutions agency in Serbia. We create custom websites, mobile apps, and digital experiences that drive business growth.',
        url: currentUrl,
        telephone: businessInfo.telephone,
        email: businessInfo.email,
        address: addressInfo,
        geo: geoInfo,
        priceRange: '$$',
        currenciesAccepted: 'EUR,BAM,RSD',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer, PayPal',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '10:00',
            closes: '14:00'
          }
        ],
        areaServed: [
          { '@type': 'Country', name: 'Bosnia and Herzegovina' },
          { '@type': 'Country', name: 'Serbia' },
          { '@type': 'Country', name: 'Croatia' },
          { '@type': 'Country', name: 'Montenegro' },
          { '@type': 'Place', name: 'Europe' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development Services',
          itemListElement: services.map(service => ({
            '@type': 'Offer',
            itemOffered: service
          }))
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1'
        },
        review: reviews,
        slogan: locale === 'sr' 
          ? 'Vaš partner za digitalni uspjeh'
          : 'Your Partner in Digital Success',
        makesOffer: services,
        memberOf: [
          {
            '@type': 'Organization',
            name: 'Privredna komora Republike Srpske'
          }
        ]
      },
      // WebSite
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: businessInfo.name,
        description: 'Web Development & Digital Solutions Agency',
        publisher: { '@id': `${baseUrl}/#organization` },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        ],
        inLanguage: ['sr', 'en', 'de'],
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: { '@id': `${baseUrl}/#organization` },
        creator: { '@id': `${baseUrl}/#organization` },
        dateCreated: '2022-01-01',
        dateModified: new Date().toISOString(),
        isAccessibleForFree: true
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}/#webpage`,
        url: currentUrl,
        name: locale === 'sr' 
          ? 'NextPixel - Web Development Agencija | Izrada Sajtova i Aplikacija'
          : 'NextPixel - Web Development Agency | Custom Websites & Apps',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#organization` },
        description: locale === 'sr'
          ? 'NextPixel - Profesionalna izrada web sajtova i mobilnih aplikacija. Moderni dizajn, SEO optimizacija, održavanje. Kontaktirajte nas za besplatnu ponudu!'
          : 'NextPixel - Professional web development and mobile app creation. Modern design, SEO optimization, maintenance. Contact us for a free quote!',
        breadcrumb: { '@id': `${currentUrl}/#breadcrumb` },
        inLanguage: locale,
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [currentUrl]
          }
        ],
        datePublished: '2022-01-01',
        dateModified: new Date().toISOString()
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          }
        ]
      },
      // FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${currentUrl}/#faq`,
        mainEntity: faqs
      },
      // Service (Main)
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service`,
        serviceType: 'Web Development',
        provider: { '@id': `${baseUrl}/#organization` },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Development Services',
          itemListElement: services
        }
      }
    ]
  };
}