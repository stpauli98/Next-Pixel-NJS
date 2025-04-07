"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaShoppingCart, FaSearch, FaServer, FaCode, FaMobileAlt } from 'react-icons/fa';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const ServicesSection: React.FC = () => {
  const { t } = useTranslate();
  type IconType = typeof FaDesktop;

interface Service {
  icon: IconType;
  title: string;
  description: string;
}

const services: Service[] = [
    {
      icon: FaDesktop,
      title: t('services.webDesign.title'),
      description: t('services.webDesign.description')
    },
    {
      icon: FaShoppingCart,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description')
    },
    {
      icon: FaSearch,
      title: t('services.seo.title'),
      description: t('services.seo.description')
    },
    {
      icon: FaServer,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description')
    },
    {
      icon: FaCode,
      title: t('services.development.title'),
      description: t('services.development.description')
    },
    {
      icon: FaMobileAlt,
      title: t('services.responsive.title'),
      description: t('services.responsive.description')
    }
  ];

  return (
    <section id="services" className="section bg-nextpixel-light py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('services.title').includes('usluge') ? (
              <>
                {t('services.title').split('usluge')[0]}
                <span className="text-nextpixel-blue">usluge</span>
                {t('services.title').split('usluge')[1]}
              </>
            ) : t('services.title').includes('Dienstleistungen') ? (
              <>
                {t('services.title').split('Dienstleistungen')[0]}
                <span className="text-nextpixel-blue">Dienstleistungen</span>
                {t('services.title').split('Dienstleistungen')[1]}
              </>
            ) : (
              <>
                {t('services.title').split(' ')[0]} <span className="text-nextpixel-blue">{t('services.title').split(' ').slice(1).join(' ')}</span>
              </>
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
            {t('services.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-nextpixel-blue mb-4">
                <Icon icon={service.icon} size={36} aria-hidden={true} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-nextpixel-gray">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-24"
        >
          <a 
            href="#contact" 
            className="btn-primary inline-block px-8 py-4 text-white bg-nextpixel-blue hover:bg-blue-700 rounded-full font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
            {t('services.requestQuote')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
