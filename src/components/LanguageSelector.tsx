"use client";

import React, { useState } from 'react';
import { useTranslate } from '../context/LanguageContext';
import Image from 'next/image';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);

  const languages: LanguageOption[] = [
    { code: 'sr', name: 'Srpski', flag: '/images/flags/serbia.svg' },
    { code: 'en', name: 'English', flag: '/images/flags/usa.svg' },
    { code: 'de', name: 'Deutsch', flag: '/images/flags/germany.svg' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-sm font-medium focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative w-5 h-4 overflow-hidden rounded-sm">
          <Image 
            src={currentLanguage.flag} 
            alt={`${currentLanguage.name} flag`} 
            className="object-cover w-full h-full"
          />
        </div>
        <span>{currentLanguage.name}</span>
        <svg 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  lang.code === language ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                } flex items-center space-x-2`}
                role="menuitem"
              >
                <div className="relative w-5 h-4 overflow-hidden rounded-sm">
                  <Image 
                    src={lang.flag} 
                    alt={`${lang.name} flag`} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
