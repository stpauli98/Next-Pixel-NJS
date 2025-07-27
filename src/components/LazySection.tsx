'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { logError } from '@/utils/logger';

/**
 * Loading komponenta za lazy-loaded sekcije
 */
interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ 
  height = 'h-96', 
  className = '' 
}) => {
  return (
    <div className={`animate-pulse bg-gray-100 rounded-lg ${height} ${className}`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-8 bg-gray-300 rounded mx-auto"></div>
          <div className="w-48 h-4 bg-gray-200 rounded mx-auto"></div>
          <div className="w-40 h-4 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Generic Loading komponenta
 */
const LoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nextpixel-blue mx-auto"></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

/**
 * Error Boundary za lazy komponente
 */
interface LazyErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class LazyErrorBoundary extends React.Component<
  LazyErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: LazyErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError('Lazy component failed to load', error, { errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">Failed to load content. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Lazy loaded komponente sa optimizovanim loading states
 */

// Portfolio Section - najveća komponenta, lazy load
export const LazyPortfolioSection = dynamic(
  () => import('@/components/sections/PortfolioSection'),
  {
    loading: () => <SectionSkeleton height="h-screen" className="min-h-[600px]" />,
    ssr: false // Ne renderuj na serveru zbog performance-a
  }
);

// Contact Section - takođe velika zbog mapa i formi
export const LazyContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  {
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: true // Zadržavamo SSR jer je važna za SEO
  }
);

// Blog komponente - mogu biti velike zbog MDX content-a
export const LazyBlogContent = dynamic(
  () => import('@/components/blogComponents/BlogContent').then(mod => ({ default: mod.BlogContent })),
  {
    loading: () => <LoadingSpinner message="Loading article..." />,
    ssr: true // Blog content treba SSR za SEO
  }
);

/**
 * Higher-Order Component za lazy loading bilo koje komponente
 */
export function withLazyLoading<T extends Record<string, any>>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    loading?: React.ComponentType;
    fallback?: React.ReactNode;
    ssr?: boolean;
  } = {}
) {
  const {
    loading: LoadingComponent = LoadingSpinner,
    fallback,
    ssr = true
  } = options;

  const LazyComponent = dynamic(importFunc, {
    loading: () => <LoadingComponent />,
    ssr
  });

  const WrappedComponent = (props: T) => (
    <LazyErrorBoundary fallback={fallback}>
      <LazyComponent {...props} />
    </LazyErrorBoundary>
  );
  
  WrappedComponent.displayName = `withLazyLoading(${importFunc.name || 'Component'})`;
  
  return WrappedComponent;
}

/**
 * Utility za lazy loading sa Intersection Observer
 * Koristi se za komponente koje treba da se učitaju tek kad su blizu viewport-a
 */
interface LazyOnViewProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export const LazyOnView: React.FC<LazyOnViewProps> = ({
  children,
  fallback = <SectionSkeleton />,
  rootMargin = '100px',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default SectionSkeleton;