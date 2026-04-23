'use client';

import { useTranslate } from '@/context/LanguageContext';
import { Bot, BarChart2, Zap, MessageCircle, Sparkles, ArrowDown } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const ITEM_COUNT = 3;
const icons = [Bot, BarChart2, Zap];

export default function SajamAI() {
  const { t } = useTranslate();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section className="py-20 bg-gray-950">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className={`text-center mb-14 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('sajam2026:ai.badge') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight max-w-3xl mx-auto">
            {t('sajam2026:ai.sectionTitle') as string}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            {t('sajam2026:ai.sectionSubtitle') as string}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {Array.from({ length: ITEM_COUNT }).map((_, i) => {
            const Icon = icons[i];
            return (
              <article
                key={i}
                className={`relative flex flex-col rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 animate-on-scroll ${isInView ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Problem zone — slightly darker */}
                <div className="bg-gray-900/80 px-6 pt-6 pb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white font-bold text-lg leading-snug">
                    {t(`sajam2026:ai.items.${i}.problem`) as string}
                  </p>
                </div>

                {/* Divider — visual "before → after" marker */}
                <div className="flex items-center gap-3 px-6 py-3 bg-gray-900/40">
                  <div className="flex-1 h-px bg-gray-800" />
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <ArrowDown className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {/* Solution zone — brighter */}
                <div className="bg-gray-900/60 px-6 pt-4 pb-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">
                    {t('sajam2026:ai.solutionLabel') as string}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {t(`sajam2026:ai.items.${i}.solution`) as string}
                  </p>
                  <p className="text-cyan-400 text-sm italic mt-4 font-medium">
                    &ldquo;{t(`sajam2026:ai.items.${i}.outcome`) as string}&rdquo;
                  </p>
                </div>

                {/* Price footer */}
                <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/80 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">
                    {t(`sajam2026:ai.items.${i}.price`) as string}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {t('sajam2026:ai.fairDiscount') as string}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center animate-on-scroll ${isInView ? 'is-visible' : ''}`}
          style={{ transitionDelay: '360ms' }}
        >
          <a
            href="https://wa.me/message/U4Z7GJU4ZSL5M1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
          >
            <MessageCircle className="w-5 h-5" />
            {t('sajam2026:ai.cta') as string}
          </a>
          <p className="text-gray-500 text-xs mt-3">
            {t('sajam2026:ai.ctaNote') as string}
          </p>
        </div>

      </div>
    </section>
  );
}
