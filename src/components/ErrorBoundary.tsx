'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { logError } from '@/utils/logger';

/**
 * Props za ErrorBoundary komponentu
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'component' | 'section' | 'page' | 'global';
}

/**
 * State za ErrorBoundary komponentu
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Default fallback komponenta za prikazivanje grešaka
 */
const DefaultErrorFallback: React.FC<{ 
  error: Error; 
  reset: () => void;
  level?: string;
}> = ({ error, reset, level = 'component' }) => {
  const getMessage = () => {
    switch (level) {
      case 'global':
        return 'Dogodila se neočekivana greška u aplikaciji.';
      case 'page':
        return 'Dogodila se greška prilikom učitavanja stranice.';
      case 'section':
        return 'Dogodila se greška u ovom delu stranice.';
      default:
        return 'Dogodila se greška u komponenti.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Ups! Nešto nije u redu
      </h3>
      
      <p className="text-sm text-red-600 mb-4 text-center">
        {getMessage()}
      </p>
      
      {process.env.NODE_ENV === 'development' && (
        <details className="mb-4 p-3 bg-red-100 rounded text-xs text-red-700 max-w-full overflow-auto">
          <summary className="cursor-pointer font-medium">Detalji greške</summary>
          <pre className="mt-2 whitespace-pre-wrap break-words">
            {error.name}: {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
      
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Pokušaj ponovo
      </button>
    </div>
  );
};

/**
 * React Error Boundary komponenta za hvatanje JavaScript grešaka
 * u bilo kom delu component tree-a
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Ažuriraj state tako da sledeći render prikaže fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log greške sa kontekstom
    logError('React Error Boundary uhvatila grešku', error, {
      component: 'ErrorBoundary',
      level: this.props.level || 'component',
      errorInfo: {
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name
      }
    });

    // Pozovi custom error handler ako postoji
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Sačuvaj error info u state
    this.setState({
      errorInfo
    });
  }

  /**
   * Reset error state - koristi se za "pokušaj ponovo" funkcionalnost
   */
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  /**
   * Auto-reset nakon određenog vremena (za manje kritične greške)
   */
  scheduleReset = (delay: number = 5000) => {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }
    
    this.resetTimeoutId = window.setTimeout(() => {
      this.resetErrorBoundary();
    }, delay);
  };

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Fallback UI
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={this.resetErrorBoundary}
          level={this.props.level}
        />
      );
    }

    // Normalno renderuj children
    return this.props.children;
  }
}

/**
 * Hook verzija za funkcionalne komponente (koristi se unutar ErrorBoundary)
 */
export const useErrorHandler = () => {
  return {
    captureError: (error: Error, context?: Record<string, any>) => {
      logError('Manual error capture', error, {
        component: 'useErrorHandler',
        ...context
      });
      
      // U development modu, throw error da ga ErrorBoundary uhvati
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    }
  };
};

/**
 * HOC wrapper za brže dodavanje error boundary-ja
 */
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;