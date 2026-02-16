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
    title: 'Alles, was Ihr Buchungssystem braucht',
    subtitle: 'Moderne Funktionen, die Ihre Kunden lieben und Ihr Team entlasten.',
    items: [
      { title: 'Online-Terminbuchung', description: 'Kunden buchen Termine direkt auf Ihrer Website - 24/7, ohne Anruf. Einfache Kalenderansicht mit Echtzeit-Verf\u00FCgbarkeit.' },
      { title: 'Automatische Erinnerungen', description: 'Reduzieren Sie No-Shows um bis zu 80% mit automatischen E-Mail- und SMS-Erinnerungen vor jedem Termin.' },
      { title: 'Kalender-Synchronisation', description: 'Nahtlose Integration mit Google Calendar, Outlook und Apple Calendar. Ihre Termine immer im Blick.' },
      { title: 'Online-Zahlung', description: 'Integrierte Zahlungsabwicklung mit Stripe, PayPal oder Klarna. Anzahlungen und Vorauszahlungen leicht gemacht.' },
      { title: 'Dashboard & Analytics', description: '\u00DCbersichtliches Dashboard mit Statistiken zu Buchungen, Auslastung und Umsatz. Datenbasierte Entscheidungen treffen.' },
      { title: 'Responsive Design', description: 'Optimiert f\u00FCr alle Ger\u00E4te. Ihre Kunden buchen bequem vom Smartphone, Tablet oder Desktop.' },
      { title: 'Mehrsprachig', description: 'Erreichen Sie internationale Kunden mit automatischer Spracherkennung und mehrsprachiger Oberfl\u00E4che.' },
      { title: 'DSGVO-konform', description: 'Volle Datenschutzkonformit\u00E4t nach DSGVO. Sichere Datenspeicherung und transparente Datenverarbeitung.' },
    ],
  },
  en: {
    title: 'Everything Your Booking System Needs',
    subtitle: 'Modern features that your customers love and that relieve your team.',
    items: [
      { title: 'Online Appointment Booking', description: 'Customers book appointments directly on your website - 24/7, no phone call needed. Simple calendar view with real-time availability.' },
      { title: 'Automatic Reminders', description: 'Reduce no-shows by up to 80% with automatic email and SMS reminders before each appointment.' },
      { title: 'Calendar Sync', description: 'Seamless integration with Google Calendar, Outlook and Apple Calendar. Your appointments always in view.' },
      { title: 'Online Payment', description: 'Integrated payment processing with Stripe, PayPal or Klarna. Deposits and prepayments made easy.' },
      { title: 'Dashboard & Analytics', description: 'Clear dashboard with statistics on bookings, utilization and revenue. Make data-driven decisions.' },
      { title: 'Responsive Design', description: 'Optimized for all devices. Your customers book conveniently from smartphone, tablet or desktop.' },
      { title: 'Multilingual', description: 'Reach international customers with automatic language detection and multilingual interface.' },
      { title: 'GDPR Compliant', description: 'Full data protection compliance. Secure data storage and transparent data processing.' },
    ],
  },
  sr: {
    title: 'Sve \u0161to va\u0161 booking sistem treba',
    subtitle: 'Moderne funkcije koje va\u0161i klijenti vole i koje rastere\u0107uju va\u0161 tim.',
    items: [
      { title: 'Online zakazivanje termina', description: 'Klijenti zakazuju termine direktno na va\u0161oj web stranici - 24/7, bez telefonskog poziva. Jednostavan kalendar sa dostupno\u0161\u0107u u realnom vremenu.' },
      { title: 'Automatski podsjetnici', description: 'Smanjite izostanke do 80% sa automatskim email i SMS podsjetnicima prije svakog termina.' },
      { title: 'Sinhronizacija kalendara', description: 'Integracija sa Google Calendar, Outlook i Apple Calendar. Va\u0161i termini uvijek na jednom mjestu.' },
      { title: 'Online pla\u0107anje', description: 'Integrisana obrada pla\u0107anja sa Stripe, PayPal ili Klarna. Depoziti i avansna pla\u0107anja bez komplikacija.' },
      { title: 'Dashboard i analitika', description: 'Pregledna kontrolna tabla sa statistikama o rezervacijama, popunjenosti i prihodima.' },
      { title: 'Responsive dizajn', description: 'Optimizovano za sve ure\u0111aje. Va\u0161i klijenti rezervi\u0161u sa telefona, tableta ili ra\u010Dunara.' },
      { title: 'Vi\u0161ejezi\u010Dno', description: 'Dosegnite me\u0111unarodne klijente sa automatskom detekcijom jezika i vi\u0161ejezi\u010Dnim interfejsom.' },
      { title: 'GDPR uskladenost', description: 'Potpuna uskladenost sa za\u0161titom podataka. Sigurno skladi\u0161tenje i transparentna obrada podataka.' },
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
