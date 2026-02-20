"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'cookie_consent';
const COOKIE_EXPIRY = 365;

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consentGiven: boolean;
  preferences: ConsentPreferences;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Partial<ConsentPreferences>) => void;
  resetConsent: () => void;
}

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

function loadPreferences(): { consentGiven: boolean; preferences: ConsentPreferences } {
  try {
    const raw = Cookies.get(COOKIE_NAME);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        consentGiven: true,
        preferences: {
          necessary: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        },
      };
    }
  } catch {
    // Invalid cookie - treat as no consent
  }
  return { consentGiven: false, preferences: defaultPreferences };
}

function persistPreferences(prefs: ConsentPreferences) {
  Cookies.set(COOKIE_NAME, JSON.stringify(prefs), {
    expires: COOKIE_EXPIRY,
    path: '/',
    sameSite: 'lax',
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('consent-changed', { detail: prefs })
    );
  }
}

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadPreferences();
    setConsentGiven(loaded.consentGiven);
    setPreferences(loaded.preferences);
    setMounted(true);
  }, []);

  const acceptAll = useCallback(() => {
    const prefs: ConsentPreferences = { necessary: true, analytics: true, marketing: true };
    setPreferences(prefs);
    setConsentGiven(true);
    persistPreferences(prefs);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const prefs: ConsentPreferences = { necessary: true, analytics: false, marketing: false };
    setPreferences(prefs);
    setConsentGiven(true);
    persistPreferences(prefs);
  }, []);

  const savePreferences = useCallback((partial: Partial<ConsentPreferences>) => {
    const prefs: ConsentPreferences = {
      necessary: true,
      analytics: partial.analytics ?? false,
      marketing: partial.marketing ?? false,
    };
    setPreferences(prefs);
    setConsentGiven(true);
    persistPreferences(prefs);
  }, []);

  const resetConsent = useCallback(() => {
    Cookies.remove(COOKIE_NAME, { path: '/' });
    setPreferences(defaultPreferences);
    setConsentGiven(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('consent-changed', { detail: defaultPreferences })
      );
    }
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <CookieConsentContext.Provider
      value={{ consentGiven, preferences, acceptAll, rejectNonEssential, savePreferences, resetConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

export default CookieConsentContext;
