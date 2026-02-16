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
    title: 'In 4 Schritten zu Ihrem Buchungssystem',
    subtitle: 'Ein klarer, transparenter Prozess von der ersten Idee bis zum fertigen System.',
    steps: [
      { step: '01', title: 'Beratung', description: 'Wir analysieren Ihre Anforderungen, verstehen Ihre Prozesse und definieren gemeinsam den optimalen Funktionsumfang.' },
      { step: '02', title: 'Design', description: 'Wir gestalten eine intuitive Benutzeroberfl\u00E4che, die zu Ihrem Branding passt und Ihre Kunden begeistert.' },
      { step: '03', title: 'Entwicklung', description: 'Unser Team entwickelt Ihr Buchungssystem mit modernsten Technologien. Regelm\u00E4\u00DFige Updates halten Sie auf dem Laufenden.' },
      { step: '04', title: 'Launch & Support', description: 'Wir deployen Ihr System, schulen Ihr Team und bieten langfristigen technischen Support.' },
    ],
  },
  en: {
    title: 'Your Booking System in 4 Steps',
    subtitle: 'A clear, transparent process from the first idea to the finished system.',
    steps: [
      { step: '01', title: 'Consultation', description: 'We analyze your requirements, understand your processes and together define the optimal feature set.' },
      { step: '02', title: 'Design', description: 'We design an intuitive user interface that matches your branding and delights your customers.' },
      { step: '03', title: 'Development', description: 'Our team develops your booking system with cutting-edge technologies. Regular updates keep you informed.' },
      { step: '04', title: 'Launch & Support', description: 'We deploy your system, train your team and provide long-term technical support.' },
    ],
  },
  sr: {
    title: 'Va\u0161 booking sistem u 4 koraka',
    subtitle: 'Jasan, transparentan proces od prve ideje do gotovog sistema.',
    steps: [
      { step: '01', title: 'Konsultacija', description: 'Analiziramo va\u0161e zahtjeve, razumijemo va\u0161e procese i zajedno defini\u0161emo optimalan set funkcija.' },
      { step: '02', title: 'Dizajn', description: 'Dizajniramo intuitivan korisni\u010Dki interfejs koji odgovara va\u0161em brendu i odu\u0161evljava va\u0161e klijente.' },
      { step: '03', title: 'Razvoj', description: 'Na\u0161 tim razvija va\u0161 booking sistem sa najnovijim tehnologijama. Redovni izvje\u0161taji vas dr\u017Ee u toku.' },
      { step: '04', title: 'Pokretanje i podr\u0161ka', description: 'Postavljamo va\u0161 sistem, obu\u010Davamo va\u0161 tim i pru\u017Eamo dugoro\u010Dnu tehni\u010Dku podr\u0161ku.' },
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
