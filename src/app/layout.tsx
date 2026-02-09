import React from 'react';
import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import '@/i18n';
import ClientLayout from './client-layout';
import { defaultMetadata } from '@/config/metadata';
import { AnalyticsProvider } from '@/config/analytics';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read locale from middleware-set request header for reliable <html lang>
  const headersList = await headers();
  const lang = headersList.get('x-locale') || 'sr';

  return (
    <html lang={lang} className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Core Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="hN7E93Es-VTP6R-DtmFaYXYmz9aD7Cqhqr4AQLKePC8" />

        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Author and Copyright */}
        <meta name="author" content="NextPixel Development Agency" />
        <meta name="copyright" content="NextPixel" />
        <meta name="publisher" content="NextPixel" />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* PWA and Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NextPixel" />
        <meta name="application-name" content="NextPixel" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        <meta name="theme-color" content="#0070f3" />

        {/* Open Graph Enhanced */}
        <meta property="og:site_name" content="NextPixel" />
        <meta property="og:type" content="website" />
        <meta property="og:determiner" content="the" />

        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextpixel" />
        <meta name="twitter:creator" content="@nextpixel" />

        {/* Additional SEO Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />

      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K5TQSBLLQF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5TQSBLLQF');
          `}
        </Script>
        
        <AnalyticsProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AnalyticsProvider>
      </body>
    </html>
  );
}