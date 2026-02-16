import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://booking.nextpixel.dev'),
};

export default function BookingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
