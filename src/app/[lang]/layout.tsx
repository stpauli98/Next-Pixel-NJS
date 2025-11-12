import { ReactNode } from 'react';
import Script from 'next/script';
import { i18nConfig, type Locale } from '@/config/i18n';
import { getLocaleMetadata } from '@/config/metadata';
import { generateStructuredData } from '@/config/seo/structured-data';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

/**
 * Generate metadata for each locale
 * This makes SEO tags dynamic based on the language
 */
export async function generateMetadata({ params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;

  // Get locale-specific metadata (includes all meta tags)
  return getLocaleMetadata(locale);
}

/**
 * Layout for all localized routes
 * This wraps all pages under /[lang]/ path
 */
export default async function LangLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;

  // Validate locale
  if (!i18nConfig.locales.includes(locale)) {
    return null;
  }

  // Generate structured data for this locale
  const structuredData = generateStructuredData(locale);

  return (
    <>
      {/* Locale-specific structured data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {children}
    </>
  );
}

/**
 * Generate static params for all supported locales
 * This tells Next.js to pre-render pages for sr, en, de
 */
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale,
  }));
}
