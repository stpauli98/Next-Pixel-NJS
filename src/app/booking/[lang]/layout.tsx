import { ReactNode } from 'react';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { i18nConfig, type Locale } from '@/config/i18n';
import { generateBookingStructuredData } from '@/config/seo/booking-structured-data';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

const bookingMetadata: Record<string, { title: string; description: string }> = {
  de: {
    title: 'Online-Buchungssystem Entwicklung | NextPixel',
    description: 'Gewinnen Sie automatisch mehr Kunden mit einem maßgeschneiderten Buchungssystem. Bis zu 30% mehr Buchungen, 80% weniger Terminausfälle. Fertig in 7-21 Tagen. Ab 990 EUR.',
  },
  en: {
    title: 'Online Booking System Development | NextPixel',
    description: 'Automatically win more customers with a custom booking system. Up to 30% more bookings, 80% fewer no-shows. Ready in 7-21 days. From 990 EUR.',
  },
  sr: {
    title: 'Izrada Online Booking Sistema | NextPixel',
    description: 'Automatski osvojite više klijenata sa prilagođenim booking sistemom. Do 30% više rezervacija, 80% manje propuštenih termina. Gotovo za 7-21 dan. Od 990 EUR.',
  },
};

export async function generateMetadata({ params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  const meta = bookingMetadata[locale] || bookingMetadata.de;
  const baseUrl = 'https://booking.nextpixel.dev';

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'de': `${baseUrl}/de`,
        'en': `${baseUrl}/en`,
        'sr': `${baseUrl}/sr`,
        'x-default': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'NextPixel Booking',
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: meta.title,
      description: meta.description,
    },
    keywords: null,
  };
}

export default async function BookingLangLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const structuredData = generateBookingStructuredData(locale);

  return (
    <>
      <Script
        id="booking-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale,
  }));
}
