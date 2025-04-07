import React from 'react';
import ClientLayout from './client-layout';
import './globals.css';

export const metadata = {
  title: 'NextPixel - Web Development & Design',
  description: 'Professional web development and design services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
