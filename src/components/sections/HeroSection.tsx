"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { HeroImage } from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';
import { StarButton } from '@/components/ui/star-button';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
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
    <motion.section
      id="home"
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue md:flex-row"
      )}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-nextpixel-turquoise rounded-full opacity-10"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-nextpixel-turquoise rounded-full opacity-10"></div>
      </div>

      {/* Left Side: Content */}
      <div className="flex w-full flex-col justify-center pt-40 px-8 pb-8 md:pt-12 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 z-10">
        {/* Main Content */}
        <motion.main variants={containerVariants}>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.div
            className="my-6 h-1 w-20 bg-nextpixel-turquoise"
            variants={itemVariants}
          />

          <motion.p
            className="mb-8 max-w-lg text-base md:text-lg text-gray-300"
            variants={itemVariants}
          >
            {typeof t('subtitle') === 'string' ? t('subtitle') as string : ''}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <StarButton href="#services">
              {typeof t('services') === 'string' ? t('services') as string : 'Our Services'}
            </StarButton>
            <StarButton href="#contact" lightColor="#1E3A5F" backgroundColor="#2E8B9A">
              {typeof t('contact') === 'string' ? t('contact') as string : 'Contact Us'}
            </StarButton>
          </motion.div>
        </motion.main>
      </div>

      {/* Right Side: Image with Clip Path Animation */}
      <motion.div
        className="relative w-full min-h-[300px] md:min-h-full md:w-1/2 lg:w-2/5"
        initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
        transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-nextpixel-dark/80 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroImage
            src="/images/NextPixelV2.webp"
            alt="NextPixel Digital Solutions - Digitalna agencija za web i softverska rješenja"
            className="w-auto h-auto max-w-full max-h-full object-contain"
            width={800}
            height={900}
            fallbackSrc="https://placehold.co/800x900/0A2463/FFFFFF?text=NextPixel"
            quality={90}
          />
        </div>

        {/* Bottom gradient for mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nextpixel-dark to-transparent md:hidden z-10" />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
