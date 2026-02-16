'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEffect } from 'react';
import '@/i18n';

export default function BookingClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <ErrorBoundary
      level="global"
      onError={(error, errorInfo) => {
        console.error('Booking app-level error:', {
          error: error.message,
          componentStack: errorInfo.componentStack,
        });
      }}
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ErrorBoundary>
  );
}
