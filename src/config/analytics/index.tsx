'use client';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useCookieConsent } from '@/context/CookieConsentContext';

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

// Check consent from cookie (for use outside React components)
function hasConsent(type: 'analytics' | 'marketing'): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie_consent='));
    if (!raw) return false;
    const parsed = JSON.parse(decodeURIComponent(raw.split('=')[1]));
    return !!parsed[type];
  } catch {
    return false;
  }
}

// Track page views - respects consent
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  if (analyticsConfig.googleAnalytics.enabled && hasConsent('analytics') && window.gtag) {
    window.gtag('config', analyticsConfig.googleAnalytics.id, {
      page_path: url,
    });
  }

  if (analyticsConfig.metaPixel.enabled && hasConsent('marketing') && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

// Track custom events - respects consent
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return;

  if (analyticsConfig.googleAnalytics.enabled && hasConsent('analytics') && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  if (analyticsConfig.metaPixel.enabled && hasConsent('marketing') && window.fbq) {
    window.fbq('trackCustom', action, {
      category,
      label,
      value
    });
  }
}

// Track conversions - respects consent
export function trackConversion(conversionType: string, value?: number, currency: string = 'EUR') {
  if (typeof window === 'undefined') return;

  trackEvent('conversion', conversionType, undefined, value);

  if (analyticsConfig.metaPixel.enabled && hasConsent('marketing') && window.fbq) {
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

// Analytics Provider Component - consent-aware
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { consentGiven, preferences } = useCookieConsent();
  const gaInitialized = useRef(false);

  const analyticsAllowed = consentGiven && preferences.analytics && analyticsConfig.googleAnalytics.enabled;
  const marketingAllowed = consentGiven && preferences.marketing && analyticsConfig.metaPixel.enabled;

  // Track page views when consent is given
  useEffect(() => {
    if (typeof window !== 'undefined' && consentGiven) {
      trackPageView(pathname);
    }
  }, [pathname, consentGiven]);

  // Initialize Google Consent Mode v2 defaults on mount
  useEffect(() => {
    if (typeof window === 'undefined' || gaInitialized.current) return;
    gaInitialized.current = true;

    window.dataLayer = window.dataLayer || [];
    function gtagPush(...args: any[]) {
      window.dataLayer!.push(arguments);
    }
    // Set default consent to denied
    gtagPush('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }, []);

  // Update Google Consent Mode when preferences change
  useEffect(() => {
    if (typeof window === 'undefined' || !consentGiven || !window.gtag) return;

    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
    });
  }, [consentGiven, preferences.analytics, preferences.marketing]);

  return (
    <>
      {children}

      {/* Vercel Analytics - first-party, privacy-respecting, always active */}
      {analyticsConfig.vercelAnalytics.enabled && <Analytics />}

      {/* Google Analytics - only loads when analytics consent is granted */}
      {analyticsAllowed && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalytics.id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'update', {
                analytics_storage: 'granted'
              });
              gtag('config', '${analyticsConfig.googleAnalytics.id}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel - only loads when marketing consent is granted */}
      {marketingAllowed && (
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
