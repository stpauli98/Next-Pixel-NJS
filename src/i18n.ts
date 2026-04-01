"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
import bookingEN from './locales/en/booking/booking.json';
import bookingHeroEN from './locales/en/booking/bookingHero.json';
import bookingFeaturesEN from './locales/en/booking/bookingFeatures.json';
import bookingProcessEN from './locales/en/booking/bookingProcess.json';
import bookingPricingEN from './locales/en/booking/bookingPricing.json';
import bookingFaqEN from './locales/en/booking/bookingFaq.json';
import enSajam2026 from './locales/en/sajam2026.json';

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
import bookingSR from './locales/sr/booking/booking.json';
import bookingHeroSR from './locales/sr/booking/bookingHero.json';
import bookingFeaturesSR from './locales/sr/booking/bookingFeatures.json';
import bookingProcessSR from './locales/sr/booking/bookingProcess.json';
import bookingPricingSR from './locales/sr/booking/bookingPricing.json';
import bookingFaqSR from './locales/sr/booking/bookingFaq.json';
import srSajam2026 from './locales/sr/sajam2026.json';

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
import bookingDE from './locales/de/booking/booking.json';
import bookingHeroDE from './locales/de/booking/bookingHero.json';
import bookingFeaturesDE from './locales/de/booking/bookingFeatures.json';
import bookingProcessDE from './locales/de/booking/bookingProcess.json';
import bookingPricingDE from './locales/de/booking/bookingPricing.json';
import bookingFaqDE from './locales/de/booking/bookingFaq.json';

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
    blog: blogSR,
    booking: bookingSR,
    bookingHero: bookingHeroSR,
    bookingFeatures: bookingFeaturesSR,
    bookingProcess: bookingProcessSR,
    bookingPricing: bookingPricingSR,
    bookingFaq: bookingFaqSR,
    sajam2026: srSajam2026
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
    blog: blogEN,
    booking: bookingEN,
    bookingHero: bookingHeroEN,
    bookingFeatures: bookingFeaturesEN,
    bookingProcess: bookingProcessEN,
    bookingPricing: bookingPricingEN,
    bookingFaq: bookingFaqEN,
    sajam2026: enSajam2026
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
    blog: blogDE,
    booking: bookingDE,
    bookingHero: bookingHeroDE,
    bookingFeatures: bookingFeaturesDE,
    bookingProcess: bookingProcessDE,
    bookingPricing: bookingPricingDE,
    bookingFaq: bookingFaqDE
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sr',
    fallbackLng: 'sr',
    defaultNS: 'common',
    ns: ['common', 'navigation', 'language', 'hero', 'about', 'services', 'whyChooseUs', 'portfolio', 'contact', 'footer', 'legal', 'blog', 'booking', 'bookingHero', 'bookingFeatures', 'bookingProcess', 'bookingPricing', 'bookingFaq', 'sajam2026'],
    keySeparator: '.',
    nsSeparator: ':',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    }
  });

export default i18n;
