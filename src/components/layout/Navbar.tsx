"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { motion } from 'framer-motion';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslate } from '../../context/LanguageContext';
import { usePathname } from 'next/navigation';



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Detektuje jezik iz URL-a za SSR fallback
  const getLangFromPath = (): string => {
    const lang = pathname?.split('/')[1];
    return ['sr', 'en', 'de'].includes(lang) ? lang : 'sr';
  };

  // Locale-aware SSR fallback za navigaciju
  const getDefaultNavLinks = (lang: string) => {
    const translations: Record<string, { name: string; href: string }[]> = {
      sr: [
        { name: 'Početna', href: '#home' },
        { name: 'O nama', href: '#about' },
        { name: 'Usluge', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' }
      ],
      en: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' }
      ],
      de: [
        { name: 'Startseite', href: '#home' },
        { name: 'Über uns', href: '#about' },
        { name: 'Dienstleistungen', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' }
      ]
    };
    return translations[lang] || translations.en;
  };

  // Locale-aware CTA button fallback
  const getDefaultCta = (lang: string): string => {
    return lang === 'sr' ? 'Kontaktirajte nas' :
           lang === 'de' ? 'Kontaktieren Sie uns' :
           'Contact Us';
  };

  // Postavlja mounted na true nakon inicijalne hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    // This will force the component to re-render when language changes
    if (mounted) {
      // This is intentionally empty - just having language in the dependency array
      // ensures the component re-renders when language changes
    }
  }, [language, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Koristi locale-aware fallback vrijednosti za SSR
  const currentLang = getLangFromPath();
  const defaultNavLinks = getDefaultNavLinks(currentLang);

  // Koristi prevedene vrednosti samo nakon što je komponenta montirana na klijentu
  const navLinks = mounted ? [
    { name: typeof t('navigation:home') === 'string' ? t('navigation:home') as string : 'Home', href: '#home' },
    { name: typeof t('navigation:about') === 'string' ? t('navigation:about') as string : 'About', href: '#about' },
    { name: typeof t('navigation:services') === 'string' ? t('navigation:services') as string : 'Services', href: '#services' },
    { name: typeof t('navigation:portfolio') === 'string' ? t('navigation:portfolio') as string : 'Portfolio', href: '#portfolio' }
  ] : defaultNavLinks;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
        <span className="text-2xl font-heading font-bold text-nextpixel-blue">
            Next<span className="text-nextpixel-turquoise">Pixel</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-nextpixel-dark hover:text-nextpixel-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary">
            {mounted ? (
              language === 'sr' ? 'Kontaktirajte nas' :
              language === 'en' ? 'Contact Us' :
              language === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'
            ) : getDefaultCta(currentLang)}
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile Language Selector and Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="flex items-center">
            <LanguageSelector />
          </div>
          <button
            className="text-nextpixel-dark focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Icon icon={FaXmark} size={24} aria-hidden={true} /> : <Icon icon={FaBars} size={24} aria-hidden={true} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute left-0 right-0 w-full"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-nextpixel-dark hover:text-nextpixel-blue transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              {mounted ? (
                language === 'sr' ? 'Kontaktirajte nas' :
                language === 'en' ? 'Contact Us' :
                language === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'
              ) : getDefaultCta(currentLang)}
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
