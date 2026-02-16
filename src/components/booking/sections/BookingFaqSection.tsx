"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientTranslation } from '@/hooks/useClientTranslation';
import { FaChevronDown } from 'react-icons/fa6';
import { Icon } from '@/utils/icons';

const FAQ_COUNT = 8;

const BookingFaqSection: React.FC = () => {
  const { t, isHydrated, isReady } = useClientTranslation('bookingFaq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const mounted = isHydrated && isReady;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            {mounted ? t('title') : 'Häufig gestellte Fragen'}
          </h2>
          <p className="text-gray-600">
            {mounted ? t('subtitle') : 'Antworten auf die wichtigsten Fragen.'}
          </p>
        </motion.div>

        <div className="space-y-4">
          {Array.from({ length: FAQ_COUNT }).map((_, index) => {
            const question = mounted ? t(`items.${index}.question`) : '';
            const answer = mounted ? t(`items.${index}.answer`) : '';
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
                  <span className="font-medium text-nextpixel-dark pr-4">{question}</span>
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
