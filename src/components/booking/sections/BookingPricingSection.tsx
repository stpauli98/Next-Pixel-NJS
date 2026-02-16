"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { StarButton } from '@/components/ui/star-button';
import { FaCheck } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const BookingPricingSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingPricing');
  const mounted = isHydrated && isReady;

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
            {mounted ? t('title') : 'Transparente Preise'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {mounted ? t('subtitle') : 'Wählen Sie das Paket, das zu Ihrem Unternehmen passt.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map(({ index, popular }) => {
            const isPopular = mounted ? t(`packages.${index}.popular`) === 'true' : popular;

            return (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl p-8 ${
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
                    {mounted ? t(`packages.${index}.cta`) : 'Beliebteste Wahl'}
                  </div>
                )}

                <h3 className="text-xl font-bold text-nextpixel-dark mb-2">
                  {mounted ? t(`packages.${index}.name`) : ''}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-nextpixel-blue">
                    {mounted ? t(`packages.${index}.price`) : ''}
                  </span>
                  {mounted && t(`packages.${index}.currency`) && (
                    <span className="text-gray-500 ml-1">
                      {t(`packages.${index}.currency`)}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {mounted ? t(`packages.${index}.description`) : ''}
                </p>

                <ul className="space-y-3 mb-8">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((featureIndex) => {
                    const feature = mounted ? t(`packages.${index}.features.${featureIndex}`) : '';
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
                  className="w-full justify-center"
                  {...(isPopular ? {} : { lightColor: '#1E3A5F', backgroundColor: '#2E8B9A' })}
                >
                  {mounted && !isPopular ? t(`packages.${index}.cta`) : (isPopular ? (mounted ? t(`packages.${index}.cta`) : '') : '')}
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
          {mounted ? t('note') : ''}
        </motion.p>
      </div>
    </section>
  );
};

export default BookingPricingSection;
