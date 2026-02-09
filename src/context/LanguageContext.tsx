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
  const pathname = usePathname();

  // Extract locale from URL pathname
  const getLocaleFromPathname = (): Locale => {
    if (!pathname) return 'sr';
    const segments = pathname.split('/');
    const potentialLocale = segments[1];

    if (potentialLocale && isValidLocale(potentialLocale)) {
      return potentialLocale;
    }
    return 'sr';
  };

  const urlLocale = getLocaleFromPathname();

  // Pass lng to useTranslation so it returns translations for the URL locale
  // without calling i18n.changeLanguage() during render (which triggers setState in other components).
  const { t } = useTranslation(
    ['common', 'navigation', 'language', 'hero', 'about', 'services', 'whyChooseUs', 'portfolio', 'contact', 'footer', 'legal'],
    { lng: urlLocale }
  );

  const [language, setLanguage] = useState(urlLocale);

  // Sync i18n internal state after render (safe in useEffect, won't cause setState-during-render)
  useEffect(() => {
    if (i18n.language !== urlLocale) {
      i18n.changeLanguage(urlLocale);
    }
    if (urlLocale !== language) {
      setLanguage(urlLocale);
    }
    Cookies.set('i18nextLng', urlLocale, { expires: 365, path: '/' });
  }, [urlLocale]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeLanguage = (lang: string) => {
    const locale = isValidLocale(lang) ? lang : 'sr';
    i18n.changeLanguage(locale);
    setLanguage(locale);
    Cookies.set('i18nextLng', locale, { expires: 365, path: '/' });
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
