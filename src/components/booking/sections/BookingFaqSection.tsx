"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const FAQ_COUNT = 9;

interface FaqFallback {
  title: string;
  subtitle: string;
  items: { question: string; answer: string }[];
}

const fallbackContent: Record<string, FaqFallback> = {
  de: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Alles, was Sie wissen müssen, bevor Ihr Buchungssystem live geht.',
    items: [
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
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know before your booking system goes live.',
    items: [
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
  },
  sr: {
    title: 'Često postavljana pitanja',
    subtitle: 'Sve što trebate znati prije nego vaš booking sistem bude aktivan.',
    items: [
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
