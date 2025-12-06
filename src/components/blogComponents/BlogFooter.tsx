"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { useTranslate } from '@/context/LanguageContext';
import { IconComponent } from '@/components/ui/IconComponent';

interface BlogFooterProps {
  lang?: string;
}

const BlogFooter: React.FC<BlogFooterProps> = ({ lang }) => {
  const { t, language } = useTranslate();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBlogLinks = () => {
    const allArticles = mounted ? (
      language === 'sr' ? 'Svi članci' :
      language === 'de' ? 'Alle Artikel' : 'All Articles'
    ) : 'All Articles';

    return [
      { name: allArticles, href: '/blog' },
      {
        name: mounted ? (
          typeof t('navigation:home') === 'string' ? t('navigation:home') as string : 'Home'
        ) : 'Home',
        href: '/'
      },
      {
        name: mounted ? (
          typeof t('navigation:services') === 'string' ? t('navigation:services') as string : 'Services'
        ) : 'Services',
        href: '/#services'
      },
      {
        name: mounted ? (
          typeof t('navigation:contact') === 'string' ? t('navigation:contact') as string : 'Contact'
        ) : 'Contact',
        href: '/#contact'
      }
    ];
  };

  return (
    <footer className="bg-nextpixel-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold">
                Next<span className="text-nextpixel-turquoise">Pixel</span>
              </h3>
            </Link>
            <p className="mb-6 text-gray-300 leading-relaxed max-w-sm">
              {!mounted ? 'We create modern digital solutions for your business' : (
                typeof t('footer:description') === 'string' ? t('footer:description') as string : ''
              )}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/pixelnext9"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-nextpixel-turquoise hover:text-white transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent icon={FaInstagram} size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 relative">
              <span className="relative">
                Blog
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-nextpixel-turquoise" />
              </span>
            </h4>
            <ul className="space-y-3">
              {getBlogLinks().map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-nextpixel-turquoise transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-nextpixel-turquoise mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-5 relative">
              <span className="relative">
                {!mounted ? 'Contact Info' : (
                  typeof t('contact:info.title') === 'string' ? t('contact:info.title') as string : 'Contact Info'
                )}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-nextpixel-turquoise" />
              </span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-nextpixel-turquoise/20 transition-colors">
                  <IconComponent icon={FaLocationDot} size={14} className="text-nextpixel-turquoise" />
                </span>
                <span className="text-gray-300 pt-1">
                  {!mounted ? 'Gradiška, Republika Srpska, BiH' : (
                    typeof t('footer:contact.address') === 'string' ? t('footer:contact.address') as string : 'Gradiška, Republika Srpska, BiH'
                  )}
                </span>
              </li>
              <li className="flex items-center group">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-nextpixel-turquoise/20 transition-colors">
                  <IconComponent icon={FaPhone} size={14} className="text-nextpixel-turquoise" />
                </span>
                <a href="tel:+38766603900" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  +387 66 603 900
                </a>
              </li>
              <li className="flex items-center group">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-nextpixel-turquoise/20 transition-colors">
                  <IconComponent icon={FaEnvelope} size={14} className="text-nextpixel-turquoise" />
                </span>
                <a href="mailto:pixelnext9@gmail.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  pixelnext9@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; {currentYear} NextPixel. {!mounted ? 'All rights reserved.' : (
                typeof t('footer:copyright') === 'string' ? t('footer:copyright') as string : 'All rights reserved.'
              )}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-nextpixel-turquoise transition-colors"
              >
                {!mounted ? 'Privacy Policy' : (
                  typeof t('footer:privacyPolicy') === 'string' ? t('footer:privacyPolicy') as string : 'Privacy Policy'
                )}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-nextpixel-turquoise transition-colors"
              >
                {!mounted ? 'Terms of Service' : (
                  typeof t('footer:terms') === 'string' ? t('footer:terms') as string : 'Terms of Service'
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
