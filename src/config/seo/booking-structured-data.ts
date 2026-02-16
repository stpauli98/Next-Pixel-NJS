import { businessInfo, addressInfo, geoInfo, socialProfiles } from './structured-data';

const bookingBaseUrl = 'https://booking.nextpixel.dev';
const mainBaseUrl = 'https://nextpixel.dev';

// All 8 FAQs per language - synced with bookingFaq.json translation files
const bookingFaqs: Record<string, Array<{ question: string; answer: string }>> = {
  de: [
    {
      question: 'Wie lange dauert die Entwicklung eines Buchungssystems?',
      answer: 'Je nach Umfang dauert die Entwicklung 3-8 Wochen. Ein Starter-System kann in 3-4 Wochen live gehen, während komplexere Enterprise-Lösungen 6-8 Wochen benötigen.',
    },
    {
      question: 'Kann ich das System später erweitern?',
      answer: 'Ja, alle unsere Systeme sind modular aufgebaut. Sie können jederzeit neue Funktionen hinzufügen, z.B. Online-Zahlung, SMS-Erinnerungen oder zusätzliche Sprachen.',
    },
    {
      question: 'Welche Zahlungsanbieter werden unterstützt?',
      answer: 'Wir integrieren Stripe, PayPal, Klarna und weitere Zahlungsanbieter. Die Integration wird individuell an Ihre Bedürfnisse angepasst.',
    },
    {
      question: 'Ist das System DSGVO-konform?',
      answer: 'Ja, alle unsere Buchungssysteme sind vollständig DSGVO-konform. Daten werden auf europäischen Servern gespeichert und verschlüsselt übertragen.',
    },
    {
      question: 'Brauche ich technische Kenntnisse für die Verwaltung?',
      answer: 'Nein, das Admin-Dashboard ist intuitiv gestaltet. Wir bieten zusätzlich eine Einschulung für Ihr Team an.',
    },
    {
      question: 'Was passiert nach dem Launch?',
      answer: 'Je nach Paket erhalten Sie 3-12 Monate technischen Support. Danach bieten wir optionale Wartungsverträge für Updates, Sicherheit und Weiterentwicklung.',
    },
    {
      question: 'Kann das System in meine bestehende Website integriert werden?',
      answer: 'Ja, wir können das Buchungssystem als eigenständige Lösung oder als Integration in Ihre bestehende Website entwickeln.',
    },
    {
      question: 'Welche Branchen nutzen Online-Buchungssysteme?',
      answer: 'Unsere Systeme werden von Arztpraxen, Friseuren, Coaches, Fitnessstudios, Restaurants, Hotels und vielen weiteren Branchen genutzt.',
    },
  ],
  en: [
    {
      question: 'How long does it take to develop a booking system?',
      answer: 'Depending on the scope, development takes 3-8 weeks. A starter system can go live in 3-4 weeks, while more complex enterprise solutions require 6-8 weeks.',
    },
    {
      question: 'Can I expand the system later?',
      answer: 'Yes, all our systems are modular. You can add new features at any time, such as online payment, SMS reminders or additional languages.',
    },
    {
      question: 'Which payment providers are supported?',
      answer: 'We integrate Stripe, PayPal, Klarna and other payment providers. The integration is individually adapted to your needs.',
    },
    {
      question: 'Is the system GDPR compliant?',
      answer: 'Yes, all our booking systems are fully GDPR compliant. Data is stored on European servers and transmitted encrypted.',
    },
    {
      question: 'Do I need technical knowledge to manage it?',
      answer: 'No, the admin dashboard is intuitively designed. We also offer training for your team.',
    },
    {
      question: 'What happens after launch?',
      answer: 'Depending on the package, you receive 3-12 months of technical support. After that, we offer optional maintenance contracts for updates, security and further development.',
    },
    {
      question: 'Can the system be integrated into my existing website?',
      answer: 'Yes, we can develop the booking system as a standalone solution or as an integration into your existing website.',
    },
    {
      question: 'Which industries use online booking systems?',
      answer: 'Our systems are used by medical practices, hairdressers, coaches, fitness studios, restaurants, hotels and many other industries.',
    },
  ],
  sr: [
    {
      question: 'Koliko traje razvoj booking sistema?',
      answer: 'Zavisno od obima, razvoj traje 3-8 sedmica. Starter sistem može biti gotov za 3-4 sedmice, dok složenija Enterprise rješenja zahtijevaju 6-8 sedmica.',
    },
    {
      question: 'Mogu li kasnije proširiti sistem?',
      answer: 'Da, svi naši sistemi su modularno izgrađeni. Možete dodati nove funkcije u bilo kom trenutku, kao što su online plaćanje, SMS podsjetnici ili dodatni jezici.',
    },
    {
      question: 'Koji provajderi plaćanja su podržani?',
      answer: 'Integrišemo Stripe, PayPal, Klarna i druge provajdere plaćanja. Integracija se individualno prilagođava vašim potrebama.',
    },
    {
      question: 'Da li je sistem usklađen sa GDPR-om?',
      answer: 'Da, svi naši booking sistemi su potpuno usklađeni sa GDPR-om. Podaci se čuvaju na evropskim serverima i prenose šifrovano.',
    },
    {
      question: 'Trebam li tehničko znanje za upravljanje?',
      answer: 'Ne, admin dashboard je intuitivno dizajniran. Takođe nudimo obuku za vaš tim.',
    },
    {
      question: 'Šta se dešava nakon pokretanja?',
      answer: 'Zavisno od paketa, dobijate 3-12 mjeseci tehničke podrške. Nakon toga nudimo opcionalne ugovore o održavanju za nadogradnje, sigurnost i dalji razvoj.',
    },
    {
      question: 'Može li se sistem integrisati u moju postojeću web stranicu?',
      answer: 'Da, možemo razviti booking sistem kao samostalno rješenje ili kao integracija u vašu postojeću web stranicu.',
    },
    {
      question: 'Koje branše koriste online booking sisteme?',
      answer: 'Naši sistemi se koriste u ordinacijama, frizerskim salonima, kod coaches-a, fitness studija, restorana, hotela i mnogih drugih branši.',
    },
  ],
};

// HowTo steps - synced with bookingProcess.json
const bookingSteps: Record<string, Array<{ name: string; text: string }>> = {
  de: [
    { name: 'Beratung', text: 'Wir analysieren Ihre Anforderungen, verstehen Ihre Prozesse und definieren gemeinsam den optimalen Funktionsumfang.' },
    { name: 'Design', text: 'Wir gestalten eine intuitive Benutzeroberfläche, die zu Ihrem Branding passt und Ihre Kunden begeistert.' },
    { name: 'Entwicklung', text: 'Unser Team entwickelt Ihr Buchungssystem mit modernsten Technologien. Regelmäßige Updates halten Sie auf dem Laufenden.' },
    { name: 'Launch & Support', text: 'Wir deployen Ihr System, schulen Ihr Team und bieten langfristigen technischen Support.' },
  ],
  en: [
    { name: 'Consultation', text: 'We analyze your requirements, understand your processes and together define the optimal feature set.' },
    { name: 'Design', text: 'We design an intuitive user interface that matches your branding and delights your customers.' },
    { name: 'Development', text: 'Our team develops your booking system with cutting-edge technologies. Regular updates keep you informed.' },
    { name: 'Launch & Support', text: 'We deploy your system, train your team and provide long-term technical support.' },
  ],
  sr: [
    { name: 'Konsultacija', text: 'Analiziramo vaše zahtjeve, razumijemo vaše procese i zajedno definišemo optimalan set funkcija.' },
    { name: 'Dizajn', text: 'Dizajniramo intuitivan korisnički interfejs koji odgovara vašem brendu i oduševljava vaše klijente.' },
    { name: 'Razvoj', text: 'Naš tim razvija vaš booking sistem sa najnovijim tehnologijama. Redovni izvještaji vas drže u toku.' },
    { name: 'Pokretanje i podrška', text: 'Postavljamo vaš sistem, obučavamo vaš tim i pružamo dugoročnu tehničku podršku.' },
  ],
};

export function generateBookingStructuredData(locale: string = 'de') {
  const currentUrl = `${bookingBaseUrl}/${locale}`;
  const faqs = bookingFaqs[locale] || bookingFaqs.de;
  const steps = bookingSteps[locale] || bookingSteps.de;

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
        serviceType: 'Online Booking System Development',
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
          name: locale === 'de' ? 'Buchungssystem Pakete' : locale === 'en' ? 'Booking System Packages' : 'Booking sistem paketi',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Starter',
              description: locale === 'de'
                ? 'Online-Terminbuchung, E-Mail-Bestätigungen, Responsive Design, Google Calendar Sync'
                : locale === 'en'
                  ? 'Online appointment booking, email confirmations, responsive design, Google Calendar Sync'
                  : 'Online zakazivanje termina, email potvrde, responsive dizajn, Google Calendar Sync',
              price: '990',
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
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
                : locale === 'en'
                  ? 'SMS reminders, online payment, staff management, advanced analytics'
                  : 'SMS podsjetnici, online plaćanje, upravljanje zaposlenima, napredna analitika',
              price: '2490',
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
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
                : locale === 'en'
                  ? 'Custom solution with API integration, multi-location and automation'
                  : 'Prilagođeno rješenje sa API integracijom, više lokacija i automatizacijom',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                priceCurrency: 'EUR',
                minPrice: '4990',
                valueAddedTaxIncluded: false,
              },
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
        breadcrumb: { '@id': `${currentUrl}/#breadcrumb` },
        inLanguage: locale,
        datePublished: '2026-02-01',
        dateModified: '2026-02-16',
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'NextPixel',
            item: mainBaseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'de' ? 'Buchungssystem' : locale === 'en' ? 'Booking System' : 'Booking Sistem',
            item: currentUrl,
          },
        ],
      },
      // HowTo
      {
        '@type': 'HowTo',
        '@id': `${currentUrl}/#howto`,
        name: locale === 'de'
          ? 'In 4 Schritten zu Ihrem Buchungssystem'
          : locale === 'en'
            ? 'Your Booking System in 4 Steps'
            : 'Vaš booking sistem u 4 koraka',
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
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
