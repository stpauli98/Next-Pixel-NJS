"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { FaCalendarCheck, FaBell, FaCalendarDays, FaCreditCard, FaChartLine, FaMobileScreen, FaGlobe, FaShieldHalved } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const featureIcons = [FaCalendarCheck, FaBell, FaCalendarDays, FaCreditCard, FaChartLine, FaMobileScreen, FaGlobe, FaShieldHalved];

const BookingFeaturesSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingFeatures');
  const mounted = isHydrated && isReady;

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
            {mounted ? t('title') : 'Alles, was Ihr Buchungssystem braucht'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {mounted ? t('subtitle') : 'Moderne Funktionen, die Ihre Kunden lieben und Ihr Team entlasten.'}
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
                {mounted ? t(`items.${index}.title`) : ''}
              </h3>
              <p className="text-gray-600 text-sm">
                {mounted ? t(`items.${index}.description`) : ''}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFeaturesSection;
