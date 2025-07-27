'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { logError } from '@/utils/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * App Router error page za handling aplikacijskih grešaka
 * Automatski wrappuje ErrorBoundary komponentu
 */
const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  // Log greške sa dodatnim kontekstom
  React.useEffect(() => {
    logError('App Router Error Page triggered', error, {
      component: 'ErrorPage',
      level: 'page',
      digest: error.digest,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-nextpixel-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <ErrorBoundary
          level="page"
          onError={(err, errorInfo) => {
            logError('ErrorBoundary within Error Page', err, {
              component: 'ErrorPage->ErrorBoundary',
              errorInfo
            });
          }}
        >
          <CustomErrorFallback error={error} reset={reset} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

/**
 * Custom fallback komponenta specifična za Error page
 */
const CustomErrorFallback: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Dogodila se greška
        </h1>
        
        <p className="text-gray-600 mb-6">
          Izvinjavam se zbog inconvenience-a. Stranica je naišla na neočekivanu grešku.
        </p>

        {/* Development Error Details */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              Detalji greške (development mode)
            </summary>
            <pre className="mt-3 text-xs text-gray-600 whitespace-pre-wrap break-words overflow-auto max-h-40">
              {error.name}: {error.message}
              {error.stack && `\n\n${error.stack}`}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-nextpixel-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-nextpixel-blue/90 transition-colors"
          >
            Pokušaj ponovo
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Idi na početnu stranu
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Ako se problem nastavi, molimo kontaktirajte našu podršku.
          </p>
          <a 
            href="mailto:support@nextpixel.rs"
            className="text-sm text-nextpixel-blue hover:text-nextpixel-blue/80 transition-colors"
          >
            support@nextpixel.rs
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;