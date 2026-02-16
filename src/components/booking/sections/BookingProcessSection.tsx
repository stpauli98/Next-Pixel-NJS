"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';

const BookingProcessSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingProcess');
  const mounted = isHydrated && isReady;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

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
            {mounted ? t('title') : 'In 4 Schritten zu Ihrem Buchungssystem'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {mounted ? t('subtitle') : 'Ein klarer, transparenter Prozess.'}
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
              {/* Step number */}
              <div className="text-6xl font-bold text-nextpixel-blue/10 mb-4">
                {mounted ? t(`steps.${index}.step`) : `0${index + 1}`}
              </div>
              <h3 className="text-xl font-bold text-nextpixel-dark mb-3">
                {mounted ? t(`steps.${index}.title`) : ''}
              </h3>
              <p className="text-gray-600">
                {mounted ? t(`steps.${index}.description`) : ''}
              </p>

              {/* Connector line (not on last) */}
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
