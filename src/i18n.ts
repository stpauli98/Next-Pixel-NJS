"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import commonEN from './locales/en/common.json';
import navigationEN from './locales/en/navigation.json';
import languageEN from './locales/en/language.json';
import heroEN from './locales/en/hero.json';
import aboutEN from './locales/en/about.json';
import servicesEN from './locales/en/services.json';
import whyChooseUsEN from './locales/en/whyChooseUs.json';
import portfolioEN from './locales/en/portfolio.json';
import contactEN from './locales/en/contact.json';
import footerEN from './locales/en/footer.json';
import legalEN from './locales/en/legal.json';
import blogEN from './locales/en/blog.json';

// Import Serbian translations
import commonSR from './locales/sr/common.json';
import navigationSR from './locales/sr/navigation.json';
import languageSR from './locales/sr/language.json';
import heroSR from './locales/sr/hero.json';
import aboutSR from './locales/sr/about.json';
import servicesSR from './locales/sr/services.json';
import whyChooseUsSR from './locales/sr/whyChooseUs.json';
import portfolioSR from './locales/sr/portfolio.json';
import contactSR from './locales/sr/contact.json';
import footerSR from './locales/sr/footer.json';
import legalSR from './locales/sr/legal.json';
import blogSR from './locales/sr/blog.json';

// Import German translations
import commonDE from './locales/de/common.json';
import navigationDE from './locales/de/navigation.json';
import languageDE from './locales/de/language.json';
import heroDE from './locales/de/hero.json';
import aboutDE from './locales/de/about.json';
import servicesDE from './locales/de/services.json';
import whyChooseUsDE from './locales/de/whyChooseUs.json';
import portfolioDE from './locales/de/portfolio.json';
import contactDE from './locales/de/contact.json';
import footerDE from './locales/de/footer.json';
import legalDE from './locales/de/legal.json';
import blogDE from './locales/de/blog.json';

// The translations organized by namespaces
const resources = {
  sr: {
    common: commonSR,
    navigation: navigationSR,
    language: languageSR,
    hero: heroSR,
    about: aboutSR,
    services: servicesSR,
    whyChooseUs: whyChooseUsSR,
    portfolio: portfolioSR,
    contact: contactSR,
    footer: footerSR,
    legal: legalSR,
    blog: blogSR
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    language: languageEN,
    hero: heroEN,
    about: aboutEN,
    services: servicesEN,
    whyChooseUs: whyChooseUsEN,
    portfolio: portfolioEN,
    contact: contactEN,
    footer: footerEN,
    legal: legalEN,
    blog: blogEN
  },
  de: {
    common: commonDE,
    navigation: navigationDE,
    language: languageDE,
    hero: heroDE,
    about: aboutDE,
    services: servicesDE,
    whyChooseUs: whyChooseUsDE,
    portfolio: portfolioDE,
    contact: contactDE,
    footer: footerDE,
    legal: legalDE,
    blog: blogDE
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
    defaultNS: 'common',
    ns: ['common', 'navigation', 'language', 'hero', 'about', 'services', 'whyChooseUs', 'portfolio', 'contact', 'footer', 'legal', 'blog'],
    keySeparator: '.',
    nsSeparator: ':',
    debug: false, // Disable debug logs in all environments
    
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
