"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaShoppingCart, FaSearch, FaServer, FaCode, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import { FaMobileScreen, FaMagnifyingGlass, FaPalette } from 'react-icons/fa6';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';

const ServicesSection: React.FC = () => {
  const { t, language } = useTranslate();
  type IconType = typeof FaDesktop;

interface Service {
  icon: IconType;
  title: string;
  description: string;
}

const services: Service[] = [
    {
      icon: FaLaptopCode,
      title: typeof t('services.webDevelopment.title') === 'string' ? t('services.webDevelopment.title') as string : 'Web Development',
      description: typeof t('services.webDevelopment.description') === 'string' ? t('services.webDevelopment.description') as string : ''
    },
    {
      icon: FaMobileScreen,
      title: typeof t('services.mobileDevelopment.title') === 'string' ? t('services.mobileDevelopment.title') as string : 'Mobile Development',
      description: typeof t('services.mobileDevelopment.description') === 'string' ? t('services.mobileDevelopment.description') as string : ''
    },
    {
      icon: FaShoppingCart,
      title: typeof t('services.ecommerce.title') === 'string' ? t('services.ecommerce.title') as string : 'E-commerce',
      description: typeof t('services.ecommerce.description') === 'string' ? t('services.ecommerce.description') as string : ''
    },
    {
      icon: FaMagnifyingGlass,
      title: typeof t('services.seo.title') === 'string' ? t('services.seo.title') as string : 'SEO',
      description: typeof t('services.seo.description') === 'string' ? t('services.seo.description') as string : ''
    },
    {
      icon: FaPalette,
      title: typeof t('services.design.title') === 'string' ? t('services.design.title') as string : 'Design',
      description: typeof t('services.design.description') === 'string' ? t('services.design.description') as string : ''
    },
    {
      icon: FaMobileAlt,
      title: typeof t('services.responsive.title') === 'string' ? t('services.responsive.title') as string : 'Responsive Design',
      description: typeof t('services.responsive.description') === 'string' ? t('services.responsive.description') as string : ''
    }
  ];

  return (
    <section id="services" className="section bg-nextpixel-light py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        {typeof t('services.title') === 'string' && (t('services.title') as string).includes('Usluge') ? (
          <>
            {(t('services.title') as string).split('Usluge')[0]}
            <span className="text-nextpixel-turquoise">Usluge</span>
            {(t('services.title') as string).split('Usluge')[1]}
          </>
        ) : typeof t('services.title') === 'string' && (t('services.title') as string).includes('Services') ? (
          <>
            {(t('services.title') as string).split('Services')[0]}
            <span className="text-nextpixel-turquoise">Services</span>
            {(t('services.title') as string).split('Services')[1]}
          </>
        ) : (
          t('services.title')
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
        {typeof t('services.subtitle') === 'string' ? t('services.subtitle') as string : ''}
      </p>
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
