import { Metadata } from 'next';
import PrivacyPolicy from '@/app/[lang]/privacy-policy/PrivacyPolicy';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';

/**
 * Generate metadata for privacy policy page based on locale
 */
export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('privacy', locale);
}

interface PrivacyPolicyPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const resolvedParams = await params;
  return <PrivacyPolicy />;
}
