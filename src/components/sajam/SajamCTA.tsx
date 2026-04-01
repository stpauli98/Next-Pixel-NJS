'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslate } from '@/context/LanguageContext';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function SajamCTA() {
  const { t, language } = useTranslate();
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section id="cta" className="py-24 bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          {/* Profile photo callback */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 mx-auto">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400/30">N</span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('sajam2026:cta.title')}
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('sajam2026:cta.subtitle')}
          </motion.p>

          {/* WhatsApp — primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://wa.me/message/U4Z7GJU4ZSL5M1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="w-6 h-6" />
              {t('sajam2026:cta.whatsapp')}
            </a>
            <p className="text-gray-400 text-sm mt-3">{t('sajam2026:cta.whatsappSubtext')}</p>
          </motion.div>

          {/* Secondary contacts */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="tel:+38766603900"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 rounded-xl hover:border-cyan-500/30 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
              {t('sajam2026:cta.phoneLabel')}
            </a>
            <a
              href="mailto:info@nextpixel.dev"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 rounded-xl hover:border-cyan-500/30 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4" />
              {t('sajam2026:cta.emailLabel')}
            </a>
          </motion.div>

          {/* Address for local SEO */}
          <motion.p
            className="text-gray-500 text-sm mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            {t('sajam2026:cta.address')}
          </motion.p>

          {/* Internal links */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href={`/${language}/#services`}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors"
            >
              {t('sajam2026:cta.servicesLink')}
            </a>
            <a
              href={`/${language}/#portfolio`}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors"
            >
              {t('sajam2026:cta.portfolioLink')}
            </a>
          </motion.div>

          {/* Signature */}
          <motion.p
            className="text-gray-400 text-sm mt-12 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            {t('sajam2026:cta.closing')}
          </motion.p>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <AnimatePresence>
        {showFloating && (
          <motion.a
            href="https://wa.me/message/U4Z7GJU4ZSL5M1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3.5 bg-green-500 text-white font-semibold rounded-full shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
