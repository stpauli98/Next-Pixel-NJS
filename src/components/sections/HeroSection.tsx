"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { HeroImage } from '@/components/OptimizedImage';

const HeroSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('hero');
  const pathname = usePathname();

  // Detektuj jezik iz URL-a za SEO fallback
  const getLangFromPath = () => {
    const lang = pathname?.split('/')[1];
    return ['sr', 'en', 'de'].includes(lang) ? lang : 'sr';
  };

  const fallbackH1: Record<string, string> = {
    sr: 'NextPixel - Web Development & Digitalna Rješenja',
    en: 'NextPixel - Web Development & Digital Solutions',
    de: 'NextPixel - Webentwicklung & Digitale Lösungen'
  };

  const fallbackSubtitle: Record<string, string> = {
    sr: 'Kreiramo moderna digitalna rješenja za vaš biznis',
    en: 'We create modern digital solutions for your business',
    de: 'Wir erstellen moderne digitale Lösungen für Ihr Unternehmen'
  };

  // Pokazuj loading state tokom hydration-a sa H1 tagom za SEO
  if (!isHydrated || !isReady) {
    const currentLang = getLangFromPath();
    return (
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {fallbackH1[currentLang]}
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {fallbackSubtitle[currentLang]}
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-nextpixel-turquoise rounded-full opacity-10"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-nextpixel-turquoise rounded-full opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {!isHydrated ? 'Digital solutions for your success' : (
                t('title')
              )}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {!isHydrated ? 'We create modern web solutions for your business' : (
                typeof t('subtitle') === 'string' ? t('subtitle') as string : ''
              )}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#services" className="btn-primary text-center">
                {!isHydrated ? 'Our Services' : (
                  typeof t('services') === 'string' ? t('services') as string : 'Our Services'
                )}
              </a>
              <a href="#contact" className="btn-secondary text-center">
                {!isHydrated ? 'Contact Us' : (
                  typeof t('contact') === 'string' ? t('contact') as string : 'Contact Us'
                )}
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-xl max-w-md mx-auto">
              {/* Pozadinski efekt */}
              <div className="absolute inset-0 bg-nextpixel-turquoise rounded-xl opacity-25 blur-xl transform -rotate-6"></div>
              
              {/* Kontejner za sliku s gradijentnim rubovima koji se stapaju s pozadinom sekcije */}
              <div className="relative z-10 w-full h-full rounded-xl overflow-hidden">
                {/* Gradijentne maske za postepeni prijelaz u pozadinu sekcije */}
                <div className="absolute inset-0 bg-gradient-to-t from-nextpixel-dark via-nextpixel-dark/50 to-transparent opacity-40 z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-nextpixel-dark via-nextpixel-dark/50 to-transparent opacity-40 z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-nextpixel-dark via-nextpixel-dark/50 to-transparent opacity-40 z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-nextpixel-dark via-nextpixel-dark/50 to-transparent opacity-40 z-20"></div>
                
                {/* Dodatni gradijent za kuteve koji se stapa s pozadinom */}
                <div className="absolute inset-0 rounded-lg z-20" 
                     style={{
                       background: 'radial-gradient(circle at center, transparent 40%, rgba(10, 36, 99, 0.9) 100%)',
                       opacity: 0.7
                     }}>
                </div>
                
                {/* Sama slika */}
                <HeroImage 
                  src="/images/NextPixelV2.webp" 
                  alt="NextPixel Digital Solutions - Digitalna agencija za web i softverska rješenja" 
                  className="w-full h-auto object-cover max-h-[400px]"
                  width={500}
                  height={350}
                  fallbackSrc="https://placehold.co/500x350/0A2463/FFFFFF?text=NextPixel"
                  quality={90}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.a
          href="#about"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="text-white flex flex-col items-center"
        >
          <span className="mb-2">
            {!isHydrated ? 'Learn More' : (
              typeof t('learnMore') === 'string' ? t('learnMore') as string : 'Learn More'
            )}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
