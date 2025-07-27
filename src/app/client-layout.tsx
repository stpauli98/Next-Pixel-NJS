'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/i18n'; // Import i18n configuration

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary 
      level="global"
      onError={(error, errorInfo) => {
        // Custom error handling za app-level greške
        console.error('App-level error caught by ErrorBoundary:', {
          error: error.message,
          componentStack: errorInfo.componentStack
        });
      }}
    >
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ErrorBoundary>
  );
}
