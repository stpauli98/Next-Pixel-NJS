import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import '@/i18n';
import ClientLayout from './client-layout';
import { defaultMetadata } from '@/config/metadata';
import { generateStructuredData } from '@/config/seo/structured-data';
import { AnalyticsProvider } from '@/config/analytics';
import { i18nConfig, getLocaleFromPathname, generateAlternateLinks, Locale } from '@/config/i18n';

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get language from headers (set by middleware)
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const locale = getLocaleFromPathname(pathname);
  const alternateLinks = generateAlternateLinks(pathname);
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Core Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="hN7E93Es-VTP6R-DtmFaYXYmz9aD7Cqhqr4AQLKePC8" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Language and Regional Tags */}
        <meta httpEquiv="content-language" content={locale} />
        <meta name="language" content={locale} />
        <meta name="geo.region" content="BA-SRP" />
        <meta name="geo.placename" content="Gradiška" />
        <meta name="geo.position" content="45.1447;17.2522" />
        <meta name="ICBM" content="45.1447, 17.2522" />
        
        {/* Enhanced SEO Keywords for Local and AI Search */}
        <meta name="keywords" content="web development Republika Srpska, web dizajn Gradiška, izrada sajtova BiH, izrada aplikacija, web developer Bosnia, WordPress BiH, e-commerce Srpska, SEO optimizacija, responsive design, React developer, Next.js, Node.js, mobilne aplikacije, online prodavnica, digitalni marketing" />
        
        {/* Author and Copyright */}
        <meta name="author" content="NextPixel Development Agency" />
        <meta name="copyright" content="NextPixel" />
        <meta name="publisher" content="NextPixel" />
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href={alternateLinks.canonical} />
        {alternateLinks.alternates.map((alt) => (
          <link 
            key={alt.hrefLang} 
            rel="alternate" 
            hrefLang={alt.hrefLang} 
            href={alt.href} 
          />
        ))}
        
        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData(locale)),
          }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* PWA and Mobile Optimization */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NextPixel" />
        <meta name="application-name" content="NextPixel" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        <meta name="theme-color" content="#0070f3" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:site_name" content="NextPixel" />
        <meta property="og:locale" content={i18nConfig.localeCodes[locale as Locale]} />
        {i18nConfig.locales.filter((l) => l !== locale).map((l) => (
          <meta key={l} property="og:locale:alternate" content={i18nConfig.localeCodes[l]} />
        ))}
        <meta property="og:type" content="website" />
        <meta property="og:determiner" content="the" />
        
        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextpixel" />
        <meta name="twitter:creator" content="@nextpixel" />
        
        {/* Additional SEO Tags for Better Discovery */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="expires" content="never" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Security Headers via Meta */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K5TQSBLLQF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K5TQSBLLQF');
            `
          }}
        />
      </head>
      <body>
        <AnalyticsProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AnalyticsProvider>
      </body>
    </html>
  );
}