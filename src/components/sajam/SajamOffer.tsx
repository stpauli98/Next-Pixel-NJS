'use client';

import { useTranslate } from '@/context/LanguageContext';
import { Check, Sparkles, MessageCircle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const INCLUDE_COUNT = 4;
const PRICE_COUNT = 3;
const AI_PRICE_COUNT = 3;
const STEP_COUNT = 3;

export default function SajamOffer() {
  const { t } = useTranslate();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section id="offer" className="py-24 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className={`text-center mb-12 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t('sajam2026:offer.sectionTitle')}
          </h2>
        </div>

        <div className={`relative bg-gradient-to-br from-gray-900 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-8 sm:p-10 overflow-hidden animate-on-scroll-scale ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t('sajam2026:offer.badge')}
            </span>

            <h3 className="text-2xl font-bold text-white mb-3">
              {t('sajam2026:offer.title')}
            </h3>
            <p className="text-gray-300 mb-8">
              {t('sajam2026:offer.description')}
            </p>

            <ul className="space-y-3 mb-8">
              {Array.from({ length: INCLUDE_COUNT }).map((_, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {t(`sajam2026:offer.includes.${i}`)}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <p className="text-sm font-semibold text-white mb-3">
                {t('sajam2026:offer.pricing.title')}
              </p>
              <div className="space-y-1.5">
                {Array.from({ length: PRICE_COUNT }).map((_, i) => (
                  <p key={i} className="text-gray-300 text-sm">
                    {t(`sajam2026:offer.pricing.items.${i}`)}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {t('sajam2026:offer.pricing.note')}
              </p>

              <p className="text-sm font-semibold text-white mt-6 mb-3">
                {t('sajam2026:offer.aiPricing.title')}
              </p>
              <div className="space-y-1.5">
                {Array.from({ length: AI_PRICE_COUNT }).map((_, i) => (
                  <p key={i} className="text-gray-300 text-sm">
                    {t(`sajam2026:offer.aiPricing.items.${i}`)}
                  </p>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <p className="text-sm font-semibold text-white mb-4">
                {t('sajam2026:offer.process.title')}
              </p>
              <div className="space-y-3">
                {Array.from({ length: STEP_COUNT }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-400 font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm">
                      {t(`sajam2026:offer.process.steps.${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/message/U4Z7GJU4ZSL5M1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="w-5 h-5" />
              {t('sajam2026:cta.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
