"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLightbulb, FaClock, FaChartLine, FaRocket, FaUsers, FaHeadset } from 'react-icons/fa';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const WhyChooseUsSection: React.FC = () => {
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);

  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);
  type IconType = typeof FaLightbulb;

  // Fallback funkcije za slučaj da prevodi nisu dostupni
  const getFallbackTitle = (index: number): string => {
    const fallbackTitles = [
      'Creativity & Innovation',
      'Fast Delivery',
      'Expert Team',
      '24/7 Support',
      'Meeting Deadlines',
      'Quality Assurance',
      'Measurable Results'
    ];
    return fallbackTitles[index] || '';
  };

  const getFallbackDescription = (index: number): string => {
    const fallbackDescriptions = [
      'We bring innovative ideas and creative solutions to every project we work on.',
      'We deliver projects quickly without compromising on quality or attention to detail.',
      'Our team consists of experienced professionals with expertise in various fields.',
      'We provide continuous support and are always available to address your concerns.',
      'We value your time and always strive to complete projects within agreed timeframes.',
      'Quality is our priority, and we ensure that every project meets the highest standards.',
      'We focus on delivering measurable results that contribute to your business growth.'
    ];
    return fallbackDescriptions[index] || '';  
  };

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
            {!mounted ? (
              <>Why <span className="text-nextpixel-turquoise">Choose</span> Us</>  
            ) : language === 'sr' && typeof t('whyChooseUs.title') === 'string' && (t('whyChooseUs.title') as string).includes('Zašto') ? (
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
              typeof t('whyChooseUs.title') === 'string' ? (
                <>
                  {(t('whyChooseUs.title') as string).split('Choose')[0]}
                  <span className="text-nextpixel-turquoise">Choose</span>
                  {(t('whyChooseUs.title') as string).split('Choose')[1]}
                </>
              ) : (
                <>Why <span className="text-nextpixel-turquoise">Choose</span> Us</>
              )
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
            {!mounted ? 
              'We deliver exceptional digital solutions that help your business grow and succeed in the digital world.' :
              (typeof t('whyChooseUs.subtitle') === 'string' ? t('whyChooseUs.subtitle') as string : '')
            }
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
              <h3 className="text-xl font-bold mb-3">
                {!mounted ? 
                  getFallbackTitle(index) :
                  (typeof t(reason.titleKey) === 'string' ? t(reason.titleKey) as string : getFallbackTitle(index))
                }
              </h3>
              <p className="text-nextpixel-gray">
                {!mounted ? 
                  getFallbackDescription(index) :
                  (typeof t(reason.descriptionKey) === 'string' ? t(reason.descriptionKey) as string : getFallbackDescription(index))
                }
              </p>
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
            {!mounted ? 
              'Let\'s Talk About Your Project' :
              (typeof t('whyChooseUs.talkAboutProject') === 'string' ? t('whyChooseUs.talkAboutProject') as string : 'Let\'s Talk About Your Project')
            }
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
