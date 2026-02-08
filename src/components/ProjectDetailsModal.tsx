"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslate } from '../context/LanguageContext';
import { ContainerScroll } from './ui/ContainerScrollAnimation';
import { Spinner } from './ui/ios-spinner';
import { StarButton } from '@/components/ui/star-button';

interface ProjectDetailsModalProps {
  project: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    url?: string;
    technologies?: string[];
    features?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, isOpen, onClose }) => {
  const { t, language } = useTranslate();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const savedStyles = useRef({ html: '', body: '' });

  // Reset loading state when project changes
  useEffect(() => {
    if (project) {
      setImageLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [language]);

  // ESC key to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);

      const html = document.documentElement;
      const body = document.body;

      // Save original styles
      savedStyles.current = {
        html: html.style.cssText,
        body: body.style.cssText
      };

      // Simple scroll lock - no position:fixed, so no scroll jump on close
      // The modal is position:fixed and covers viewport, so background is hidden
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);

        // Restore original styles - scroll position is unchanged
        html.style.cssText = savedStyles.current.html;
        body.style.cssText = savedStyles.current.body;
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  // Get translated feature text
  const getFeatureText = (feature: string, projectId: number): string => {
    if (projectId === 1) {
      if (feature.toLowerCase().includes('kreiranje') || feature.toLowerCase().includes('create'))
        return typeof t('portfolio:features.createEvent') === 'string' ? t('portfolio:features.createEvent') as string : feature;
      if (feature.toLowerCase().includes('dijeljenje') || feature.toLowerCase().includes('share'))
        return typeof t('portfolio:features.shareLink') === 'string' ? t('portfolio:features.shareLink') as string : feature;
      if (feature.toLowerCase().includes('prikupljanje') || feature.toLowerCase().includes('collect'))
        return typeof t('portfolio:features.collectPhotos') === 'string' ? t('portfolio:features.collectPhotos') as string : feature;
      if (feature.toLowerCase().includes('pregled') || feature.toLowerCase().includes('view'))
        return typeof t('portfolio:features.viewPhotos') === 'string' ? t('portfolio:features.viewPhotos') as string : feature;
      if (feature.toLowerCase().includes('preuzimanje') || feature.toLowerCase().includes('download'))
        return typeof t('portfolio:features.downloadPhotos') === 'string' ? t('portfolio:features.downloadPhotos') as string : feature;
      if (feature.toLowerCase().includes('responzivan') || feature.toLowerCase().includes('responsive'))
        return typeof t('portfolio:features.responsive') === 'string' ? t('portfolio:features.responsive') as string : feature;
    } else if (projectId === 2) {
      if (feature.toLowerCase().includes('hero'))
        return typeof t('portfolio:features.heroSection') === 'string' ? t('portfolio:features.heroSection') as string : feature;
      if (feature.toLowerCase().includes('događaji') || feature.toLowerCase().includes('events'))
        return typeof t('portfolio:features.events') === 'string' ? t('portfolio:features.events') as string : feature;
      if (feature.toLowerCase().includes('galerija') || feature.toLowerCase().includes('gallery'))
        return typeof t('portfolio:features.gallery') === 'string' ? t('portfolio:features.gallery') as string : feature;
      if (feature.toLowerCase().includes('meni') || feature.toLowerCase().includes('menu'))
        return typeof t('portfolio:features.menuWithPrices') === 'string' ? t('portfolio:features.menuWithPrices') as string : feature;
      if (feature.toLowerCase().includes('kontakt') || feature.toLowerCase().includes('contact'))
        return typeof t('portfolio:features.contactSection') === 'string' ? t('portfolio:features.contactSection') as string : feature;
      if (feature.toLowerCase().includes('učitavanje') || feature.toLowerCase().includes('loading') || feature.toLowerCase().includes('responsive'))
        return typeof t('portfolio:features.fastLoading') === 'string' ? t('portfolio:features.fastLoading') as string : feature;
    } else if (projectId === 3) {
      if (feature.toLowerCase().includes('ručno') || feature.toLowerCase().includes('handmade') || feature.toLowerCase().includes('svijeće') || feature.toLowerCase().includes('candles'))
        return typeof t('portfolio:features.handmadeCandles') === 'string' ? t('portfolio:features.handmadeCandles') as string : feature;
      if (feature.toLowerCase().includes('online') && feature.toLowerCase().includes('shop'))
        return typeof t('portfolio:features.onlineShop') === 'string' ? t('portfolio:features.onlineShop') as string : feature;
      if (feature.toLowerCase().includes('kontakt') || feature.toLowerCase().includes('contact') || feature.toLowerCase().includes('telefon') || feature.toLowerCase().includes('email'))
        return typeof t('portfolio:features.contactInfo') === 'string' ? t('portfolio:features.contactInfo') as string : feature;
      if (feature.toLowerCase().includes('besplatna') || feature.toLowerCase().includes('free') || feature.toLowerCase().includes('dostava') || feature.toLowerCase().includes('shipping'))
        return typeof t('portfolio:features.freeShipping') === 'string' ? t('portfolio:features.freeShipping') as string : feature;
      if (feature.toLowerCase().includes('responsive') && !feature.toLowerCase().includes('seo'))
        return typeof t('portfolio:features.responsiveDesign') === 'string' ? t('portfolio:features.responsiveDesign') as string : feature;
      if (feature.toLowerCase().includes('seo'))
        return typeof t('portfolio:features.seoOptimized') === 'string' ? t('portfolio:features.seoOptimized') as string : feature;
    } else if (projectId === 4) {
      if (feature.toLowerCase().includes('usluge') || feature.toLowerCase().includes('services') || feature.toLowerCase().includes('leistungen'))
        return typeof t('portfolio:features.dentistServices') === 'string' ? t('portfolio:features.dentistServices') as string : feature;
      if (feature.toLowerCase().includes('radno vrijeme') || feature.toLowerCase().includes('opening') || feature.toLowerCase().includes('öffnungszeiten'))
        return typeof t('portfolio:features.openingHours') === 'string' ? t('portfolio:features.openingHours') as string : feature;
      if (feature.toLowerCase().includes('alle kassen') || feature.toLowerCase().includes('insurance'))
        return typeof t('portfolio:features.allInsurances') === 'string' ? t('portfolio:features.allInsurances') as string : feature;
      if (feature.toLowerCase().includes('kontakt') || feature.toLowerCase().includes('contact') || feature.toLowerCase().includes('poziv') || feature.toLowerCase().includes('call'))
        return typeof t('portfolio:features.contactCta') === 'string' ? t('portfolio:features.contactCta') as string : feature;
      if (feature.toLowerCase().includes('adresa') || feature.toLowerCase().includes('address') || feature.toLowerCase().includes('mapa') || feature.toLowerCase().includes('map'))
        return typeof t('portfolio:features.addressAndMap') === 'string' ? t('portfolio:features.addressAndMap') as string : feature;
      if (feature.toLowerCase().includes('učitavanje') || feature.toLowerCase().includes('loading') || feature.toLowerCase().includes('responsive'))
        return typeof t('portfolio:features.fastLoading') === 'string' ? t('portfolio:features.fastLoading') as string : feature;
    }
    return feature;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={scrollContainerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] bg-white overflow-y-auto overscroll-contain"
        >
          {/* Close button - fixed position */}
          <button
            onClick={onClose}
            className="fixed top-20 right-4 md:top-24 md:right-8 z-[60] bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nextpixel-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scroll content with padding for animation space */}
          <div className="flex flex-col overflow-hidden pb-[200px] pt-[50px] md:pt-[100px]">
            <ContainerScroll
              scrollContainer={scrollContainerRef}
              titleComponent={
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-nextpixel-dark"
                  >
                    {project.title}
                  </motion.h1>
                </>
              }
            >
              <div className="relative w-full h-full">
                {/* Loading spinner */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-nextpixel-light rounded-2xl z-10">
                    <Spinner size="lg" className="h-10 w-10" />
                  </div>
                )}
                <Image
                  src={project.image}
                  alt={project.title}
                  height={720}
                  width={1400}
                  className="mx-auto rounded-2xl object-cover h-full object-center md:object-left-top"
                  draggable={false}
                  priority
                  onLoad={() => setImageLoading(false)}
                  onError={(e) => {
                    setImageLoading(false);
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/1400x720/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                  }}
                />
              </div>
            </ContainerScroll>
          </div>

          {/* Project details section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-40 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-10"
            >
              {/* Description */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-nextpixel-gray leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-nextpixel-blue">
                    {typeof t('portfolio:technologies') === 'string' ? t('portfolio:technologies') as string : 'Technologies Used'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-nextpixel-light text-nextpixel-blue rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-nextpixel-blue">
                    {typeof t('portfolio:keyFeatures') === 'string' ? t('portfolio:keyFeatures') as string : 'Key Features'}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-nextpixel-turquoise mr-3 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-nextpixel-gray">
                          {getFeatureText(feature, project.id)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visit Website Button */}
              {project.url && (
                <div className="pt-4 border-t border-gray-100">
                  <StarButton
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{typeof t('portfolio:visitWebsite') === 'string' ? t('portfolio:visitWebsite') as string : 'Visit Website'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </StarButton>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
