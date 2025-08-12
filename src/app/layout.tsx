import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import '@/i18n';
import ClientLayout from './client-layout';
import { defaultMetadata, structuredData } from '@/config/metadata';

export const metadata: Metadata = defaultMetadata;

// Enhanced structured data for AI visibility
const enhancedStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    structuredData.organization,
    structuredData.website,
    {
      '@type': 'LocalBusiness',
      '@id': 'https://nextpixel.com/#business',
      'name': 'NextPixel',
      'image': 'https://nextpixel.com/og-image.png',
      'description': 'Professional web development and digital solutions agency in Serbia. We create custom websites, mobile apps, and digital experiences that drive business growth.',
      'url': 'https://nextpixel.com',
      'telephone': '+381601234567',
      'email': 'info@nextpixel.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Knez Mihailova 10',
        'addressLocality': 'Belgrade',
        'addressRegion': 'Serbia',
        'postalCode': '11000',
        'addressCountry': 'RS'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 44.8176,
        'longitude': 20.4633
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '09:00',
          'closes': '18:00'
        }
      ],
      'sameAs': [
        'https://www.facebook.com/nextpixel',
        'https://www.linkedin.com/company/nextpixel',
        'https://twitter.com/nextpixel',
        'https://www.instagram.com/nextpixel'
      ],
      'priceRange': '$$',
      'areaServed': [
        {
          '@type': 'City',
          'name': 'Belgrade'
        },
        {
          '@type': 'City',
          'name': 'Novi Sad'
        },
        {
          '@type': 'City',
          'name': 'Niš'
        },
        {
          '@type': 'Country',
          'name': 'Serbia'
        },
        {
          '@type': 'Place',
          'name': 'Europe'
        }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Web Development Services',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Custom Web Development',
              'description': 'Professional website development with modern technologies'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Mobile App Development',
              'description': 'Native and cross-platform mobile applications'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'E-commerce Solutions',
              'description': 'Complete online store development and optimization'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'UI/UX Design',
              'description': 'User interface and experience design services'
            }
          }
        ]
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '127',
        'bestRating': '5'
      }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What web development services does NextPixel offer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'NextPixel offers comprehensive web development services including custom website development, mobile app development, e-commerce solutions, UI/UX design, and digital marketing. We specialize in modern technologies like React, Next.js, Node.js, and provide full-stack development solutions.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Where is NextPixel located?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'NextPixel is based in Belgrade, Serbia, but we serve clients throughout Serbia including Novi Sad and Niš, as well as international clients across Europe and globally. We offer both on-site and remote collaboration.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does it cost to build a website with NextPixel?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Website development costs vary based on project complexity and requirements. We offer competitive pricing starting from €500 for basic websites, €2000+ for custom business websites, and €5000+ for complex e-commerce or enterprise solutions. Contact us for a personalized quote.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long does it take to develop a website?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Development timeline depends on project scope. A basic website takes 2-3 weeks, custom business websites 4-8 weeks, and complex applications 3-6 months. We provide detailed timelines during project planning.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does NextPixel provide website maintenance and support?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, we offer comprehensive maintenance and support packages including regular updates, security monitoring, performance optimization, content updates, and technical support. Our support plans ensure your website stays secure and performs optimally.'
          }
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nextpixel.com/#website',
      'url': 'https://nextpixel.com',
      'name': 'NextPixel',
      'description': 'Web Development & Digital Solutions Agency',
      'publisher': {
        '@id': 'https://nextpixel.com/#organization'
      },
      'potentialAction': [
        {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://nextpixel.com/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      ],
      'inLanguage': ['sr', 'en', 'de']
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nextpixel.com/#breadcrumb',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://nextpixel.com'
        }
      ]
    }
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get language from headers (set by middleware)
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';
  const locale = pathname.split('/')[1] || 'sr';
  const validLocale = ['sr', 'en', 'de'].includes(locale) ? locale : 'sr';
  
  return (
    <html lang={validLocale} suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* Canonical URLs for language versions */}
        <link rel="canonical" href={`https://nextpixel.com${pathname}`} />
        <link rel="alternate" hrefLang="sr" href="https://nextpixel.com/sr" />
        <link rel="alternate" hrefLang="en" href="https://nextpixel.com/en" />
        <link rel="alternate" hrefLang="de" href="https://nextpixel.com/de" />
        <link rel="alternate" hrefLang="x-default" href="https://nextpixel.com" />
        
        {/* Enhanced Structured Data for SEO and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enhancedStructuredData),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA and Mobile */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NextPixel" />
        
        {/* AI and Voice Search Optimization */}
        <meta name="description" content="NextPixel - Professional web development agency in Serbia. We build custom websites, mobile apps, and e-commerce solutions. Expert developers in Belgrade creating digital experiences that drive growth." />
        <meta name="keywords" content="web development Serbia, website design Belgrade, mobile app development, e-commerce solutions, UI/UX design, React developers, Next.js experts, digital agency Serbia, web developer Belgrade, aplikacije, sajtovi, web dizajn" />
        
        {/* Open Graph for Social and AI */}
        <meta property="og:site_name" content="NextPixel" />
        <meta property="og:locale" content={`${validLocale}_RS`} />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />
        
        {/* Twitter Card */}
        <meta name="twitter:site" content="@nextpixel" />
        <meta name="twitter:creator" content="@nextpixel" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5TQSBLLQF', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
