'use client';

import { useTranslate } from '@/context/LanguageContext';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const PROBLEM_COUNT = 3;

export default function SajamProblems() {
  const { t } = useTranslate();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section id="problems" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className={`text-center mb-16 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:problems.sectionTitle')}
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            {t('sajam2026:problems.sectionSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: PROBLEM_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all flex flex-col animate-on-scroll ${isInView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-lg font-semibold text-white">
                  {t(`sajam2026:problems.items.${i}.problem`)}
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">
                {t(`sajam2026:problems.items.${i}.description`)}
              </p>
              <div className="flex items-start gap-2 pt-4 border-t border-gray-700">
                <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-cyan-300 text-sm font-medium">
                  {t(`sajam2026:problems.items.${i}.solution`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
