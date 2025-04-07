import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@/i18n';

export const metadata: Metadata = {
  title: 'NextPixel - Digitalna agencija za web i softverska rješenja',
  description: 'Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.',
  keywords: 'digitalna agencija, web dizajn, razvoj softvera, digitalni marketing, SEO, web aplikacije',
  icons: {
    icon: '/images/NextPixelV2_Mini.png',
    apple: '/images/NextPixelV2_Mini.png',
    shortcut: '/images/NextPixelV2_Mini.png'
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
        {children}
      </body>
    </html>
  );
}
