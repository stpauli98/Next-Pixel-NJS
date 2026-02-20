import { Metadata } from 'next';
import CookiePolicy from '@/app/[lang]/cookie-policy/CookiePolicy';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';

export async function generateMetadata({ params }: CookiePolicyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('cookiePolicy', locale);
}

interface CookiePolicyPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function CookiePolicyPage({ params }: CookiePolicyPageProps) {
  const resolvedParams = await params;
  return <CookiePolicy />;
}
