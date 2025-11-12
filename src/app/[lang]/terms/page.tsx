import Terms from '@/app/[lang]/terms/Terms';
import { Metadata } from 'next';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';

/**
 * Generate metadata for terms page based on locale
 */
export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('terms', locale);
}


interface TermsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const resolvedParams = await params;
  return <Terms />;
}
