'use client';

import { motion } from 'framer-motion';
import { useTranslate } from '@/context/LanguageContext';
import { MessageCircle, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SajamHero() {
  const { t } = useTranslate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="sr-only">{t('sajam2026:hero.headline')}</h1>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-1">
              {t('sajam2026:hero.greeting')}
            </motion.p>
            <motion.p variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
              {t('sajam2026:hero.name')}
              <span className="text-cyan-400">,</span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-8">
              {t('sajam2026:hero.role')}
            </motion.p>

            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-semibold text-white mb-6 leading-snug">
              {t('sajam2026:hero.title')}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-300 text-lg max-w-lg mb-10 leading-relaxed">
              {t('sajam2026:hero.description')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/message/U4Z7GJU4ZSL5M1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                {t('sajam2026:hero.cta')}
              </a>
              <a
                href="#proof"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-200 font-semibold rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
              >
                {t('sajam2026:hero.ctaSecondary')}
              </a>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-400 text-sm mt-3">
              {t('sajam2026:hero.ctaSubtext')}
            </motion.p>
          </motion.div>

          {/* Right side — profile photo */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Placeholder — replace with real photo */}
                  <span className="text-7xl sm:text-8xl font-bold text-cyan-400/30">N</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-cyan-500/10 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-5 h-5 text-gray-500" />
      </motion.div>
    </section>
  );
}
