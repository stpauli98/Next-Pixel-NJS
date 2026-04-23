'use client';

import { useTranslate } from '@/context/LanguageContext';
import { Bot, BarChart2, Zap, MessageCircle, Sparkles } from 'lucide-react';
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
        <div className={`text-center mb-12 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t('sajam2026:ai.badge') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:ai.sectionTitle') as string}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('sajam2026:ai.sectionSubtitle') as string}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {Array.from({ length: ITEM_COUNT }).map((_, i) => {
            const Icon = icons[i];
            return (
              <article
                key={i}
                className={`bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-cyan-500/30 transition-all animate-on-scroll ${isInView ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>

                {/* Title + subtitle */}
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {t(`sajam2026:ai.items.${i}.title`) as string}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium mt-0.5">
                    {t(`sajam2026:ai.items.${i}.subtitle`) as string}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed flex-1">
                  {t(`sajam2026:ai.items.${i}.description`) as string}
                </p>

                {/* Example */}
                <p className="text-gray-500 text-xs italic">
                  {t(`sajam2026:ai.items.${i}.example`) as string}
                </p>

                {/* Price */}
                <div className="border-t border-gray-800 pt-4 mt-auto">
                  <span className="text-cyan-400 font-semibold text-sm">
                    {t(`sajam2026:ai.items.${i}.price`) as string}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA footer */}
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
