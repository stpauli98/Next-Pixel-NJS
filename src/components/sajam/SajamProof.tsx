'use client';

import { useTranslate } from '@/context/LanguageContext';
import { ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const PROJECT_COUNT = 3;

export default function SajamProof() {
  const { t } = useTranslate();
  const { ref: headerRef, isInView: headerVisible } = useInView<HTMLDivElement>();
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>();
  const { ref: testimonialRef, isInView: testimonialVisible } = useInView<HTMLDivElement>();

  const stats = [
    { value: t('sajam2026:proof.stats.projects'), label: t('sajam2026:proof.stats.projectsLabel') },
    { value: t('sajam2026:proof.stats.years'), label: t('sajam2026:proof.stats.yearsLabel') },
    { value: t('sajam2026:proof.stats.clients'), label: t('sajam2026:proof.stats.clientsLabel') },
  ];

  return (
    <section id="proof" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className={`text-center mb-12 animate-on-scroll ${headerVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:proof.sectionTitle')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('sajam2026:proof.sectionSubtitle')}
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-8 sm:gap-16 mb-16 animate-on-scroll ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-cyan-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: PROJECT_COUNT }).map((_, i) => {
            const image = t(`sajam2026:proof.projects.${i}.image`) as string;
            const url = t(`sajam2026:proof.projects.${i}.url`) as string;

            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`group bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all animate-on-scroll ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`sajam2026:proof.projects.${i}.title`) as string}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-900/80 text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
                      {t(`sajam2026:proof.projects.${i}.category`)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">
                      {t(`sajam2026:proof.projects.${i}.title`)}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`sajam2026:proof.projects.${i}.description`)}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div ref={testimonialRef} className={`max-w-2xl mx-auto text-center animate-on-scroll ${testimonialVisible ? 'is-visible' : ''}`}>
          <Quote className="w-8 h-8 text-cyan-500/20 mx-auto mb-4" />
          <p className="text-gray-300 text-lg italic leading-relaxed mb-4">
            &ldquo;{t('sajam2026:proof.testimonial.quote')}&rdquo;
          </p>
          <p className="text-white font-medium">{t('sajam2026:proof.testimonial.name')}</p>
          <p className="text-gray-500 text-sm">{t('sajam2026:proof.testimonial.role')}</p>
        </div>
      </div>
    </section>
  );
}
