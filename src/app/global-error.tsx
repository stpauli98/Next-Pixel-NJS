'use client';

import React from 'react';
import { logError } from '@/utils/logger';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error boundary za cele aplikacije
 * Ovo je poslednja linija odbrane za neuhvaćene greške
 * MORA da bude u root app direktorijumu
 */
const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  // Log kritične greške
  React.useEffect(() => {
    logError('CRITICAL: Global Error boundary triggered', error, {
      component: 'GlobalError',
      level: 'global',
      digest: error.digest,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      timestamp: new Date().toISOString()
    });

    // U production environment-u, možemo poslati error na monitoring servis
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error monitoring service (Sentry, LogRocket, etc.)
      console.error('Global error logged:', {
        message: error.message,
        stack: error.stack,
        digest: error.digest
      });
    }
  }, [error]);

  return (
    <html lang="sr">
      <head>
        <title>Greška - NextPixel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a2463 0%, #247ba0 100%);
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .error-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
          }
          
          .error-icon {
            width: 64px;
            height: 64px;
            background: #fee2e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          
          .error-icon svg {
            width: 32px;
            height: 32px;
            color: #dc2626;
          }
          
          h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #111827;
          }
          
          p {
            color: #6b7280;
            margin-bottom: 24px;
          }
          
          .error-details {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            text-align: left;
          }
          
          .error-details summary {
            cursor: pointer;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }
          
          .error-details pre {
            font-size: 12px;
            color: #6b7280;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 150px;
            overflow-y: auto;
          }
          
          .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 8px;
            background: #0a2463;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .button:hover {
            background: #1e40af;
          }
          
          .button-secondary {
            background: #f3f4f6;
            color: #374151;
          }
          
          .button-secondary:hover {
            background: #e5e7eb;
          }
          
          .support-info {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
          }
          
          .support-info p {
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .support-info a {
            color: #0a2463;
            text-decoration: none;
            font-weight: 600;
          }
          
          .support-info a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="error-card">
            {/* Error Icon */}
            <div className="error-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.694-.833-3.464 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1>Kritična greška aplikacije</h1>
            <p>
              Dogodila se kritična greška koja je uticala na funkcionalnost cele aplikacije. 
              Naš tim je automatski obavešten.
            </p>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Detalji greške (development mode)</summary>
                <pre>
                  {error.name}: {error.message}
                  {error.stack && `\n\n${error.stack}`}
                  {error.digest && `\n\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div>
              <button 
                onClick={reset}
                className="button"
              >
                Ponovno učitaj aplikaciju
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="button button-secondary"
              >
                Idi na početnu stranu
              </button>
            </div>

            {/* Support Information */}
            <div className="support-info">
              <p>Potrebna je pomoć? Kontaktirajte našu tehničku podršku:</p>
              <a href="mailto:pixelnext9@gmail.com">pixelnext9@gmail.com</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;