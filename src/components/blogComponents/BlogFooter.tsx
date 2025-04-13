"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Import icons from react-icons/fa6 for React 19 compatibility
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { useTranslate } from '@/context/LanguageContext';
import { IconComponent } from '@/components/ui/IconComponent';

interface BlogFooterProps {
  lang?: string;
}

const BlogFooter: React.FC<BlogFooterProps> = ({ lang }) => {
  const { t, language } = useTranslate();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <footer className="bg-nextpixel-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Next<span className="text-nextpixel-turquoise">Pixel</span>
            </h3>
            <p className="mb-4 text-gray-300">
              {!mounted ? 'We create modern digital solutions for your business' : (
                typeof t('footer.description') === 'string' ? t('footer.description') as string : ''
              )}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors" aria-label="Facebook">
                <IconComponent icon={FaFacebookF} size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors" aria-label="Twitter">
                <IconComponent icon={FaTwitter} size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors" aria-label="Instagram">
                <IconComponent icon={FaInstagram} size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors" aria-label="LinkedIn">
                <IconComponent icon={FaLinkedinIn} size={20} />
              </a>
            </div>
          </div>
          
          {/* Blog Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              Blog
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  Svi članci
                </Link>
              </li>
              <li>
                <Link href="/blog/why_web_site" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  Zašto je potrebna Web Stranica?
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Home' : (
                    typeof t('nav.home') === 'string' ? t('nav.home') as string : 'Home'
                  )}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Services' : (
                    typeof t('nav.services') === 'string' ? t('nav.services') as string : 'Services'
                  )}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? 'Contact Info' : (
                typeof t('contact.info.title') === 'string' ? t('contact.info.title') as string : 'Contact Info'
              )}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <IconComponent icon={FaLocationDot} size={16} className="mt-1 mr-3 text-nextpixel-turquoise" />
                <span className="text-gray-300">
                  {!mounted ? 'Sarajevo, Bosnia and Herzegovina' : (
                    typeof t('footer.contact.address') === 'string' ? t('footer.contact.address') as string : 'Sarajevo, Bosnia and Herzegovina'
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <IconComponent icon={FaPhone} size={16} className="mr-3 text-nextpixel-turquoise" />
                <span className="text-gray-300">+387 33 123 456</span>
              </li>
              <li className="flex items-center">
                <IconComponent icon={FaEnvelope} size={16} className="mr-3 text-nextpixel-turquoise" />
                <span className="text-gray-300">info@nextpixel.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} NextPixel. {!mounted ? 'All rights reserved.' : (
                typeof t('footer.copyright') === 'string' ? t('footer.copyright') as string : 'All rights reserved.'
              )}
            </p>
            <div className="mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? 'Privacy Policy' : (
                  typeof t('footer.privacyPolicy') === 'string' ? t('footer.privacyPolicy') as string : 'Privacy Policy'
                )}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? 'Terms of Service' : (
                  typeof t('footer.terms') === 'string' ? t('footer.terms') as string : 'Terms of Service'
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
