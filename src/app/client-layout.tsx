import { LanguageProvider } from '@/context/LanguageContext';
import '@/i18n'; // Import i18n configuration

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
