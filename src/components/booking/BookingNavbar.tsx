"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaXmark, FaArrowLeft } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';
import { motion } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';

const fallbackNav: Record<string, Record<string, string>> = {
  de: { features: 'Funktionen', process: 'Ablauf', pricing: 'Preise', faq: 'FAQ', contact: 'Kontakt', demo: 'Demo', cta: 'Beratung buchen', backToMain: 'Zur Hauptseite' },
  en: { features: 'Features', process: 'Process', pricing: 'Pricing', faq: 'FAQ', contact: 'Contact', demo: 'Demo', cta: 'Book Consultation', backToMain: 'Back to main site' },
  sr: { features: 'Funkcije', process: 'Proces', pricing: 'Cijene', faq: 'FAQ', contact: 'Kontakt', demo: 'Demo', cta: 'Zakažite konsultaciju', backToMain: 'Nazad na glavni sajt' },
};

const BookingNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, isHydrated, isReady } = useClientTranslation('booking');
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    // On subdomain: /de/... ; Internally rewritten: /booking/de/...
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();
  const mounted = isHydrated && isReady;
  const fb = fallbackNav[currentLang] || fallbackNav.de;

  const navLinks: Array<{ name: string; href: string; external?: boolean }> = [
    { name: mounted ? t('nav.features') : fb.features, href: '#features' },
    { name: mounted ? t('nav.process') : fb.process, href: '#process' },
    { name: mounted ? t('nav.pricing') : fb.pricing, href: '#pricing' },
    { name: mounted ? t('nav.faq') : fb.faq, href: '#faq' },
    { name: mounted ? t('nav.contact') : fb.contact, href: '#contact' },
    { name: mounted ? t('nav.demo') : fb.demo, href: `/demo/${currentLang}`, external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainSiteUrl = currentLang === 'de'
    ? 'https://www.nextpixel.dev/de'
    : currentLang === 'en'
      ? 'https://www.nextpixel.dev/en'
      : 'https://www.nextpixel.dev/sr';

  return (
    <nav
      aria-label="Booking navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href={mainSiteUrl} className="flex items-center text-sm text-gray-500 hover:text-nextpixel-blue transition-colors" title={mounted ? t('nav.backToMain') : fb.backToMain}>
            <Icon icon={FaArrowLeft} className="mr-1" size={12} aria-hidden={true} />
          </a>
          <a href="#home" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-nextpixel-blue">
              Next<span className="text-nextpixel-turquoise">Pixel</span>
            </span>
            <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${scrolled ? 'bg-nextpixel-blue/10 text-nextpixel-blue' : 'bg-white/20 text-white'}`}>
              Booking
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`font-medium transition-colors ${
                link.external
                  ? 'text-nextpixel-turquoise hover:text-nextpixel-turquoise-dark font-semibold'
                  : 'text-nextpixel-dark hover:text-nextpixel-blue'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary">
            {mounted ? t('nav.cta') : fb.cta}
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSelector />
          <button
            className="text-nextpixel-dark focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? (currentLang === 'de' ? 'Menü schließen' : currentLang === 'sr' ? 'Zatvori meni' : 'Close menu') : (currentLang === 'de' ? 'Menü öffnen' : currentLang === 'sr' ? 'Otvori meni' : 'Open menu')}
            aria-expanded={isOpen}
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
          className="md:hidden bg-white shadow-lg absolute left-0 right-0 w-full"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`font-medium transition-colors py-2 ${
                  link.external
                    ? 'text-nextpixel-turquoise hover:text-nextpixel-turquoise-dark font-semibold'
                    : 'text-nextpixel-dark hover:text-nextpixel-blue'
                }`}
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
              {mounted ? t('nav.cta') : fb.cta}
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default BookingNavbar;
