"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { motion } from 'framer-motion';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslate } from '../../context/LanguageContext';



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);

  // Postavlja mounted na true nakon inicijalne hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Koristi fiksne vrednosti za inicijalni render da bi se izbegao hydration mismatch
  const defaultNavLinks = [
    { name: 'Početna', href: '#home' },
    { name: 'O nama', href: '#about' },
    { name: 'Usluge', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Kontakt', href: '#contact' },
  ];
  
  // Koristi prevedene vrednosti samo nakon što je komponenta montirana na klijentu
  const navLinks = mounted ? [
    { name: typeof t('nav.home') === 'string' ? t('nav.home') as string : 'Home', href: '#home' },
    { name: typeof t('nav.about') === 'string' ? t('nav.about') as string : 'About', href: '#about' },
    { name: typeof t('nav.services') === 'string' ? t('nav.services') as string : 'Services', href: '#services' },
    { name: typeof t('nav.portfolio') === 'string' ? t('nav.portfolio') as string : 'Portfolio', href: '#portfolio' },
    { name: typeof t('nav.contact') === 'string' ? t('nav.contact') as string : 'Contact', href: '#contact' },
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
            {mounted ? (typeof t('nav.contactUs') === 'string' ? t('nav.contactUs') as string : 'Contact Us') : 'Kontaktirajte nas'}
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-nextpixel-dark focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Icon icon={FaXmark} size={24} aria-hidden={true} /> : <Icon icon={FaBars} size={24} aria-hidden={true} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute w-full"
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
              {mounted ? (typeof t('nav.contactUs') === 'string' ? t('nav.contactUs') as string : 'Contact Us') : 'Kontaktirajte nas'}
            </a>
            <div className="py-2">
              <LanguageSelector />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
