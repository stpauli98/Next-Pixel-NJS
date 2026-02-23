import { businessInfo, addressInfo, geoInfo, socialProfiles } from './structured-data';

const bookingBaseUrl = 'https://booking.nextpixel.dev';
const mainBaseUrl = 'https://www.nextpixel.dev';

// All 9 FAQs per language - synced with bookingFaq.json translation files
const bookingFaqs: Record<string, Array<{ question: string; answer: string }>> = {
  de: [
    { question: 'Wie schnell kann mein Buchungssystem live gehen?', answer: 'In den meisten Fällen ist Ihr Buchungssystem innerhalb von 7 bis 21 Tagen vollständig eingerichtet und einsatzbereit. Sie können sofort neue Kunden online gewinnen.' },
    { question: 'Wird das System individuell für mein Unternehmen eingerichtet?', answer: 'Ja. Ihr Buchungssystem wird vollständig an Ihre Leistungen, Mitarbeiter und Ihr Branding angepasst. Sie erhalten keine Standardlösung, sondern ein professionelles System für Ihr Unternehmen.' },
    { question: 'Reduziert das System wirklich Terminausfälle?', answer: 'Ja. Automatische SMS- und E-Mail-Erinnerungen reduzieren Terminausfälle erfahrungsgemäß um bis zu 80%. Das bedeutet mehr wahrgenommene Termine und mehr Umsatz für Ihr Unternehmen.' },
    { question: 'Ist das System einfach zu bedienen?', answer: 'Ja. Das Dashboard ist übersichtlich und intuitiv gestaltet. Die meisten Kunden können es sofort ohne technische Kenntnisse nutzen. Zusätzlich erhalten Sie eine persönliche Einführung.' },
    { question: 'Kann ich später Funktionen hinzufügen oder erweitern?', answer: 'Ja. Ihr System kann jederzeit erweitert werden, zum Beispiel um Online-Zahlungen, zusätzliche Mitarbeiter, mehrere Standorte oder weitere Funktionen.' },
    { question: 'Was passiert nach dem Launch?', answer: 'Ihr System läuft sofort stabil und Ihre Kunden können online buchen. Wir bleiben Ihr Ansprechpartner für Support, Updates und Weiterentwicklungen.' },
    { question: 'Ist das System DSGVO-konform und sicher?', answer: 'Ja. Alle Daten werden sicher verarbeitet und auf europäischen Servern gespeichert. Ihr System erfüllt alle DSGVO-Anforderungen.' },
    { question: 'Wann lohnt sich die Investition?', answer: 'Viele unserer Kunden gewinnen bereits im ersten Monat zusätzliche Buchungen. In den meisten Fällen amortisiert sich das System innerhalb kurzer Zeit.' },
    { question: 'Was ist, wenn meine Kunden lieber telefonisch buchen oder kein Internet nutzen?', answer: 'Kein Problem. Sie können Termine, die Sie telefonisch erhalten, selbst in wenigen Sekunden in das System eintragen. Der Termin wird sofort im Kalender gespeichert und alle Zeiten werden automatisch aktualisiert. Dadurch werden Doppelbuchungen zuverlässig verhindert.' },
  ],
  en: [
    { question: 'How quickly can my booking system go live?', answer: 'In most cases, your booking system is fully set up and ready to use within 7 to 21 days. You can start winning new customers online right away.' },
    { question: 'Will the system be set up individually for my business?', answer: 'Yes. Your booking system is fully tailored to your services, staff, and branding. You won\'t receive a standard solution, but a professional system built for your business.' },
    { question: 'Does the system really reduce no-shows?', answer: 'Yes. Automatic SMS and email reminders reduce no-shows by up to 80% based on experience. That means more kept appointments and more revenue for your business.' },
    { question: 'Is the system easy to use?', answer: 'Yes. The dashboard is clear and intuitively designed. Most customers can use it immediately without any technical knowledge. You also receive a personal onboarding session.' },
    { question: 'Can I add features or expand later?', answer: 'Yes. Your system can be expanded at any time, for example with online payments, additional staff, multiple locations, or further features.' },
    { question: 'What happens after launch?', answer: 'Your system runs stably right away and your customers can book online. We remain your contact for support, updates, and further development.' },
    { question: 'Is the system GDPR compliant and secure?', answer: 'Yes. All data is processed securely and stored on European servers. Your system meets all GDPR requirements.' },
    { question: 'When does the investment pay off?', answer: 'Many of our customers gain additional bookings in the very first month. In most cases, the system pays for itself within a short time.' },
    { question: 'What if my customers prefer to book by phone or don\'t use the internet?', answer: 'No problem. You can enter phone appointments into the system yourself in just a few seconds. The appointment is instantly saved to the calendar and all times are automatically updated. This reliably prevents double bookings.' },
  ],
  sr: [
    { question: 'Koliko brzo može moj booking sistem biti aktivan?', answer: 'U većini slučajeva, vaš booking sistem je potpuno podešen i spreman za korištenje u roku od 7 do 21 dan. Možete odmah početi osvajati nove klijente online.' },
    { question: 'Da li se sistem postavlja individualno za moju firmu?', answer: 'Da. Vaš booking sistem se potpuno prilagođava vašim uslugama, zaposlenima i brendu. Nećete dobiti standardno rješenje, već profesionalan sistem izgrađen za vaše poslovanje.' },
    { question: 'Da li sistem zaista smanjuje propuštene termine?', answer: 'Da. Automatski SMS i email podsjetnici smanjuju propuštene termine za do 80% prema iskustvu. To znači više realizovanih termina i više prihoda za vaše poslovanje.' },
    { question: 'Da li je sistem jednostavan za korištenje?', answer: 'Da. Dashboard je pregledan i intuitivno dizajniran. Većina klijenata može ga koristiti odmah bez tehničkog znanja. Takođe dobijate ličnu obuku.' },
    { question: 'Mogu li kasnije dodati funkcije ili proširiti sistem?', answer: 'Da. Vaš sistem se može proširiti u bilo kom trenutku, na primjer online plaćanjima, dodatnim zaposlenima, više lokacija ili dodatnim funkcijama.' },
    { question: 'Šta se dešava nakon pokretanja?', answer: 'Vaš sistem radi stabilno odmah i vaši klijenti mogu rezervisati online. Ostajemo vaš kontakt za podršku, ažuriranja i dalji razvoj.' },
    { question: 'Da li je sistem GDPR usklađen i siguran?', answer: 'Da. Svi podaci se sigurno obrađuju i čuvaju na evropskim serverima. Vaš sistem ispunjava sve GDPR zahtjeve.' },
    { question: 'Kada se investicija isplati?', answer: 'Mnogi naši klijenti dobiju dodatne rezervacije već u prvom mjesecu. U većini slučajeva, sistem se isplati u kratkom roku.' },
    { question: 'Šta ako moji klijenti radije rezervišu telefonski ili ne koriste internet?', answer: 'Nema problema. Termine koje dobijete telefonom možete sami unijeti u sistem za samo nekoliko sekundi. Termin se odmah sprema u kalendar i sva vremena se automatski ažuriraju. Time se pouzdano sprečavaju duple rezervacije.' },
  ],
};

// HowTo steps - synced with bookingProcess.json
const bookingSteps: Record<string, Array<{ name: string; text: string }>> = {
  de: [
    { name: 'Kostenlose Beratung', text: 'Wir zeigen Ihnen eine Live-Demo und analysieren, wie Ihr Buchungssystem aussehen soll, um mehr Kunden zu gewinnen und Ihren Alltag zu erleichtern.' },
    { name: 'Individuelle Einrichtung', text: 'Wir richten Ihr komplettes Buchungssystem ein – angepasst an Ihre Leistungen, Ihr Team und Ihr Branding.' },
    { name: 'Fertigstellung & Test', text: 'Sie erhalten Ihr fertiges System zur Vorschau. Erst wenn alles perfekt ist, wird es final aktiviert.' },
    { name: 'Start & laufende Betreuung', text: 'Ihr System geht live und Ihre Kunden können sofort online buchen. Wir bleiben Ihr Ansprechpartner für Support und Erweiterungen.' },
  ],
  en: [
    { name: 'Free consultation', text: 'We show you a live demo and analyze how your booking system should look to win more customers and simplify your daily routine.' },
    { name: 'Custom setup', text: 'We set up your complete booking system – tailored to your services, your team, and your branding.' },
    { name: 'Finalization & testing', text: 'You receive your finished system for preview. Only when everything is perfect will it be finally activated.' },
    { name: 'Launch & ongoing support', text: 'Your system goes live and your customers can book online immediately. We remain your contact for support and enhancements.' },
  ],
  sr: [
    { name: 'Besplatna konsultacija', text: 'Pokazujemo vam demo uživo i analiziramo kako vaš booking sistem treba da izgleda da biste osvojili više klijenata i pojednostavili svakodnevicu.' },
    { name: 'Individualno podešavanje', text: 'Postavljamo vaš kompletni booking sistem – prilagođen vašim uslugama, vašem timu i vašem brendu.' },
    { name: 'Finalizacija i testiranje', text: 'Dobijate gotov sistem na pregled. Tek kada je sve savršeno, sistem se konačno aktivira.' },
    { name: 'Pokretanje i kontinuirana podrška', text: 'Vaš sistem ide uživo i vaši klijenti mogu odmah online rezervisati. Ostajemo vaš kontakt za podršku i nadogradnje.' },
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
          ? 'Ihr fertiges Buchungssystem in wenigen Tagen – ohne Stress'
          : locale === 'en'
            ? 'Your finished booking system in just days – stress-free'
            : 'Vaš gotov booking sistem za samo nekoliko dana – bez stresa',
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
