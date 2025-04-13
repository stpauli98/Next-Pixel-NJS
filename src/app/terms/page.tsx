import Terms from '@/app/terms/Terms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Terms of Service',
  },
  description: 'Terms of Service',
  keywords: 'terms of service, terms, service',
};

export default function TermsPage() {
  return <Terms />;
}
