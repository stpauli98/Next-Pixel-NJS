'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { TranslationFunction, TranslationOptions } from '@/types/common';
import { TFunction } from 'i18next';
import { logWarn } from '@/utils/logger';

/**
 * SSR-friendly i18n hook koji rešava hydration probleme
 * Eliminiše potrebu za "force re-render" hack-ovima
 */

interface UseClientTranslationReturn {
  t: (key: string | string[], options?: TranslationOptions) => string;
  language: string;
  changeLanguage: (lang: string) => Promise<TFunction<'translation', undefined>>;
  isHydrated: boolean;
  isReady: boolean;
}

export const useClientTranslation = (): UseClientTranslationReturn => {
  const { t, i18n } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'sr');

  // Hydration effect - runs only on client
  useEffect(() => {
    setIsHydrated(true);
    
    // Wait for i18n to be fully ready
    if (i18n.isInitialized) {
      setIsReady(true);
      setCurrentLanguage(i18n.language);
    } else {
      // Listen for i18n initialization
      const handleInitialized = () => {
        setIsReady(true);
        setCurrentLanguage(i18n.language);
      };

      i18n.on('initialized', handleInitialized);
      return () => i18n.off('initialized', handleInitialized);
    }
  }, [i18n]);

  // Language change listener
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [i18n]);

  // Safe translation function that handles SSR/hydration
  const safeT = (key: string | string[], options?: TranslationOptions): string => {
    if (!isHydrated || !isReady) {
      // Return key during SSR or before hydration to prevent mismatch
      return typeof key === 'string' ? key : String(key);
    }
    
    try {
      const result = t(key, options);
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      logWarn('Translation error', { key, language: currentLanguage, error });
      return typeof key === 'string' ? key : String(key);
    }
  };

  // Safe language change function
  const safeChangeLanguage = async (lang: string): Promise<TFunction<'translation', undefined>> => {
    try {
      const result = await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      return result;
    } catch (error) {
      logWarn('Language change error', { targetLanguage: lang, currentLanguage, error });
      return t;
    }
  };

  return {
    t: safeT,
    language: currentLanguage,
    changeLanguage: safeChangeLanguage,
    isHydrated,
    isReady
  };
};

/**
 * Hook za komponente koje imaju fallback sadržaj
 * Korisno za komponente sa default text-om pre učitavanja prevoda
 */
export const useClientTranslationWithFallback = (fallbackLanguage = 'sr') => {
  const translation = useClientTranslation();
  
  const tWithFallback = (key: string | string[], options?: TranslationOptions): string => {
    const result = translation.t(key, options);
    
    // Ako je rezultat isti kao key (znači prevod nije pronađen), pokušaj sa fallback jezikom
    if (result === key && translation.language !== fallbackLanguage) {
      try {
        return translation.t(key, { ...options, lng: fallbackLanguage });
      } catch {
        return result;
      }
    }
    
    return result;
  };

  return {
    ...translation,
    t: tWithFallback
  };
};

/**
 * Utility funkcija za server-side safe translation
 * Koristi se u komponentama koje se renderuju na serveru
 */
export const getServerSafeTranslation = (key: string, fallback?: string): string => {
  if (typeof window === 'undefined') {
    // Na serveru, vraćamo fallback ili key
    return fallback || key;
  }
  
  // Na klijentu, koristimo normalnu logiku
  return key;
};

export default useClientTranslation;