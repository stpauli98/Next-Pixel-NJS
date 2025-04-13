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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
