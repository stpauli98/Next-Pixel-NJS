import { ReactNode } from 'react';
import Script from 'next/script';
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
    title: 'Online-Buchungssystem Entwicklung',
    description: 'Professionelle Entwicklung von Online-Buchungssystemen. Terminbuchung, Kalender-Synchronisation, automatische Erinnerungen, Online-Zahlung. Ab 990 EUR.',
  },
  en: {
    title: 'Online Booking System Development',
    description: 'Professional development of online booking systems. Appointment scheduling, calendar sync, automatic reminders, online payments. From 990 EUR.',
  },
  sr: {
    title: 'Izrada Online Booking Sistema',
    description: 'Profesionalna izrada online booking sistema. Zakazivanje termina, sinhronizacija kalendara, automatski podsjetnici, online plaćanje. Od 990 EUR.',
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
    return null;
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
