"use client";

import React from 'react';
import { FaPhone, FaEnvelope, FaLocationDot, FaInstagram } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';

const BookingFooter: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('booking');
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const mounted = isHydrated && isReady;

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const mainSiteUrl = currentLang === 'de'
    ? 'https://nextpixel.dev/de'
    : currentLang === 'en'
      ? 'https://nextpixel.dev/en'
      : 'https://nextpixel.dev/sr';

  const copyrightText: Record<string, string> = {
    de: 'Alle Rechte vorbehalten.',
    en: 'All rights reserved.',
    sr: 'Sva prava zadržana.',
  };

  const mainSiteText: Record<string, string> = {
    de: 'Zur Hauptseite',
    en: 'Visit main site',
    sr: 'Glavni sajt',
  };

  return (
    <footer className="bg-nextpixel-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Next<span className="text-nextpixel-turquoise">Pixel</span>
              <span className="text-sm font-normal ml-2 text-gray-400">Booking</span>
            </h3>
            <a
              href={mainSiteUrl}
              className="text-gray-300 hover:text-nextpixel-turquoise transition-colors text-sm"
            >
              {mounted ? t('nav.backToMain') : mainSiteText[currentLang]}
              {' →'}
            </a>
          </div>

          {/* Contact */}
          <div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon icon={FaLocationDot} className="mt-1 mr-3 text-nextpixel-turquoise" aria-hidden={true} />
                <span className="text-gray-300">Jovana Ducica 15, 78400 Gradiška, BiH</span>
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
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/pixelnext9" className="text-gray-300 hover:text-nextpixel-turquoise transition-colors">
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
