"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { usePathname } from 'next/navigation';

import i18n from '../i18n';
import Cookies from 'js-cookie';
import { isValidLocale, type Locale } from '@/config/i18n';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: TFunction<'translation', undefined>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Extract locale from URL pathname
  const getLocaleFromPathname = (): Locale => {
    if (!pathname) return 'sr';
    const segments = pathname.split('/');
    const potentialLocale = segments[1]; // First segment after "/"

    if (potentialLocale && isValidLocale(potentialLocale)) {
      return potentialLocale;
    }
    return 'sr'; // Default fallback
  };

  // Use default on initial render to avoid hydration mismatch
  const [language, setLanguage] = useState('sr');
  const [isClient, setIsClient] = useState(false);

  // Update language after hydration completes - READ FROM URL FIRST!
  useEffect(() => {
    setIsClient(true);

    // Priority: URL locale > default
    const urlLocale = getLocaleFromPathname();

    setLanguage(urlLocale);
    i18n.changeLanguage(urlLocale);

    // Update cookie to match URL
    Cookies.set('i18nextLng', urlLocale, { expires: 365, path: '/' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once after mount

  // Sync language when URL pathname changes
  useEffect(() => {
    if (!isClient) return;

    const urlLocale = getLocaleFromPathname();

    // Only change if URL locale is different from current language
    if (urlLocale !== language) {
      setLanguage(urlLocale);
      i18n.changeLanguage(urlLocale);
      Cookies.set('i18nextLng', urlLocale, { expires: 365, path: '/' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isClient]); // React to pathname changes - language intentionally omitted to prevent loops

  // Listen for i18n language changes
  useEffect(() => {
    if (!isClient) return;

    const handleLanguageChanged = (lng: string) => {
      setLanguage(lng);
      Cookies.set('i18nextLng', lng, { expires: 365, path: '/' });
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [isClient]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    Cookies.set('i18nextLng', lang, { expires: 365, path: '/' });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslate must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
