import { Metadata } from 'next';
import Impressum from '@/app/[lang]/impressum/Impressum';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';

export async function generateMetadata({ params }: ImpressumPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('impressum', locale);
}

interface ImpressumPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const resolvedParams = await params;
  return <Impressum />;
}
