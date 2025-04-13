import { Metadata } from 'next';
import PrivacyPolicy from '@/app/privacy-policy/PrivacyPolicy';

export const metadata: Metadata = {
  title: {
    absolute: 'Privacy Policy',
  },
  description: 'Privacy Policy',
  keywords: 'privacy policy, privacy, policy',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
