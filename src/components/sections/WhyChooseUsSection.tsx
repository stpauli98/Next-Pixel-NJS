"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLightbulb, FaClock, FaChartLine, FaRocket, FaUsers, FaHeadset, FaBriefcase, FaHandshake } from 'react-icons/fa';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';
import { SpinningLogos } from '../ui/spinning-logos';

const WhyChooseUsSection: React.FC = () => {
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  type IconType = typeof FaLightbulb;

  const getFallbackTitle = (index: number): string => {
    const fallbackTitles = [
      'Creativity & Innovation',
      'Fast Delivery',
      'Expert Team',
      '24/7 Support',
      'Meeting Deadlines',
      'Quality Assurance',
      'Measurable Results',
      'Client Focus',
      'Experience'
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
      'We focus on delivering measurable results that contribute to your business growth.',
      'We put client needs first and collaborate closely to achieve their goals.',
      'With over 5 years of experience, we deliver high-quality digital solutions.'
    ];
    return fallbackDescriptions[index] || '';
  };

  interface Reason {
    icon: IconType;
    titleKey: string;
    descriptionKey: string;
  }

  const reasonsData: Reason[] = [
    {
      icon: FaLightbulb,
      titleKey: 'whyChooseUs:creativity.title',
      descriptionKey: 'whyChooseUs:creativity.description'
    },
    {
      icon: FaRocket,
      titleKey: 'whyChooseUs:fastDelivery.title',
      descriptionKey: 'whyChooseUs:fastDelivery.description'
    },
    {
      icon: FaUsers,
      titleKey: 'whyChooseUs:expertTeam.title',
      descriptionKey: 'whyChooseUs:expertTeam.description'
    },
    {
      icon: FaHeadset,
      titleKey: 'whyChooseUs:support.title',
      descriptionKey: 'whyChooseUs:support.description'
    },
    {
      icon: FaClock,
      titleKey: 'whyChooseUs:deadlines.title',
      descriptionKey: 'whyChooseUs:deadlines.description'
    },
    {
      icon: FaCheckCircle,
      titleKey: 'whyChooseUs:quality.title',
      descriptionKey: 'whyChooseUs:quality.description'
    },
    {
      icon: FaChartLine,
      titleKey: 'whyChooseUs:results.title',
      descriptionKey: 'whyChooseUs:results.description'
    },
    {
      icon: FaHandshake,
      titleKey: 'whyChooseUs:clientFocus.title',
      descriptionKey: 'whyChooseUs:clientFocus.description'
    },
    {
      icon: FaBriefcase,
      titleKey: 'whyChooseUs:experience.title',
      descriptionKey: 'whyChooseUs:experience.description'
    }
  ];

  // Split reasons into left and right columns
  const leftReasons = reasonsData.slice(0, 4);
  const rightReasons = reasonsData.slice(4, 8);
  const bottomReason = reasonsData[8];

  return (
    <section id="why-choose-us" className="relative section bg-nextpixel-dark text-white py-24 md:py-32 overflow-hidden">
      {/* Gradient transition from Services (light) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-nextpixel-light/20 to-transparent pointer-events-none" />

      {/* Gradient transition to Portfolio (white) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            {!mounted ? (
              <>Why <span className="text-nextpixel-turquoise">Choose</span> Us</>
            ) : language === 'sr' && typeof t('whyChooseUs:title') === 'string' && (t('whyChooseUs:title') as string).includes('Zašto') ? (
              <>
                {(t('whyChooseUs:title') as string).split('Zašto')[0]}
                <span className="text-nextpixel-turquoise">Zašto</span>
                {(t('whyChooseUs:title') as string).split('Zašto')[1]}
              </>
            ) : language === 'de' && typeof t('whyChooseUs:title') === 'string' && (t('whyChooseUs:title') as string).includes('uns') ? (
              <>
                {(t('whyChooseUs:title') as string).split('uns')[0]}
                <span className="text-nextpixel-turquoise">uns</span>
                {(t('whyChooseUs:title') as string).split('uns')[1]}
              </>
            ) : (
              typeof t('whyChooseUs:title') === 'string' ? (
                <>
                  {(t('whyChooseUs:title') as string).split('Choose')[0]}
                  <span className="text-nextpixel-turquoise">Choose</span>
                  {(t('whyChooseUs:title') as string).split('Choose')[1]}
                </>
              ) : (
                <>Why <span className="text-nextpixel-turquoise">Choose</span> Us</>
              )
            )}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            {!mounted ?
              'We deliver exceptional digital solutions that help your business grow and succeed in the digital world.' :
              (typeof t('whyChooseUs:subtitle') === 'string' ? t('whyChooseUs:subtitle') as string : '')
            }
          </motion.p>
        </div>

        {/* Main content with spinning logos in center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center">
          {/* Left column - reasons */}
          <div className="space-y-4 order-2 lg:order-1">
            {leftReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-nextpixel-blue/20 rounded-xl border border-nextpixel-blue/30 hover:border-nextpixel-turquoise/50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-nextpixel-turquoise/20 flex items-center justify-center">
                  <Icon icon={reason.icon} size={20} className="text-nextpixel-turquoise" aria-hidden={true} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    {!mounted ?
                      getFallbackTitle(index) :
                      (typeof t(reason.titleKey) === 'string' ? t(reason.titleKey) as string : getFallbackTitle(index))
                    }
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {!mounted ?
                      getFallbackDescription(index) :
                      (typeof t(reason.descriptionKey) === 'string' ? t(reason.descriptionKey) as string : getFallbackDescription(index))
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center - Spinning logos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2 py-8 lg:py-0"
          >
            <SpinningLogos
              centerText="NextPixel"
              className="scale-90 md:scale-100"
            />
          </motion.div>

          {/* Right column - reasons */}
          <div className="space-y-4 order-3">
            {rightReasons.map((reason, index) => (
              <motion.div
                key={index + 4}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-nextpixel-blue/20 rounded-xl border border-nextpixel-blue/30 hover:border-nextpixel-turquoise/50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-nextpixel-turquoise/20 flex items-center justify-center">
                  <Icon icon={reason.icon} size={20} className="text-nextpixel-turquoise" aria-hidden={true} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    {!mounted ?
                      getFallbackTitle(index + 4) :
                      (typeof t(reason.titleKey) === 'string' ? t(reason.titleKey) as string : getFallbackTitle(index + 4))
                    }
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {!mounted ?
                      getFallbackDescription(index + 4) :
                      (typeof t(reason.descriptionKey) === 'string' ? t(reason.descriptionKey) as string : getFallbackDescription(index + 4))
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom reason card - centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto mt-8"
        >
          <div className="flex items-start gap-4 p-4 bg-nextpixel-blue/20 rounded-xl border border-nextpixel-blue/30 hover:border-nextpixel-turquoise/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-nextpixel-turquoise/20 flex items-center justify-center">
              <Icon icon={bottomReason.icon} size={20} className="text-nextpixel-turquoise" aria-hidden={true} />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">
                {!mounted ?
                  getFallbackTitle(8) :
                  (typeof t(bottomReason.titleKey) === 'string' ? t(bottomReason.titleKey) as string : getFallbackTitle(8))
                }
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {!mounted ?
                  getFallbackDescription(8) :
                  (typeof t(bottomReason.descriptionKey) === 'string' ? t(bottomReason.descriptionKey) as string : getFallbackDescription(8))
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-nextpixel-turquoise hover:bg-nextpixel-turquoise/90 text-nextpixel-dark px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            {!mounted ?
              'Let\'s Talk About Your Project' :
              (typeof t('whyChooseUs:talkAboutProject') === 'string' ? t('whyChooseUs:talkAboutProject') as string : 'Let\'s Talk About Your Project')
            }
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
