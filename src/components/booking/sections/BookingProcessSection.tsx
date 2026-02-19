"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';

const fallbackContent: Record<string, {
  title: string;
  subtitle: string;
  steps: { step: string; title: string; description: string }[];
}> = {
  de: {
    title: 'Ihr fertiges Buchungssystem in wenigen Tagen – ohne Stress',
    subtitle: 'Wir übernehmen alles für Sie. Schnell, professionell und ohne technischen Aufwand auf Ihrer Seite.',
    steps: [
      { step: '01', title: 'Kostenlose Beratung', description: 'Wir zeigen Ihnen eine Live-Demo und analysieren, wie Ihr Buchungssystem aussehen soll, um mehr Kunden zu gewinnen und Ihren Alltag zu erleichtern.' },
      { step: '02', title: 'Individuelle Einrichtung', description: 'Wir richten Ihr komplettes Buchungssystem ein – angepasst an Ihre Leistungen, Ihr Team und Ihr Branding.' },
      { step: '03', title: 'Fertigstellung & Test', description: 'Sie erhalten Ihr fertiges System zur Vorschau. Erst wenn alles perfekt ist, wird es final aktiviert.' },
      { step: '04', title: 'Start & laufende Betreuung', description: 'Ihr System geht live und Ihre Kunden können sofort online buchen. Wir bleiben Ihr Ansprechpartner für Support und Erweiterungen.' },
    ],
  },
  en: {
    title: 'Your finished booking system in just days – stress-free',
    subtitle: 'We handle everything for you. Fast, professional, and without any technical effort on your part.',
    steps: [
      { step: '01', title: 'Free consultation', description: 'We show you a live demo and analyze how your booking system should look to win more customers and simplify your daily routine.' },
      { step: '02', title: 'Custom setup', description: 'We set up your complete booking system – tailored to your services, your team, and your branding.' },
      { step: '03', title: 'Finalization & testing', description: 'You receive your finished system for preview. Only when everything is perfect will it be finally activated.' },
      { step: '04', title: 'Launch & ongoing support', description: 'Your system goes live and your customers can book online immediately. We remain your contact for support and enhancements.' },
    ],
  },
  sr: {
    title: 'Vaš gotov booking sistem za samo nekoliko dana – bez stresa',
    subtitle: 'Mi se brinemo o svemu. Brzo, profesionalno i bez tehničkog napora sa vaše strane.',
    steps: [
      { step: '01', title: 'Besplatna konsultacija', description: 'Pokazujemo vam demo uživo i analiziramo kako vaš booking sistem treba da izgleda da biste osvojili više klijenata i pojednostavili svakodnevicu.' },
      { step: '02', title: 'Individualno podešavanje', description: 'Postavljamo vaš kompletni booking sistem – prilagođen vašim uslugama, vašem timu i vašem brendu.' },
      { step: '03', title: 'Finalizacija i testiranje', description: 'Dobijate gotov sistem na pregled. Tek kada je sve savršeno, sistem se konačno aktivira.' },
      { step: '04', title: 'Pokretanje i kontinuirana podrška', description: 'Vaš sistem ide uživo i vaši klijenti mogu odmah online rezervisati. Ostajemo vaš kontakt za podršku i nadogradnje.' },
    ],
  },
};

const BookingProcessSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingProcess');
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (!isHydrated || !isReady) {
    const fb = fallbackContent[currentLang] || fallbackContent.de;
    return (
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-4">
              {fb.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {fb.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="text-6xl font-bold text-nextpixel-blue/10 mb-4">
                  {fb.steps[index].step}
                </div>
                <h3 className="text-xl font-bold text-nextpixel-dark mb-3">
                  {fb.steps[index].title}
                </h3>
                <p className="text-gray-600">
                  {fb.steps[index].description}
                </p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-nextpixel-turquoise/20 -mr-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
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
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="text-6xl font-bold text-nextpixel-blue/10 mb-4">
                {t(`steps.${index}.step`)}
              </div>
              <h3 className="text-xl font-bold text-nextpixel-dark mb-3">
                {t(`steps.${index}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`steps.${index}.description`)}
              </p>
              {index < 3 && (
                <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-nextpixel-turquoise/20 -mr-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingProcessSection;
