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
  // Get initial language from cookie or use Serbian as default
  const [language, setLanguage] = useState('sr');
  
  // Koristi ref da pratimo da li je komponenta montirana
  const isMounted = React.useRef(false);
  const isInitialized = React.useRef(false);

  // Inicijalizacija i postavljanje event listenera
  useEffect(() => {
    // Prvo proveravamo da li postoji cookie sa jezikom
    const cookieLanguage = Cookies.get('i18nextLng');
    const initialLanguage = cookieLanguage || 'sr';
    
    // Osiguravamo da i18n koristi odabrani jezik za inicijalno renderovanje
    if (!isInitialized.current) {
      i18n.changeLanguage(initialLanguage);
      setLanguage(initialLanguage);
      isInitialized.current = true;
    }

    isMounted.current = true;
    
    // Funkcija za ažuriranje jezika u state-u kada se promeni u i18n
    const handleLanguageChanged = (lng: string) => {
      if (isMounted.current) {
        setLanguage(lng);
        // Postavljamo cookie koji će trajati 365 dana
        Cookies.set('i18nextLng', lng, { expires: 365, path: '/' });
      }
    };
    
    // Dodajemo event listener za promenu jezika
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Ako smo na klijentu, pokušavamo da učitamo jezik iz cookie-a ili localStorage-a
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const storedLanguage = Cookies.get('i18nextLng') || localStorage.getItem('i18nextLng');
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
          setLanguage(storedLanguage);
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
    // Postavljamo cookie koji će trajati 365 dana
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
