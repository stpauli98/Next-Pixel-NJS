"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLaptopCode, FaUsers, FaRocket, FaAward, FaProjectDiagram, FaHandshake, FaClock, FaHeadset } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Icon } from '../../utils/icons';
import { useTranslate } from '../../context/LanguageContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Animated counter component
const AnimatedCounter = ({ value, isInView }: { value: string; isInView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const isNumeric = !isNaN(numericValue) && value !== '24/7';

  useEffect(() => {
    if (!isInView || !isNumeric || hasAnimated) return;

    setHasAnimated(true);
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, numericValue, isNumeric, hasAnimated]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return <span>{displayValue}+</span>;
};

// Stat card component
const StatCard = ({ value, label, icon, index }: { value: string; label: string; icon: IconType; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="w-14 h-14 rounded-full bg-nextpixel-light flex items-center justify-center mb-4">
        <Icon icon={icon} size={24} className="text-nextpixel-blue" aria-hidden={true} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-nextpixel-dark mb-2">
        <AnimatedCounter value={value} isInView={isInView} />
      </div>
      <p className="text-sm text-nextpixel-gray">{label}</p>
    </motion.div>
  );
};

// Feature item component
const FeatureItem = ({
  icon,
  title,
  description,
  index,
  isReversed
}: {
  icon: IconType;
  title: string;
  description: string;
  index: number;
  isReversed: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "flex items-start gap-4 p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all",
        isReversed && "md:flex-row-reverse md:text-right"
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-nextpixel-light flex items-center justify-center">
        <Icon icon={icon} size={24} className="text-nextpixel-blue" aria-hidden={true} />
      </div>
      <div>
        <h4 className="font-bold text-lg text-nextpixel-dark mb-2">{title}</h4>
        <p className="text-nextpixel-gray text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { t, language } = useTranslate();

  // Postavljanje mounted na true nakon inicijalne hidratacije
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: FaLaptopCode,
      title: typeof t('about:features.expertise.title') === 'string' ? t('about:features.expertise.title') as string : '',
      description: typeof t('about:features.expertise.description') === 'string' ? t('about:features.expertise.description') as string : ''
    },
    {
      icon: FaUsers,
      title: typeof t('about:features.userFocus.title') === 'string' ? t('about:features.userFocus.title') as string : '',
      description: typeof t('about:features.userFocus.description') === 'string' ? t('about:features.userFocus.description') as string : ''
    },
    {
      icon: FaRocket,
      title: typeof t('about:features.fastDelivery.title') === 'string' ? t('about:features.fastDelivery.title') as string : '',
      description: typeof t('about:features.fastDelivery.description') === 'string' ? t('about:features.fastDelivery.description') as string : ''
    },
    {
      icon: FaAward,
      title: typeof t('about:features.quality.title') === 'string' ? t('about:features.quality.title') as string : '',
      description: typeof t('about:features.quality.description') === 'string' ? t('about:features.quality.description') as string : ''
    }
  ];

  const stats = [
    {
      icon: FaProjectDiagram,
      value: typeof t('about:stats.projects.value') === 'string' ? t('about:stats.projects.value') as string : '50',
      label: typeof t('about:stats.projects.label') === 'string' ? t('about:stats.projects.label') as string : 'Projects'
    },
    {
      icon: FaHandshake,
      value: typeof t('about:stats.clients.value') === 'string' ? t('about:stats.clients.value') as string : '40',
      label: typeof t('about:stats.clients.label') === 'string' ? t('about:stats.clients.label') as string : 'Clients'
    },
    {
      icon: FaClock,
      value: typeof t('about:stats.experience.value') === 'string' ? t('about:stats.experience.value') as string : '5',
      label: typeof t('about:stats.experience.label') === 'string' ? t('about:stats.experience.label') as string : 'Years'
    },
    {
      icon: FaHeadset,
      value: typeof t('about:stats.support.value') === 'string' ? t('about:stats.support.value') as string : '24/7',
      label: typeof t('about:stats.support.label') === 'string' ? t('about:stats.support.label') as string : 'Support'
    }
  ];

  return (
    <section id="about" className="relative section bg-gradient-to-b from-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Static background elements - no parallax */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-nextpixel-turquoise/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-nextpixel-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-nextpixel-turquoise/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-nextpixel-dark"
          >
            {typeof t('about:title') === 'string' && (t('about:title') as string).includes('Ko smo mi') ? (
              <>
                Ko smo <span className="text-nextpixel-blue">mi</span>
              </>
            ) : typeof t('about:title') === 'string' && (t('about:title') as string).includes('Wer wir sind') ? (
              <>
                Wer wir <span className="text-nextpixel-blue">sind</span>
              </>
            ) : typeof t('about:title') === 'string' && (t('about:title') as string).includes('Who We Are') ? (
              <>
                Who We <span className="text-nextpixel-blue">Are</span>
              </>
            ) : (
              t('about:title')
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
            className="text-lg text-nextpixel-gray max-w-3xl mx-auto"
          >
            {typeof t('about:description') === 'string' ? t('about:description') as string : ''}
          </motion.p>
        </div>

        {/* Main content - Image and text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-nextpixel-turquoise rounded-lg opacity-20 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-nextpixel-blue rounded-lg opacity-20 -z-10" />

              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/team.webp"
                  alt="NextPixel Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-nextpixel-dark/20 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-nextpixel-dark">
              {typeof t('about:subtitle') === 'string' ? t('about:subtitle') as string : ''}
            </h3>
            <p className="text-nextpixel-gray mb-6 leading-relaxed">
              {typeof t('about:history') === 'string' ? t('about:history') as string : ''}
            </p>
            <p className="text-nextpixel-gray leading-relaxed">
              {typeof t('about:philosophy') === 'string' ? t('about:philosophy') as string : ''}
            </p>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>

        {/* Features grid */}
        <div className="mb-20 md:mb-28">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-nextpixel-dark"
          >
            {language === 'sr' ? 'Zašto mi?' : language === 'de' ? 'Warum wir?' : 'Why Us?'}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-nextpixel-dark to-nextpixel-blue rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden"
        >
          {/* CTA background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-nextpixel-turquoise/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {typeof t('about:cta.title') === 'string' ? t('about:cta.title') as string : 'Ready to Transform Your Business?'}
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              {typeof t('about:cta.description') === 'string' ? t('about:cta.description') as string : 'Let\'s discuss how we can help your business grow.'}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-nextpixel-turquoise hover:bg-nextpixel-turquoise/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              {typeof t('about:cta.button') === 'string' ? t('about:cta.button') as string : 'Get Started'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
