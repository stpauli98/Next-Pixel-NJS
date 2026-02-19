"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { usePathname } from 'next/navigation';
import { FaCalendarCheck, FaBell, FaCalendarDays, FaCreditCard, FaChartLine, FaMobileScreen, FaGlobe, FaShieldHalved } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const featureIcons = [FaCalendarCheck, FaBell, FaCalendarDays, FaCreditCard, FaChartLine, FaMobileScreen, FaGlobe, FaShieldHalved];

const fallbackContent: Record<string, {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
}> = {
  de: {
    title: 'Alles, was Sie brauchen, um mehr Kunden zu gewinnen und Zeit zu sparen',
    subtitle: 'Automatisieren Sie Ihre Terminbuchung, reduzieren Sie Ausfälle und steigern Sie Ihren Umsatz – vollständig automatisch.',
    items: [
      { title: 'Online-Terminbuchung rund um die Uhr', description: 'Ihre Kunden buchen Termine jederzeit selbst – auch außerhalb der Öffnungszeiten. Gewinnen Sie neue Kunden, ohne einen einzigen Anruf entgegenzunehmen.' },
      { title: 'Automatische Erinnerungen reduzieren Ausfälle', description: 'Reduzieren Sie Terminausfälle um bis zu 80% mit automatischen SMS- und E-Mail-Erinnerungen. Weniger leere Termine, mehr Umsatz.' },
      { title: 'Alle Termine automatisch synchronisiert', description: 'Alle Buchungen werden automatisch mit Ihrem Google, Apple oder Outlook Kalender synchronisiert. Keine Doppelbuchungen, kein Chaos.' },
      { title: 'Online-Zahlung und Anzahlungen', description: 'Akzeptieren Sie Anzahlungen oder vollständige Vorauszahlungen online. Sichern Sie Ihre Termine ab und vermeiden Sie Ausfälle.' },
      { title: 'Übersichtliches Dashboard mit klaren Zahlen', description: 'Sehen Sie sofort, wie viele Buchungen Sie haben, wie ausgelastet Ihr Team ist und wie sich Ihr Umsatz entwickelt.' },
      { title: 'Perfekt für Smartphone und Desktop', description: 'Über 80% Ihrer Kunden buchen über das Smartphone. Ihr Buchungssystem funktioniert perfekt auf allen Geräten.' },
      { title: 'Mehr Kunden durch mehrsprachige Buchung', description: 'Erreichen Sie internationale Kunden mit automatischer Spracherkennung und professioneller mehrsprachiger Oberfläche.' },
      { title: '100% DSGVO-konform und sicher', description: 'Alle Daten werden sicher gespeichert und vollständig DSGVO-konform verarbeitet. Maximale Sicherheit für Sie und Ihre Kunden.' },
    ],
  },
  en: {
    title: 'Everything you need to win more customers and save time',
    subtitle: 'Automate your appointment booking, reduce no-shows, and increase your revenue – fully automatically.',
    items: [
      { title: '24/7 online appointment booking', description: 'Your customers book appointments anytime – even outside business hours. Win new customers without answering a single phone call.' },
      { title: 'Automatic reminders reduce no-shows', description: 'Reduce no-shows by up to 80% with automatic SMS and email reminders. Fewer empty slots, more revenue.' },
      { title: 'All appointments automatically synced', description: 'All bookings are automatically synced with your Google, Apple, or Outlook calendar. No double bookings, no chaos.' },
      { title: 'Online payments and deposits', description: 'Accept deposits or full prepayments online. Secure your appointments and avoid cancellations.' },
      { title: 'Clear dashboard with real numbers', description: 'See instantly how many bookings you have, how busy your team is, and how your revenue is growing.' },
      { title: 'Perfect on smartphone and desktop', description: 'Over 80% of your customers book via smartphone. Your booking system works perfectly on all devices.' },
      { title: 'More customers through multilingual booking', description: 'Reach international customers with automatic language detection and a professional multilingual interface.' },
      { title: '100% GDPR compliant and secure', description: 'All data is stored securely and processed in full GDPR compliance. Maximum security for you and your customers.' },
    ],
  },
  sr: {
    title: 'Sve što vam treba da osvojite više klijenata i uštedite vrijeme',
    subtitle: 'Automatizujte zakazivanje termina, smanjite izostanke i povećajte prihod – potpuno automatski.',
    items: [
      { title: 'Online zakazivanje termina 24/7', description: 'Vaši klijenti zakazuju termine u bilo koje doba – čak i van radnog vremena. Osvojite nove klijente bez odgovaranja na ijedan telefonski poziv.' },
      { title: 'Automatski podsjetnici smanjuju izostanke', description: 'Smanjite propuštene termine za do 80% sa automatskim SMS i email podsjetnicima. Manje praznih termina, više prihoda.' },
      { title: 'Svi termini automatski sinhronizovani', description: 'Sve rezervacije se automatski sinhronizuju sa vašim Google, Apple ili Outlook kalendarom. Bez duplih rezervacija, bez haosa.' },
      { title: 'Online plaćanje i depoziti', description: 'Prihvatajte depozite ili kompletna avansna plaćanja online. Osigurajte svoje termine i izbjegnite otkazivanja.' },
      { title: 'Pregledan dashboard sa jasnim brojevima', description: 'Vidite odmah koliko rezervacija imate, koliko je vaš tim zauzet i kako vam raste prihod.' },
      { title: 'Savršeno na telefonu i računaru', description: 'Preko 80% vaših klijenata rezerviše putem telefona. Vaš booking sistem radi savršeno na svim uređajima.' },
      { title: 'Više klijenata kroz višejezično bukiranje', description: 'Dosegnite međunarodne klijente sa automatskom detekcijom jezika i profesionalnim višejezičnim interfejsom.' },
      { title: '100% GDPR usklađeno i sigurno', description: 'Svi podaci se čuvaju sigurno i obrađuju u potpunoj GDPR usklađenosti. Maksimalna sigurnost za vas i vaše klijente.' },
    ],
  },
};

const BookingFeaturesSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingFeatures');
  const pathname = usePathname();

  const getLangFromPath = (): string => {
    const segments = pathname?.split('/') || [];
    for (const seg of segments) {
      if (['sr', 'en', 'de'].includes(seg)) return seg;
    }
    return 'de';
  };

  const currentLang = getLangFromPath();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

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
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-4">
              {fb.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {fb.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureIcons.map((IconComponent, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-nextpixel-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon icon={IconComponent} className="text-nextpixel-blue" size={24} aria-hidden={true} />
                </div>
                <h3 className="text-lg font-bold text-nextpixel-dark mb-2">
                  {fb.items[index].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {fb.items[index].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="py-20 bg-gray-50">
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featureIcons.map((IconComponent, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-nextpixel-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Icon icon={IconComponent} className="text-nextpixel-blue" size={24} aria-hidden={true} />
              </div>
              <h3 className="text-lg font-bold text-nextpixel-dark mb-2">
                {t(`items.${index}.title`)}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(`items.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFeaturesSection;
