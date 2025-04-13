import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@/i18n';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: {
    default: 'NextPixel - Digitalna agencija za web i softverska rješenja',
    template: '%s | NextPixel - Digitalna agencija za web i softverska rješenja',
  },
  description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
  keywords: 'digitalna agencija, web dizajn, razvoj softvera, digitalni marketing, SEO, web aplikacije, web stranica',
  openGraph: {
    title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
    description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
    url: 'https://next-pixel-njs.onrender.com',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'NextPixel - Digitalna agencija za web i softverska rješenja',
      },
    ],
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
    description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
