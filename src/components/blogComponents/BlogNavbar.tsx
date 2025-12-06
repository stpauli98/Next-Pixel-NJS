"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslate } from '@/context/LanguageContext';
import { IconComponent } from '@/components/ui/IconComponent';

interface BlogNavbarProps {
  lang?: string;
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClick = () => setIsOpen(false);
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isOpen]);

  const defaultNavLinks = [
    { name: 'Početna', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'O nama', href: '/#about' },
    { name: 'Usluge', href: '/#services' },
  ];

  const navLinks = mounted ? [
    { name: typeof t('navigation:home') === 'string' ? t('navigation:home') as string : 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: typeof t('navigation:about') === 'string' ? t('navigation:about') as string : 'About', href: '/#about' },
    { name: typeof t('navigation:services') === 'string' ? t('navigation:services') as string : 'Services', href: '/#services' }
  ] : defaultNavLinks;

  const getContactText = () => {
    if (!mounted) return 'Kontaktirajte nas';
    switch (language) {
      case 'en': return 'Contact Us';
      case 'de': return 'Kontaktieren Sie uns';
      default: return 'Kontaktirajte nas';
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2'
          : 'bg-white shadow-md py-3 sm:py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="text-xl sm:text-2xl font-heading font-bold text-nextpixel-blue transition-colors">
            Next<span className="text-nextpixel-turquoise group-hover:text-nextpixel-blue transition-colors">Pixel</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-nextpixel-dark hover:text-nextpixel-turquoise transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nextpixel-turquoise transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn-primary px-5 py-2.5 text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            {getContactText()}
          </Link>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-nextpixel-dark hover:text-nextpixel-turquoise transition-colors focus:outline-none focus:ring-2 focus:ring-nextpixel-turquoise/50 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ?
            <IconComponent icon={FaXmark} size={24} /> :
            <IconComponent icon={FaBars} size={24} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg absolute w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-nextpixel-dark hover:text-nextpixel-turquoise hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="btn-primary text-center py-3 rounded-lg mt-2"
                onClick={() => setIsOpen(false)}
              >
                {getContactText()}
              </Link>
              <div className="py-3 px-3 border-t border-gray-100 mt-2">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default BlogNavbar;
