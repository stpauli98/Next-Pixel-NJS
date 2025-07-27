import Terms from '@/app/terms/Terms';
import { Metadata } from 'next';
import { pageMetadata } from '@/config/metadata';

export const metadata: Metadata = pageMetadata.terms;


export default function TermsPage() {
  return <Terms />;
}
