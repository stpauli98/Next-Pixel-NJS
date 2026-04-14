"use client";

import React, { useState } from 'react';
import { useTranslate } from '@/context/LanguageContext';

interface FaqItem {
  question: string;
  answer: string;
}

function getFaqs(locale: string): FaqItem[] {
  if (locale === 'en') {
    return [
      { question: 'How much does a website cost?', answer: 'Website pricing depends on complexity and features. Basic websites start from €500, business websites from €2,000, and complex applications from €5,000. Contact us for a free quote tailored to your needs.' },
      { question: 'How long does it take to build a website?', answer: 'Timelines depend on project scope. Basic websites take 2-3 weeks, business websites 4-8 weeks, complex applications 3-6 months. We always provide a detailed timeline before starting.' },
      { question: 'Do you offer website maintenance?', answer: 'Yes, we offer complete maintenance packages including regular updates, security monitoring, performance optimization, content updates, and 24/7 technical support.' },
      { question: 'What technologies do you use?', answer: 'We use cutting-edge technologies: Next.js, React, Node.js, TypeScript, Tailwind CSS for frontend; Node.js, Python, PostgreSQL, MongoDB for backend; AWS, Vercel, Docker for deployment.' },
      { question: 'Do you offer SEO optimization?', answer: 'Yes, all our websites come with basic SEO optimization. We also offer advanced SEO services including technical optimization, content marketing, local SEO, and link building strategies.' },
    ];
  }
  if (locale === 'de') {
    return [
      { question: 'Wie viel kostet eine Website?', answer: 'Die Kosten hängen von Komplexität und Funktionalität ab. Einfache Websites ab 500€, Geschäftswebsites ab 2.000€, komplexe Anwendungen ab 5.000€. Kontaktieren Sie uns für ein kostenloses, individuelles Angebot.' },
      { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Die Dauer hängt vom Projektumfang ab. Einfache Websites 2-3 Wochen, Geschäftswebsites 4-8 Wochen, komplexe Anwendungen 3-6 Monate. Wir erstellen immer einen detaillierten Zeitplan vor Beginn.' },
      { question: 'Bieten Sie Website-Wartung an?', answer: 'Ja, wir bieten komplette Wartungspakete mit regelmäßigen Updates, Sicherheitsüberwachung, Performance-Optimierung, Inhaltsaktualisierungen und 24/7 technischem Support.' },
      { question: 'Welche Technologien verwenden Sie?', answer: 'Wir verwenden modernste Technologien: Next.js, React, Node.js, TypeScript, Tailwind CSS für Frontend; Node.js, Python, PostgreSQL, MongoDB für Backend; AWS, Vercel, Docker für Deployment.' },
      { question: 'Bieten Sie SEO-Optimierung an?', answer: 'Ja, alle unsere Websites kommen mit grundlegender SEO-Optimierung. Wir bieten auch erweiterte SEO-Services wie technische Optimierung, Content-Marketing, lokales SEO und Linkbuilding-Strategien.' },
    ];
  }
  return [
    { question: 'Koliko košta izrada web sajta?', answer: 'Cijena izrade web sajta zavisi od kompleksnosti i funkcionalnosti. Osnovni sajtovi počinju od 500€, poslovni sajtovi od 2000€, a kompleksne aplikacije od 5000€. Kontaktirajte nas za besplatnu ponudu prilagođenu vašim potrebama.' },
    { question: 'Koliko traje izrada web sajta?', answer: 'Vremenski okvir zavisi od obima projekta. Osnovni sajt 2-3 sedmice, poslovni sajt 4-8 sedmica, kompleksne aplikacije 3-6 mjeseci. Uvijek dostavljamo detaljan vremenski plan prije početka rada.' },
    { question: 'Da li nudite održavanje web sajta?', answer: 'Da, nudimo kompletne pakete održavanja koji uključuju redovne update-ove, sigurnosni monitoring, optimizaciju performansi, ažuriranje sadržaja i tehničku podršku 24/7.' },
    { question: 'Koje tehnologije koristite?', answer: 'Koristimo najmodernije tehnologije: Next.js, React, Node.js, TypeScript, Tailwind CSS za frontend; Node.js, Python, PostgreSQL, MongoDB za backend; AWS, Vercel, Docker za deployment.' },
    { question: 'Da li radite SEO optimizaciju?', answer: 'Da, svi naši sajtovi dolaze sa osnovnom SEO optimizacijom. Nudimo i napredne SEO usluge koje uključuju tehničku optimizaciju, content marketing, local SEO i link building strategije.' },
  ];
}

const sectionTitle: Record<string, string> = {
  sr: 'Često Postavljana Pitanja',
  en: 'Frequently Asked Questions',
  de: 'Häufig Gestellte Fragen',
};

const sectionHighlight: Record<string, string> = {
  sr: 'Pitanja',
  en: 'Questions',
  de: 'Fragen',
};

export default function FaqSection() {
  const { language } = useTranslate();
  const lang = language || 'sr';
  const faqs = getFaqs(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const title = sectionTitle[lang] || sectionTitle.en;
  const highlight = sectionHighlight[lang] || sectionHighlight.en;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          {title.replace(highlight, '')}<span className="text-nextpixel-turquoise">{highlight}</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-nextpixel-turquoise transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-5 bg-white text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
