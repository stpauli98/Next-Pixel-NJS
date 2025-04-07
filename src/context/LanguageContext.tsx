"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import i18n from '../i18n';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: TFunction<'translation', undefined>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  // Always start with a fixed language for consistent server/client rendering
  const [language, setLanguage] = useState('sr');
  
  // Koristi ref da pratimo da li je komponenta montirana
  const isMounted = React.useRef(false);
  const isInitialized = React.useRef(false);

  // Inicijalizacija i postavljanje event listenera
  useEffect(() => {
    // Osiguravamo da i18n koristi srpski jezik za inicijalno renderovanje
    if (!isInitialized.current) {
      i18n.changeLanguage('sr');
      isInitialized.current = true;
    }
    
    // Označavamo da je komponenta montirana
    isMounted.current = true;
    
    // Postavljamo event listener za promenu jezika
    const handleLanguageChanged = (lng: string) => {
      if (isMounted.current) {
        setLanguage(lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    // Učitavamo sačuvani jezik iz localStorage samo na klijentskoj strani
    if (typeof window !== 'undefined') {
      // Odložimo učitavanje jezika da bi se prvo završila hidratacija
      const timer = setTimeout(() => {
        if (isMounted.current) {
          const savedLanguage = localStorage.getItem('i18nextLng');
          if (savedLanguage && savedLanguage !== 'sr') {
            i18n.changeLanguage(savedLanguage);
          }
        }
      }, 0);
      
      return () => {
        clearTimeout(timer);
        i18n.off('languageChanged', handleLanguageChanged);
        isMounted.current = false;
      };
    }
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      isMounted.current = false;
    };
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang); // Eksplicitno postavljanje language state-a
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
