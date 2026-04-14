"use client";

import React from 'react';
import { FaPhone, FaEnvelope, FaLocationDot, FaInstagram } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';
import { usePathname } from 'next/navigation';

const legalLinks: Record<string, Array<{ label: string; href: string }>> = {
  de: [
    { label: 'Impressum', href: 'https://www.nextpixel.dev/de/impressum' },
    { label: 'Datenschutzerklärung', href: 'https://www.nextpixel.dev/de/privacy-policy' },
    { label: 'Cookie-Richtlinie', href: 'https://www.nextpixel.dev/de/cookie-policy' },
    { label: 'Nutzungsbedingungen', href: 'https://www.nextpixel.dev/de/terms' },
  ],
  en: [
    { label: 'Legal Notice', href: 'https://www.nextpixel.dev/en/impressum' },
    { label: 'Privacy Policy', href: 'https://www.nextpixel.dev/en/privacy-policy' },
    { label: 'Cookie Policy', href: 'https://www.nextpixel.dev/en/cookie-policy' },
    { label: 'Terms of Service', href: 'https://www.nextpixel.dev/en/terms' },
  ],
  sr: [
    { label: 'Pravne informacije', href: 'https://www.nextpixel.dev/sr/impressum' },
    { label: 'Politika privatnosti', href: 'https://www.nextpixel.dev/sr/privacy-policy' },
    { label: 'Politika kolačića', href: 'https://www.nextpixel.dev/sr/cookie-policy' },
    { label: 'Uslovi korištenja', href: 'https://www.nextpixel.dev/sr/terms' },
  ],
};

const BookingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const mainSiteUrl = currentLang === 'de'
    ? 'https://www.nextpixel.dev/de'
    : currentLang === 'en'
      ? 'https://www.nextpixel.dev/en'
      : 'https://www.nextpixel.dev/sr';

  const copyrightText: Record<string, string> = {
    de: 'Alle Rechte vorbehalten.',
    en: 'All rights reserved.',
    sr: 'Sva prava zadržana.',
  };

  const legal = legalLinks[currentLang] || legalLinks.de;

  return (
    <footer className="bg-nextpixel-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + Legal */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Next<span className="text-nextpixel-turquoise">Pixel</span>
              <span className="text-sm font-normal ml-2 text-gray-400">Booking</span>
            </h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-nextpixel-turquoise transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon icon={FaLocationDot} className="mt-1 mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">Gradiška, BiH</span>
              </li>
              <li className="flex items-center">
                <Icon icon={FaPhone} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <a href="tel:+38766603900" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  +387 66 603 900
                </a>
              </li>
              <li className="flex items-center">
                <Icon icon={FaEnvelope} className="mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <a href="mailto:info@nextpixel.dev" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
                  info@nextpixel.dev
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/nextpixel.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-nextpixel-turquoise transition-colors"
              >
                <Icon icon={FaInstagram} size={20} aria-hidden={true} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear}{' '}
            <a href={mainSiteUrl} className="hover:text-nextpixel-turquoise transition-colors">
              NextPixel
            </a>
            . {copyrightText[currentLang] || copyrightText.de}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BookingFooter;
