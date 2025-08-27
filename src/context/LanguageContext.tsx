"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import i18n from '../i18n';
import Cookies from 'js-cookie';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: TFunction<'translation', undefined>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  
  // Safe cookie reading that works on both server and client
  const getInitialLanguage = () => {
    if (typeof window === 'undefined') {
      // Server-side: can't access cookies directly in client component
      return 'sr'; // Return default
    }
    // Client-side: read from cookie
    return Cookies.get('i18nextLng') || 'sr';
  };
  
  // Use default on initial render to avoid hydration mismatch
  const [language, setLanguage] = useState('sr');
  const [isClient, setIsClient] = useState(false);

  // Update language after hydration completes
  useEffect(() => {
    setIsClient(true);
    const cookieLanguage = Cookies.get('i18nextLng') || 'sr';
    setLanguage(cookieLanguage);
    i18n.changeLanguage(cookieLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once after mount - intentionally omit language dependency

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
