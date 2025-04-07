"use client";

import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useTranslate();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

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
              {!mounted ? 'We create modern digital solutions for your business' : (
                typeof t('footer.description') === 'string' ? t('footer.description') as string : ''
              )}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                <Icon icon={FaFacebook} size={20} aria-hidden={true} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                <Icon icon={FaTwitter} size={20} aria-hidden={true} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                <Icon icon={FaInstagram} size={20} aria-hidden={true} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                <Icon icon={FaLinkedin} size={20} aria-hidden={true} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? 'Quick Links' : (
                typeof t('footer.quickLinks.title') === 'string' ? t('footer.quickLinks.title') as string : 'Quick Links'
              )}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Home' : (
                    typeof t('nav.home') === 'string' ? t('nav.home') as string : 'Home'
                  )}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'About' : (
                    typeof t('nav.about') === 'string' ? t('nav.about') as string : 'About'
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Services' : (
                    typeof t('nav.services') === 'string' ? t('nav.services') as string : 'Services'
                  )}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Portfolio' : (
                    typeof t('nav.portfolio') === 'string' ? t('nav.portfolio') as string : 'Portfolio'
                  )}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Contact' : (
                    typeof t('nav.contact') === 'string' ? t('nav.contact') as string : 'Contact'
                  )}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {!mounted ? 'Services' : (
                typeof t('footer.services.title') === 'string' ? t('footer.services.title') as string : 'Services'
              )}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Web Design' : (
                    typeof t('services.webDesign.title') === 'string' ? t('services.webDesign.title') as string : 'Web Design'
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Web Development' : (
                    typeof t('footer.services.webDevelopment') === 'string' ? t('footer.services.webDevelopment') as string : 'Web Development'
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'E-commerce' : (
                    typeof t('services.ecommerce.title') === 'string' ? t('services.ecommerce.title') as string : 'E-commerce'
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'SEO' : (
                    typeof t('services.seo.title') === 'string' ? t('services.seo.title') as string : 'SEO'
                  )}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  {!mounted ? 'Maintenance' : (
                    typeof t('services.maintenance.title') === 'string' ? t('services.maintenance.title') as string : 'Maintenance'
                  )}
                </a>
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
                <Icon icon={FaLocationDot} className="mt-1 mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">
                  {!mounted ? 'Sarajevo, Bosnia and Herzegovina' : (
                    typeof t('footer.contact.address') === 'string' ? t('footer.contact.address') as string : 'Sarajevo, Bosnia and Herzegovina'
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <Icon icon={FaPhone} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">+387 33 123 456</span>
              </li>
              <li className="flex items-center">
                <Icon icon={FaEnvelope} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">info@nextpixel.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} NextPixel. {!mounted ? 'All rights reserved.' : (
                typeof t('footer.copyright') === 'string' ? t('footer.copyright') as string : 'All rights reserved.'
              )}
            </p>
            <div className="mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? 'Privacy Policy' : (
                  typeof t('footer.privacyPolicy') === 'string' ? t('footer.privacyPolicy') as string : 'Privacy Policy'
                )}
              </a>
              <a href="/terms" className="text-gray-400 hover:text-nextpixel-turquoise transition-colors mx-2">
                {!mounted ? 'Terms of Service' : (
                  typeof t('footer.terms') === 'string' ? t('footer.terms') as string : 'Terms of Service'
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
