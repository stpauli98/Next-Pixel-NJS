"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLightbulb, FaClock, FaChartLine, FaRocket, FaUsers, FaHeadset } from 'react-icons/fa';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const WhyChooseUsSection: React.FC = () => {
  const { t, language } = useTranslate();
  type IconType = typeof FaLightbulb;

  interface Reason {
    icon: IconType;
    titleKey: string;
    descriptionKey: string;
  }

  // Definišemo razloge sa ključevima prevoda umesto direktnih prevoda
  const reasonsData: Reason[] = [
    {
      icon: FaLightbulb,
      titleKey: 'whyChooseUs.creativity.title',
      descriptionKey: 'whyChooseUs.creativity.description'
    },
    {
      icon: FaRocket,
      titleKey: 'whyChooseUs.fastDelivery.title',
      descriptionKey: 'whyChooseUs.fastDelivery.description'
    },
    {
      icon: FaUsers,
      titleKey: 'whyChooseUs.expertTeam.title',
      descriptionKey: 'whyChooseUs.expertTeam.description'
    },
    {
      icon: FaHeadset,
      titleKey: 'whyChooseUs.support.title',
      descriptionKey: 'whyChooseUs.support.description'
    },
    {
      icon: FaClock,
      titleKey: 'whyChooseUs.deadlines.title',
      descriptionKey: 'whyChooseUs.deadlines.description'
    },
    {
      icon: FaCheckCircle,
      titleKey: 'whyChooseUs.quality.title',
      descriptionKey: 'whyChooseUs.quality.description'
    },
    {
      icon: FaChartLine,
      titleKey: 'whyChooseUs.results.title',
      descriptionKey: 'whyChooseUs.results.description'
    }
  ];

  return (
    <section id="why-choose-us" className="section bg-nextpixel-dark text-white py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        {language === 'sr' && typeof t('whyChooseUs.title') === 'string' && (t('whyChooseUs.title') as string).includes('Zašto') ? (
          <>
            {(t('whyChooseUs.title') as string).split('Zašto')[0]}
            <span className="text-nextpixel-blue">Zašto</span>
            {(t('whyChooseUs.title') as string).split('Zašto')[1]}
          </>
        ) : language === 'de' && typeof t('whyChooseUs.title') === 'string' && (t('whyChooseUs.title') as string).includes('uns') ? (
          <>
            {(t('whyChooseUs.title') as string).split('uns')[0]}
            <span className="text-nextpixel-turquoise">uns</span>
            {(t('whyChooseUs.title') as string).split('uns')[1]}
          </>
        ) : (
          t('whyChooseUs.title')
        )}
      </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6"
          ></motion.div>
          <p className="text-lg text-nextpixel-gray max-w-3xl mx-auto mb-16">
        {typeof t('whyChooseUs.subtitle') === 'string' ? t('whyChooseUs.subtitle') as string : ''}
      </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {reasonsData.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-nextpixel-blue bg-opacity-30 rounded-lg p-8 border border-nextpixel-blue border-opacity-20 hover:border-nextpixel-turquoise transition-colors"
            >
              <div className="text-nextpixel-turquoise mb-4">
                <Icon icon={reason.icon} size={36} aria-hidden={true} />
              </div>
              <h3 className="text-xl font-bold mb-3">{typeof t(reason.titleKey) === 'string' ? t(reason.titleKey) as string : ''}</h3>
              <p className="text-nextpixel-gray">{typeof t(reason.descriptionKey) === 'string' ? t(reason.descriptionKey) as string : ''}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-secondary inline-block">
            {t('whyChooseUs.talkAboutProject')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
