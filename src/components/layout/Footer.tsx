"use client";

import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';
import Link from 'next/link';
import LanguageSelector from '../../components/LanguageSelector';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const { t, language } = useTranslate();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Detektuje jezik iz URL-a za SSR fallback
  const getLangFromPath = (): string => {
    const lang = pathname?.split('/')[1];
    return ['sr', 'en', 'de'].includes(lang) ? lang : 'sr';
  };

  const currentLang = getLangFromPath();

  // Locale-aware fallback vrijednosti
  const fallbacks: Record<string, Record<string, string>> = {
    description: {
      sr: 'Kreiramo moderna digitalna rješenja za vaš biznis',
      en: 'We create modern digital solutions for your business',
      de: 'Wir erstellen moderne digitale Lösungen für Ihr Unternehmen'
    },
    quickLinks: {
      sr: 'Brzi linkovi',
      en: 'Quick Links',
      de: 'Schnelllinks'
    },
    services: {
      sr: 'Usluge',
      en: 'Services',
      de: 'Dienstleistungen'
    },
    contactInfo: {
      sr: 'Kontakt informacije',
      en: 'Contact Info',
      de: 'Kontaktinformationen'
    },
    address: {
      sr: 'Gradiška, Republika Srpska, BiH',
      en: 'Gradiška, Republika Srpska, BiH',
      de: 'Gradiška, Republika Srpska, BiH'
    },
    copyright: {
      sr: 'Sva prava zadržana.',
      en: 'All rights reserved.',
      de: 'Alle Rechte vorbehalten.'
    },
    privacy: {
      sr: 'Politika privatnosti',
      en: 'Privacy Policy',
      de: 'Datenschutzrichtlinie'
    },
    terms: {
      sr: 'Uslovi korištenja',
      en: 'Terms of Service',
      de: 'Nutzungsbedingungen'
    },
    home: { sr: 'Početna', en: 'Home', de: 'Startseite' },
    about: { sr: 'O nama', en: 'About', de: 'Über uns' },
    servicesNav: { sr: 'Usluge', en: 'Services', de: 'Dienstleistungen' },
    portfolio: { sr: 'Portfolio', en: 'Portfolio', de: 'Portfolio' },
    contact: { sr: 'Kontakt', en: 'Contact', de: 'Kontakt' },
    blog: { sr: 'Blog', en: 'Blog', de: 'Blog' },
    webDesign: { sr: 'Web dizajn', en: 'Web Design', de: 'Webdesign' },
    webDev: { sr: 'Web razvoj', en: 'Web Development', de: 'Webentwicklung' },
    ecommerce: { sr: 'E-commerce', en: 'E-commerce', de: 'E-Commerce' },
    seo: { sr: 'SEO optimizacija', en: 'SEO Optimization', de: 'SEO-Optimierung' },
    maintenance: { sr: 'Održavanje', en: 'Maintenance', de: 'Wartung' },
    mobileApps: { sr: 'Mobilne aplikacije', en: 'Mobile Apps', de: 'Mobile Apps' }
  };

  const getFallback = (key: string): string => {
    return fallbacks[key]?.[currentLang] || fallbacks[key]?.en || '';
  };

  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <footer className="bg-nextpixel-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Next<span className="text-nextpixel-turquoise">Pixel</span>
            </h3>
            <p className="mb-4 text-gray-300">
              {!mounted ? getFallback('description') : (
                typeof t('footer:description') === 'string' ? t('footer:description') as string : getFallback('description')
              )}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pixelnext9" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                <Icon icon={FaInstagram} size={20} aria-hidden={true} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? getFallback('quickLinks') : (
                typeof t('footer:quickLinks.title') === 'string' ? t('footer:quickLinks.title') as string : getFallback('quickLinks')
              )}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('home') : (
                    typeof t('navigation:home') === 'string' ? t('navigation:home') as string : getFallback('home')
                  )}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('about') : (
                    typeof t('navigation:about') === 'string' ? t('navigation:about') as string : getFallback('about')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('servicesNav') : (
                    typeof t('navigation:services') === 'string' ? t('navigation:services') as string : getFallback('servicesNav')
                  )}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('portfolio') : (
                    typeof t('navigation:portfolio') === 'string' ? t('navigation:portfolio') as string : getFallback('portfolio')
                  )}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('contact') : (
                    typeof t('navigation:contact') === 'string' ? t('navigation:contact') as string : getFallback('contact')
                  )}
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('blog') : (
                    typeof t('navigation:blog') === 'string' ? t('navigation:blog') as string : getFallback('blog')
                  )}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? getFallback('services') : (
                typeof t('footer:services.title') === 'string' ? t('footer:services.title') as string : getFallback('services')
              )}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('webDesign') : (
                    typeof t('footer:services.webDesign') === 'string' ? t('footer:services.webDesign') as string : getFallback('webDesign')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('webDev') : (
                    typeof t('footer:services.webDevelopment') === 'string' ? t('footer:services.webDevelopment') as string : getFallback('webDev')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('ecommerce') : (
                    typeof t('footer:services.eCommerce') === 'string' ? t('footer:services.eCommerce') as string : getFallback('ecommerce')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('seo') : (
                    typeof t('footer:services.seo') === 'string' ? t('footer:services.seo') as string : getFallback('seo')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('maintenance') : (
                    typeof t('footer:services.maintenance') === 'string' ? t('footer:services.maintenance') as string : getFallback('maintenance')
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? getFallback('mobileApps') : (
                    typeof t('footer:services.mobileApps') === 'string' ? t('footer:services.mobileApps') as string : getFallback('mobileApps')
                  )}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? getFallback('contactInfo') : (
                typeof t('contact:info.title') === 'string' ? t('contact:info.title') as string : getFallback('contactInfo')
              )}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon icon={FaLocationDot} className="mt-1 mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">
                  {!mounted ? getFallback('address') : (
                    typeof t('footer:contact.address') === 'string' ? t('footer:contact.address') as string : getFallback('address')
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <Icon icon={FaPhone} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">+387 66 603 900</span>
              </li>
              <li className="flex items-center">
                <Icon icon={FaEnvelope} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">pixelnext9@gmail.com</span>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="mt-6">
              <LanguageSelector />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} <a href="https://www.nextpixel.dev" className="hover:text-nextpixel-turquoise transition-colors">NextPixel</a>. {!mounted ? getFallback('copyright') : (
                typeof t('footer:copyright') === 'string' ? t('footer:copyright') as string : getFallback('copyright')
              )}
            </p>
            <div className="mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? getFallback('privacy') : (
                  typeof t('footer:privacyPolicy') === 'string' ? t('footer:privacyPolicy') as string : getFallback('privacy')
                )}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? getFallback('terms') : (
                  typeof t('footer:terms') === 'string' ? t('footer:terms') as string : getFallback('terms')
                )}
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
