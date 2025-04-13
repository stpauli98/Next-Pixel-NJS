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
  metadataBase: new URL('https://next-pixel-njs.onrender.com'),
  openGraph: {
    title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
    description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
    url: 'https://next-pixel-njs.onrender.com',
    siteName: 'NextPixel',
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
    description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
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
