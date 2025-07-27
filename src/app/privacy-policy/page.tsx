import { Metadata } from 'next';
import PrivacyPolicy from '@/app/privacy-policy/PrivacyPolicy';
import { pageMetadata } from '@/config/metadata';

export const metadata: Metadata = pageMetadata.privacy;

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
