"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const FAQ_COUNT = 8;

interface FaqFallback {
  title: string;
  subtitle: string;
  items: { question: string; answer: string }[];
}

const fallbackContent: Record<string, FaqFallback> = {
  de: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Antworten auf die wichtigsten Fragen.',
    items: [
      { question: 'Wie lange dauert die Entwicklung eines Buchungssystems?', answer: 'Je nach Umfang dauert die Entwicklung 3-8 Wochen. Ein Starter-System kann in 3-4 Wochen live gehen, während komplexere Enterprise-Lösungen 6-8 Wochen benötigen.' },
      { question: 'Kann ich das System später erweitern?', answer: 'Ja, alle unsere Systeme sind modular aufgebaut. Sie können jederzeit neue Funktionen hinzufügen, z.B. Online-Zahlung, SMS-Erinnerungen oder zusätzliche Sprachen.' },
      { question: 'Welche Zahlungsanbieter werden unterstützt?', answer: 'Wir integrieren Stripe, PayPal, Klarna und weitere Zahlungsanbieter. Die Integration wird individuell an Ihre Bedürfnisse angepasst.' },
      { question: 'Ist das System DSGVO-konform?', answer: 'Ja, alle unsere Buchungssysteme sind vollständig DSGVO-konform. Daten werden auf europäischen Servern gespeichert und verschlüsselt übertragen.' },
      { question: 'Brauche ich technische Kenntnisse für die Verwaltung?', answer: 'Nein, das Admin-Dashboard ist intuitiv gestaltet. Wir bieten zusätzlich eine Einschulung für Ihr Team an.' },
      { question: 'Was passiert nach dem Launch?', answer: 'Je nach Paket erhalten Sie 3-12 Monate technischen Support. Danach bieten wir optionale Wartungsverträge für Updates, Sicherheit und Weiterentwicklung.' },
      { question: 'Kann das System in meine bestehende Website integriert werden?', answer: 'Ja, wir können das Buchungssystem als eigenständige Lösung oder als Integration in Ihre bestehende Website entwickeln.' },
      { question: 'Welche Branchen nutzen Online-Buchungssysteme?', answer: 'Unsere Systeme werden von Arztpraxen, Friseuren, Coaches, Fitnessstudios, Restaurants, Hotels und vielen weiteren Branchen genutzt.' },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to the most important questions.',
    items: [
      { question: 'How long does it take to develop a booking system?', answer: 'Depending on the scope, development takes 3-8 weeks. A starter system can go live in 3-4 weeks, while more complex enterprise solutions require 6-8 weeks.' },
      { question: 'Can I expand the system later?', answer: 'Yes, all our systems are modular. You can add new features at any time, such as online payment, SMS reminders or additional languages.' },
      { question: 'Which payment providers are supported?', answer: 'We integrate Stripe, PayPal, Klarna and other payment providers. The integration is individually adapted to your needs.' },
      { question: 'Is the system GDPR compliant?', answer: 'Yes, all our booking systems are fully GDPR compliant. Data is stored on European servers and transmitted encrypted.' },
      { question: 'Do I need technical knowledge to manage it?', answer: 'No, the admin dashboard is intuitively designed. We also offer training for your team.' },
      { question: 'What happens after launch?', answer: 'Depending on the package, you receive 3-12 months of technical support. After that, we offer optional maintenance contracts for updates, security and further development.' },
      { question: 'Can the system be integrated into my existing website?', answer: 'Yes, we can develop the booking system as a standalone solution or as an integration into your existing website.' },
      { question: 'Which industries use online booking systems?', answer: 'Our systems are used by medical practices, hairdressers, coaches, fitness studios, restaurants, hotels and many other industries.' },
    ],
  },
  sr: {
    title: 'Često postavljana pitanja',
    subtitle: 'Odgovori na najvažnija pitanja.',
    items: [
      { question: 'Koliko traje razvoj booking sistema?', answer: 'Zavisno od obima, razvoj traje 3-8 sedmica. Starter sistem može biti gotov za 3-4 sedmice, dok složenija Enterprise rješenja zahtijevaju 6-8 sedmica.' },
      { question: 'Mogu li kasnije proširiti sistem?', answer: 'Da, svi naši sistemi su modularno izgrađeni. Možete dodati nove funkcije u bilo kom trenutku, kao što su online plaćanje, SMS podsjetnici ili dodatni jezici.' },
      { question: 'Koji provajderi plaćanja su podržani?', answer: 'Integrišemo Stripe, PayPal, Klarna i druge provajdere plaćanja. Integracija se individualno prilagođava vašim potrebama.' },
      { question: 'Da li je sistem usklađen sa GDPR-om?', answer: 'Da, svi naši booking sistemi su potpuno usklađeni sa GDPR-om. Podaci se čuvaju na evropskim serverima i prenose šifrovano.' },
      { question: 'Trebam li tehničko znanje za upravljanje?', answer: 'Ne, admin dashboard je intuitivno dizajniran. Takođe nudimo obuku za vaš tim.' },
      { question: 'Šta se dešava nakon pokretanja?', answer: 'Zavisno od paketa, dobijate 3-12 mjeseci tehničke podrške. Nakon toga nudimo opcionalne ugovore o održavanju za nadogradnje, sigurnost i dalji razvoj.' },
      { question: 'Može li se sistem integrisati u moju postojeću web stranicu?', answer: 'Da, možemo razviti booking sistem kao samostalno rješenje ili kao integracija u vašu postojeću web stranicu.' },
      { question: 'Koje branše koriste online booking sisteme?', answer: 'Naši sistemi se koriste u ordinacijama, frizerskim salonima, kod coaches-a, fitness studija, restorana, hotela i mnogih drugih branši.' },
    ],
  },
};

const BookingFaqSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingFaq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isHydrated || !isReady) {
    const content = fallbackContent[currentLang] || fallbackContent.de;
    return (
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-4">
              {content.title}
            </h2>
            <p className="text-gray-600">
              {content.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {content.items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="w-full flex items-center justify-between p-5 text-left">
                  <h3 className="font-medium text-nextpixel-dark pr-4 text-base m-0">{item.question}</h3>
                  <svg className="text-nextpixel-blue flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 11.5a.5.5 0 0 1-.354-.146l-5-5a.5.5 0 1 1 .708-.708L8 10.293l4.646-4.647a.5.5 0 0 1 .708.708l-5 5A.5.5 0 0 1 8 11.5z"/>
                  </svg>
                </div>
                <div className="hidden">
                  <div className="px-5 pb-5 text-gray-600">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {Array.from({ length: FAQ_COUNT }).map((_, index) => {
            const question = t(`items.${index}.question`);
            const answer = t(`items.${index}.answer`);
            if (!question || question === `items.${index}.question`) return null;

            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="font-medium text-nextpixel-dark pr-4 text-base m-0">{question}</h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon icon={FaChevronDown} className="text-nextpixel-blue flex-shrink-0" size={16} aria-hidden={true} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-gray-600">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookingFaqSection;
