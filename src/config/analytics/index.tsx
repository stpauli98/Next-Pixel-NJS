'use client';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';

// Analytics configuration
export const analyticsConfig = {
  googleAnalytics: {
    id: 'G-K5TQSBLLQF',
    enabled: process.env.NODE_ENV === 'production'
  },
  metaPixel: {
    id: '4001390376840252',
    enabled: process.env.NODE_ENV === 'production'
  },
  vercelAnalytics: {
    enabled: true
  }
};

// Extend Window interface for analytics
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

// Google Analytics helper
export function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(args);
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;
  
  if (analyticsConfig.googleAnalytics.enabled && window.gtag) {
    window.gtag('config', analyticsConfig.googleAnalytics.id, {
      page_path: url,
    });
  }
  
  if (analyticsConfig.metaPixel.enabled && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return;
  
  if (analyticsConfig.googleAnalytics.enabled && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  if (analyticsConfig.metaPixel.enabled && window.fbq) {
    window.fbq('trackCustom', action, {
      category,
      label,
      value
    });
  }
}

// Track conversions
export function trackConversion(conversionType: string, value?: number, currency: string = 'EUR') {
  if (typeof window === 'undefined') return;
  
  trackEvent('conversion', conversionType, undefined, value);
  
  if (analyticsConfig.metaPixel.enabled && window.fbq) {
    switch (conversionType) {
      case 'lead':
        window.fbq('track', 'Lead', { value, currency });
        break;
      case 'contact':
        window.fbq('track', 'Contact');
        break;
      case 'purchase':
        window.fbq('track', 'Purchase', { value, currency });
        break;
      default:
        window.fbq('track', 'CompleteRegistration');
    }
  }
}

// Analytics Provider Component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView(pathname);
    }
  }, [pathname]);
  
  return (
    <>
      {children}
      
      {/* Vercel Analytics */}
      {analyticsConfig.vercelAnalytics.enabled && <Analytics />}
      

      
      {/* Meta Pixel */}
      {analyticsConfig.metaPixel.enabled && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
          >
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${analyticsConfig.metaPixel.id}');
              fbq('track', 'PageView');
              window.fbq = fbq;
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${analyticsConfig.metaPixel.id}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}

// Server-side analytics headers
export function getAnalyticsHeaders() {
  return {
    'X-Analytics-GA': analyticsConfig.googleAnalytics.id,
    'X-Analytics-FB': analyticsConfig.metaPixel.id,
  };
}