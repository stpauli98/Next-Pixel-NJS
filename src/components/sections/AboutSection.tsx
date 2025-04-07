"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaUsers, FaRocket, FaAward } from 'react-icons/fa';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';


const AboutSection: React.FC = () => {
  const { t } = useTranslate();
  const features = [
    {
      icon: FaLaptopCode,
      title: t('features.expertise.title'),
      description: t('features.expertise.description')
    },
    {
      icon: FaUsers,
      title: t('features.userFocus.title'),
      description: t('features.userFocus.description')
    },
    {
      icon: FaRocket,
      title: t('features.fastDelivery.title'),
      description: t('features.fastDelivery.description')
    },
    {
      icon: FaAward,
      title: t('features.quality.title'),
      description: t('features.quality.description')
    }
  ];

  return (
    <section id="about" className="section bg-white py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('about.title').includes('O nama') ? (
              <>
                O na<span className="text-nextpixel-blue">ma</span>
              </>
            ) : t('about.title').includes('Wer wir sind') ? (
              <>
                Wer wir <span className="text-nextpixel-blue">sind</span>
              </>
            ) : (
              t('about.title')
            )}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-nextpixel-gray max-w-3xl mx-auto"
          >
            {t('about.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-nextpixel-turquoise rounded-lg opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-nextpixel-blue rounded-lg opacity-20"></div>
              <img 
                src="/about-image.jpg" 
                alt="NextPixel Team" 
                className="relative z-10 rounded-lg shadow-xl w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/600x400/0A2463/FFFFFF?text=NextPixel+Team";
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">{t('about.subtitle')}</h3>
            <p className="text-nextpixel-gray mb-6">
              {t('about.history')}
            </p>
            <p className="text-nextpixel-gray mb-8">
              {t('about.philosophy')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="mr-4 text-nextpixel-blue">
                    <Icon icon={feature.icon} size={24} aria-hidden={true} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-nextpixel-gray">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
