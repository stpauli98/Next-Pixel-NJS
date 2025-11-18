'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LangAttributeSetter from '@/components/LangAttributeSetter';
import { useEffect } from 'react';
import '@/i18n'; // Import i18n configuration

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // Check for hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
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
        <LangAttributeSetter />
        {children}
      </LanguageProvider>
    </ErrorBoundary>
  );
}
