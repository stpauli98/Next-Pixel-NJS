"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { StarButton } from '@/components/ui/star-button';
import { usePathname } from 'next/navigation';

const BookingHeroSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingHero');
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const fallbackTitle: Record<string, string> = {
    de: 'Gewinnen Sie automatisch mehr Kunden mit einem Online-Buchungssystem',
    en: 'Automatically win more customers with an online booking system',
    sr: 'Automatski osvojite više klijenata sa online booking sistemom',
  };

  const fallbackSubtitle: Record<string, string> = {
    de: 'Reduzieren Sie Telefonanrufe, vermeiden Sie Terminausfälle und steigern Sie Ihren Umsatz. Wir entwickeln ein maßgeschneidertes Buchungssystem, das rund um die Uhr für Sie arbeitet.',
    en: 'Reduce phone calls, avoid no-shows, and increase your revenue. We build a custom booking system that works for you around the clock.',
    sr: 'Smanjite telefonske pozive, izbjegnite propuštene termine i povećajte prihod. Razvijamo prilagođeni booking sistem koji radi za vas non-stop.',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const currentLang = getLangFromPath();

  if (!isHydrated || !isReady) {
    return (
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {fallbackTitle[currentLang]}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {fallbackSubtitle[currentLang]}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-nextpixel-turquoise rounded-full opacity-10" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-nextpixel-turquoise rounded-full opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nextpixel-turquoise rounded-full opacity-5" />
      </div>

      <div className="container mx-auto px-4 z-10 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.div
            className="mx-auto my-6 h-1 w-20 bg-nextpixel-turquoise"
            variants={itemVariants}
          />

          <motion.p
            className="mb-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <StarButton href="#contact">
              {t('cta.primary')}
            </StarButton>
            <StarButton href="#pricing" lightColor="#1E3A5F" backgroundColor="#2E8B9A">
              {t('cta.secondary')}
            </StarButton>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default BookingHeroSection;
