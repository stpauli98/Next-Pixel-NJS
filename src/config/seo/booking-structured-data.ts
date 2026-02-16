import { businessInfo, addressInfo, geoInfo, socialProfiles } from './structured-data';

const bookingBaseUrl = 'https://booking.nextpixel.dev';
const mainBaseUrl = 'https://nextpixel.dev';

const bookingFaqs: Record<string, Array<{ question: string; answer: string }>> = {
  de: [
    {
      question: 'Wie lange dauert die Entwicklung eines Buchungssystems?',
      answer: 'Je nach Umfang dauert die Entwicklung 3-8 Wochen. Ein Starter-System kann in 3-4 Wochen live gehen, während komplexere Enterprise-Lösungen 6-8 Wochen benötigen.',
    },
    {
      question: 'Kann ich das System später erweitern?',
      answer: 'Ja, alle unsere Systeme sind modular aufgebaut. Sie können jederzeit neue Funktionen hinzufügen.',
    },
    {
      question: 'Ist das System DSGVO-konform?',
      answer: 'Ja, alle unsere Buchungssysteme sind vollständig DSGVO-konform. Daten werden auf europäischen Servern gespeichert.',
    },
    {
      question: 'Welche Zahlungsanbieter werden unterstützt?',
      answer: 'Wir integrieren Stripe, PayPal, Klarna und weitere Zahlungsanbieter.',
    },
    {
      question: 'Brauche ich technische Kenntnisse?',
      answer: 'Nein, das Admin-Dashboard ist intuitiv gestaltet. Wir bieten zusätzlich eine Einschulung an.',
    },
  ],
  en: [
    {
      question: 'How long does it take to develop a booking system?',
      answer: 'Depending on the scope, development takes 3-8 weeks.',
    },
    {
      question: 'Can I expand the system later?',
      answer: 'Yes, all our systems are modular. You can add new features at any time.',
    },
    {
      question: 'Is the system GDPR compliant?',
      answer: 'Yes, all our booking systems are fully GDPR compliant.',
    },
  ],
  sr: [
    {
      question: 'Koliko traje razvoj booking sistema?',
      answer: 'Zavisno od obima, razvoj traje 3-8 sedmica.',
    },
    {
      question: 'Mogu li kasnije proširiti sistem?',
      answer: 'Da, svi naši sistemi su modularno izgrađeni.',
    },
    {
      question: 'Da li je sistem usklađen sa GDPR-om?',
      answer: 'Da, svi naši booking sistemi su potpuno usklađeni sa GDPR-om.',
    },
  ],
};

export function generateBookingStructuredData(locale: string = 'de') {
  const currentUrl = `${bookingBaseUrl}/${locale}`;
  const faqs = bookingFaqs[locale] || bookingFaqs.de;

  const serviceDescription: Record<string, string> = {
    de: 'Professionelle Entwicklung von maßgeschneiderten Online-Buchungssystemen mit Terminbuchung, Kalender-Synchronisation, automatischen Erinnerungen und Online-Zahlung.',
    en: 'Professional development of custom online booking systems with appointment scheduling, calendar sync, automatic reminders and online payments.',
    sr: 'Profesionalna izrada prilagođenih online booking sistema sa zakazivanjem termina, sinhronizacijom kalendara, automatskim podsjetnicima i online plaćanjem.',
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Service
      {
        '@type': 'Service',
        '@id': `${bookingBaseUrl}/#service`,
        name: locale === 'de'
          ? 'Online-Buchungssystem Entwicklung'
          : locale === 'en'
            ? 'Online Booking System Development'
            : 'Izrada Online Booking Sistema',
        description: serviceDescription[locale] || serviceDescription.de,
        provider: { '@id': `${mainBaseUrl}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'Country', name: 'Bosnia and Herzegovina' },
          { '@type': 'Place', name: 'Europe' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: locale === 'de' ? 'Buchungssystem Pakete' : 'Booking System Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Starter',
              description: locale === 'de'
                ? 'Online-Terminbuchung, E-Mail-Bestätigungen, Responsive Design, Google Calendar Sync'
                : 'Online appointment booking, email confirmations, responsive design, Google Calendar Sync',
              price: '990',
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '990',
                priceCurrency: 'EUR',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              name: 'Professional',
              description: locale === 'de'
                ? 'SMS-Erinnerungen, Online-Zahlung, Mitarbeiterverwaltung, Erweiterte Analytics'
                : 'SMS reminders, online payment, staff management, advanced analytics',
              price: '2490',
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '2490',
                priceCurrency: 'EUR',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              name: 'Enterprise',
              description: locale === 'de'
                ? 'Maßgeschneiderte Lösung mit API-Integration, Multi-Standort und Automatisierung'
                : 'Custom solution with API integration, multi-location and automation',
            },
          ],
        },
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}/#webpage`,
        url: currentUrl,
        name: locale === 'de'
          ? 'Online-Buchungssystem Entwicklung | NextPixel'
          : locale === 'en'
            ? 'Online Booking System Development | NextPixel'
            : 'Izrada Online Booking Sistema | NextPixel',
        isPartOf: { '@id': `${mainBaseUrl}/#website` },
        about: { '@id': `${bookingBaseUrl}/#service` },
        inLanguage: locale,
        datePublished: '2026-02-01',
        dateModified: '2026-02-16',
      },
      // FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${currentUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      // Organization reference
      {
        '@type': 'Organization',
        '@id': `${mainBaseUrl}/#organization`,
        name: businessInfo.name,
        url: mainBaseUrl,
        logo: businessInfo.logo,
        telephone: businessInfo.telephone,
        email: businessInfo.email,
        address: addressInfo,
        geo: geoInfo,
        sameAs: socialProfiles,
      },
    ],
  };
}
