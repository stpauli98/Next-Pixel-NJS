'use client';

import { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function SajamCTA() {
  const { t, language } = useTranslate();
  const [showFloating, setShowFloating] = useState(false);
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600;
      setShowFloating(prev => prev !== shouldShow ? shouldShow : prev);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section id="cta" className="py-24 bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
          <div className={`mb-8 animate-on-scroll-scale ${isInView ? 'is-visible' : ''}`}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 mx-auto">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400/30">N</span>
              </div>
            </div>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-4 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
            {t('sajam2026:cta.title')}
          </h2>

          <p className={`text-gray-400 text-lg mb-10 max-w-lg mx-auto animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            {t('sajam2026:cta.subtitle')}
          </p>

          <div className={`animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
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
          </div>

          <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
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
          </div>

          <p className={`text-gray-500 text-sm mt-6 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '350ms' }}>
            {t('sajam2026:cta.address')}
          </p>

          <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <a href={`/${language}/#services`} className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors">
              {t('sajam2026:cta.servicesLink')}
            </a>
            <a href={`/${language}/#portfolio`} className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors">
              {t('sajam2026:cta.portfolioLink')}
            </a>
          </div>

          <p className={`text-gray-400 text-sm mt-12 italic animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
            {t('sajam2026:cta.closing')}
          </p>
        </div>
      </section>

      <a
        href="https://wa.me/message/U4Z7GJU4ZSL5M1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3.5 bg-green-500 text-white font-semibold rounded-full shadow-lg shadow-green-500/30 hover:bg-green-400 transition-all duration-300 ${showFloating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
}
