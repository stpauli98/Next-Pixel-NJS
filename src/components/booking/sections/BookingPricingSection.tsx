"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';
import { StarButton } from '@/components/ui/star-button';
import { FaCheck } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

interface PricingPackage {
  name: string;
  price: string;
  currency: string;
  description: string;
  popular: boolean;
  cta: string;
  features: string[];
}

interface PricingFallback {
  title: string;
  subtitle: string;
  note: string;
  packages: PricingPackage[];
}

const fallbackContent: Record<string, PricingFallback> = {
  de: {
    title: 'Investition, die sich bereits nach wenigen Wochen auszahlt',
    subtitle: 'Ein professionelles Buchungssystem, das Ihnen Zeit spart, Ausfälle reduziert und mehr Umsatz bringt. Einmalige Einrichtung, keine versteckten Kosten.',
    note: 'Die meisten Kunden haben ihre Investition bereits nach wenigen Wochen durch zusätzliche Buchungen wieder verdient.',
    packages: [
      {
        name: 'Starter',
        price: 'ab 990',
        currency: 'EUR',
        description: 'Ideal für Selbstständige, die Termine automatisieren und Zeit sparen möchten',
        popular: false,
        cta: 'Demo anfragen',
        features: ['Online-Buchung rund um die Uhr', 'Automatische Bestätigungen für Kunden', 'Optimiert für Smartphone und Desktop', 'Google Kalender Synchronisation', 'Übersichtliches Buchungs-Dashboard', 'Persönlicher Support nach dem Launch'],
      },
      {
        name: 'Professional',
        price: 'ab 2.490',
        currency: 'EUR',
        description: 'Für Unternehmen, die mehr Kunden gewinnen und Ausfälle deutlich reduzieren wollen',
        popular: true,
        cta: 'Beliebteste Wahl',
        features: ['Alles aus Starter', 'Automatische SMS-Erinnerungen gegen No-Shows', 'Online-Zahlungen und Anzahlungen', 'Verwaltung mehrerer Mitarbeiter', 'Detaillierte Statistiken und Umsatzübersicht', 'Mehrsprachiges Buchungssystem', 'Individuelle Anpassung an Ihr Unternehmen', 'Priorisierter Support'],
      },
      {
        name: 'Enterprise',
        price: 'auf Anfrage',
        currency: '',
        description: 'Individuelle Lösung für Unternehmen mit speziellen Anforderungen und mehreren Standorten',
        popular: false,
        cta: 'Kontaktieren Sie uns',
        features: ['Komplett maßgeschneiderte Lösung', 'Integration in bestehende Systeme', 'Multi-Standort und komplexe Strukturen', 'Eigenes Branding und individuelle Funktionen', 'Automatisierung von internen Prozessen', 'Prioritäts-Support mit direktem Ansprechpartner', 'Langfristige Betreuung und Weiterentwicklung'],
      },
    ],
  },
  en: {
    title: 'An investment that pays for itself within weeks',
    subtitle: 'A professional booking system that saves you time, reduces no-shows, and generates more revenue. One-time setup, no hidden costs.',
    note: 'Most customers have already recovered their investment within a few weeks through additional bookings.',
    packages: [
      {
        name: 'Starter',
        price: 'from 990',
        currency: 'EUR',
        description: 'Ideal for self-employed professionals who want to automate appointments and save time',
        popular: false,
        cta: 'Get started',
        features: ['24/7 online booking', 'Automatic confirmations for customers', 'Optimized for smartphone and desktop', 'Google Calendar synchronization', 'Clear booking dashboard', 'Personal support after launch'],
      },
      {
        name: 'Professional',
        price: 'from 2,490',
        currency: 'EUR',
        description: 'For businesses that want to win more customers and significantly reduce no-shows',
        popular: true,
        cta: 'Choose plan',
        features: ['Everything from Starter', 'Automatic SMS reminders against no-shows', 'Online payments and deposits', 'Multi-staff management', 'Detailed statistics and revenue overview', 'Multilingual booking system', 'Custom tailoring to your business', 'Priority support'],
      },
      {
        name: 'Enterprise',
        price: 'on request',
        currency: '',
        description: 'Custom solution for businesses with special requirements and multiple locations',
        popular: false,
        cta: 'Contact us',
        features: ['Fully custom-built solution', 'Integration with existing systems', 'Multi-location and complex structures', 'Custom branding and individual features', 'Internal process automation', 'Priority support with dedicated contact', 'Long-term support and development'],
      },
    ],
  },
  sr: {
    title: 'Investicija koja se isplati već nakon nekoliko sedmica',
    subtitle: 'Profesionalni booking sistem koji vam štedi vrijeme, smanjuje izostanke i donosi više prihoda. Jednokratno podešavanje, bez skrivenih troškova.',
    note: 'Većina klijenata je svoju investiciju već nadoknadila u roku od nekoliko sedmica kroz dodatne rezervacije.',
    packages: [
      {
        name: 'Starter',
        price: 'od 990',
        currency: 'EUR',
        description: 'Idealno za samostalne profesionalce koji žele automatizovati termine i uštedjeti vrijeme',
        popular: false,
        cta: 'Zatraži demo',
        features: ['Online rezervacija 24/7', 'Automatske potvrde za klijente', 'Optimizovano za telefon i računar', 'Google Calendar sinhronizacija', 'Pregledan booking dashboard', 'Lična podrška nakon pokretanja'],
      },
      {
        name: 'Professional',
        price: 'od 2.490',
        currency: 'EUR',
        description: 'Za firme koje žele osvojiti više klijenata i značajno smanjiti izostanke',
        popular: true,
        cta: 'Izaberi paket',
        features: ['Sve iz Starter paketa', 'Automatski SMS podsjetnici protiv izostanaka', 'Online plaćanja i depoziti', 'Upravljanje više zaposlenih', 'Detaljne statistike i pregled prihoda', 'Višejezični booking sistem', 'Individualna prilagodba vašem poslovanju', 'Prioritetna podrška'],
      },
      {
        name: 'Enterprise',
        price: 'na upit',
        currency: '',
        description: 'Individualno rješenje za firme sa posebnim zahtjevima i više lokacija',
        popular: false,
        cta: 'Kontaktirajte nas',
        features: ['Kompletno prilagođeno rješenje', 'Integracija u postojeće sisteme', 'Više lokacija i kompleksne strukture', 'Vlastiti brending i individualne funkcije', 'Automatizacija internih procesa', 'Prioritetna podrška sa direktnim kontaktom', 'Dugoročna podrška i razvoj'],
      },
    ],
  },
};

const BookingPricingSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingPricing');
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const packages = [
    { index: 0, popular: false },
    { index: 1, popular: true },
    { index: 2, popular: false },
  ];

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (!isHydrated || !isReady) {
    const content = fallbackContent[currentLang] || fallbackContent.de;
    return (
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-4">
              {content.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative flex flex-col bg-white rounded-2xl p-8 ${
                  pkg.popular
                    ? 'ring-2 ring-nextpixel-turquoise shadow-lg scale-105'
                    : 'shadow-sm'
                } transition-all`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nextpixel-turquoise text-white text-xs font-bold px-4 py-1 rounded-full">
                    {pkg.cta}
                  </div>
                )}

                <h3 className="text-xl font-bold text-nextpixel-dark mb-2">
                  {pkg.name}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-nextpixel-blue">
                    {pkg.price}
                  </span>
                  {pkg.currency && (
                    <span className="text-gray-500 ml-1">
                      {pkg.currency}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <svg className="text-nextpixel-turquoise mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center mt-auto px-6 py-3 rounded-full font-medium text-sm transition-colors ${
                    pkg.popular
                      ? 'bg-nextpixel-blue text-white hover:opacity-90'
                      : 'bg-nextpixel-turquoise text-white hover:opacity-90'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            {content.note}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map(({ index, popular }) => {
            const isPopular = t(`packages.${index}.popular`) === 'true' || popular;

            return (
              <motion.div
                key={index}
                className={`relative flex flex-col bg-white rounded-2xl p-8 ${
                  isPopular
                    ? 'ring-2 ring-nextpixel-turquoise shadow-lg scale-105'
                    : 'shadow-sm hover:shadow-md'
                } transition-all`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nextpixel-turquoise text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t(`packages.${index}.cta`)}
                  </div>
                )}

                <h3 className="text-xl font-bold text-nextpixel-dark mb-2">
                  {t(`packages.${index}.name`)}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-nextpixel-blue">
                    {t(`packages.${index}.price`)}
                  </span>
                  {t(`packages.${index}.currency`) && (
                    <span className="text-gray-500 ml-1">
                      {t(`packages.${index}.currency`)}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {t(`packages.${index}.description`)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((featureIndex) => {
                    const feature = t(`packages.${index}.features.${featureIndex}`);
                    if (!feature || feature === `packages.${index}.features.${featureIndex}`) return null;
                    return (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <Icon icon={FaCheck} className="text-nextpixel-turquoise mt-0.5 flex-shrink-0" size={14} aria-hidden={true} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                <StarButton
                  href="#contact"
                  className="w-full justify-center mt-auto"
                  {...(isPopular ? {} : { lightColor: '#1E3A5F', backgroundColor: '#2E8B9A' })}
                >
                  {t(`packages.${index}.cta`)}
                </StarButton>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {t('note')}
        </motion.p>
      </div>
    </section>
  );
};

export default BookingPricingSection;
