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
    title: 'Transparente Preise',
    subtitle: 'Wählen Sie das Paket, das zu Ihrem Unternehmen passt. Alle Preise zzgl. MwSt.',
    note: 'Individuelle Anforderungen? Kontaktieren Sie uns für ein maßgeschneidertes Angebot.',
    packages: [
      {
        name: 'Starter',
        price: 'ab 990',
        currency: 'EUR',
        description: 'Perfekt für Einzelunternehmer und kleine Betriebe',
        popular: false,
        cta: 'Jetzt starten',
        features: ['Online-Terminbuchung', 'E-Mail-Bestätigungen', 'Responsive Design', 'Google Calendar Sync', 'Basis-Dashboard', '3 Monate Support'],
      },
      {
        name: 'Professional',
        price: 'ab 2.490',
        currency: 'EUR',
        description: 'Ideal für wachsende Unternehmen mit mehreren Mitarbeitern',
        popular: true,
        cta: 'Beliebteste Wahl',
        features: ['Alles aus Starter', 'SMS-Erinnerungen', 'Online-Zahlung (Stripe/PayPal)', 'Mitarbeiterverwaltung', 'Erweiterte Analytics', 'Mehrsprachig (DE/EN)', 'Individuelle Anpassungen', '6 Monate Support'],
      },
      {
        name: 'Enterprise',
        price: 'auf Anfrage',
        currency: '',
        description: 'Maßgeschneiderte Lösung für große Unternehmen',
        popular: false,
        cta: 'Kontakt aufnehmen',
        features: ['Alles aus Professional', 'API-Integration', 'Multi-Standort', 'Eigenes Branding', 'Automatisierte Workflows', 'Prioritäts-Support', 'SLA-Garantie', '12 Monate Support'],
      },
    ],
  },
  en: {
    title: 'Transparent Pricing',
    subtitle: 'Choose the package that fits your business. All prices excl. VAT.',
    note: 'Custom requirements? Contact us for a tailored quote.',
    packages: [
      {
        name: 'Starter',
        price: 'from 990',
        currency: 'EUR',
        description: 'Perfect for solo entrepreneurs and small businesses',
        popular: false,
        cta: 'Get Started',
        features: ['Online appointment booking', 'Email confirmations', 'Responsive design', 'Google Calendar Sync', 'Basic dashboard', '3 months support'],
      },
      {
        name: 'Professional',
        price: 'from 2,490',
        currency: 'EUR',
        description: 'Ideal for growing businesses with multiple employees',
        popular: true,
        cta: 'Most Popular',
        features: ['Everything in Starter', 'SMS reminders', 'Online payment (Stripe/PayPal)', 'Staff management', 'Advanced analytics', 'Multilingual (DE/EN)', 'Custom modifications', '6 months support'],
      },
      {
        name: 'Enterprise',
        price: 'on request',
        currency: '',
        description: 'Tailored solution for large organizations',
        popular: false,
        cta: 'Contact Us',
        features: ['Everything in Professional', 'API integration', 'Multi-location', 'Custom branding', 'Automated workflows', 'Priority support', 'SLA guarantee', '12 months support'],
      },
    ],
  },
  sr: {
    title: 'Transparentne cijene',
    subtitle: 'Izaberite paket koji odgovara vašem poslovanju. Sve cijene bez PDV-a.',
    note: 'Posebni zahtjevi? Kontaktirajte nas za prilagođenu ponudu.',
    packages: [
      {
        name: 'Starter',
        price: 'od 990',
        currency: 'EUR',
        description: 'Savršeno za preduzetnike i male firme',
        popular: false,
        cta: 'Započni',
        features: ['Online zakazivanje termina', 'Email potvrde', 'Responsive dizajn', 'Google Calendar Sync', 'Osnovni dashboard', '3 mjeseca podrške'],
      },
      {
        name: 'Professional',
        price: 'od 2.490',
        currency: 'EUR',
        description: 'Idealno za rastuće firme sa više zaposlenih',
        popular: true,
        cta: 'Najpopularniji izbor',
        features: ['Sve iz Starter paketa', 'SMS podsjetnici', 'Online plaćanje (Stripe/PayPal)', 'Upravljanje zaposlenima', 'Napredna analitika', 'Višejezično (DE/EN)', 'Individualne prilagodbe', '6 mjeseci podrške'],
      },
      {
        name: 'Enterprise',
        price: 'na upit',
        currency: '',
        description: 'Prilagođeno rješenje za velike kompanije',
        popular: false,
        cta: 'Kontaktirajte nas',
        features: ['Sve iz Professional paketa', 'API integracija', 'Više lokacija', 'Vlastiti brending', 'Automatizovani radni tokovi', 'Prioritetna podrška', 'SLA garancija', '12 mjeseci podrške'],
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
