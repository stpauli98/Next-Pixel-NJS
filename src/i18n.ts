"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationSR from './locales/sr/translation.json';
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';

// The translations
const resources = {
  sr: {
    translation: translationSR
  },
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

// Only use language detector on the client side
const instance = typeof window !== 'undefined' ? i18n.use(LanguageDetector) : i18n;

instance
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'sr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // detection options
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      lookupCookie: 'i18nextLng',
      caches: ['cookie', 'localStorage'],
    },
    
    // Ensure language is loaded on init
    react: {
      useSuspense: false,
    }
  });

export default i18n;
