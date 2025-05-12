"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslate } from '../context/LanguageContext';

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
  
  // Osvježavanje komponente kada se promijeni jezik
  useEffect(() => {
    // Ovo će prisiliti komponentu da se ponovno renderira kada se promijeni jezik
    setForceUpdate(prev => prev + 1);
  }, [language]);
  
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-nextpixel-dark rounded-xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white dark:bg-nextpixel-dark/90 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-nextpixel-dark/70 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nextpixel-gray dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Project image */}
            <div className="w-full h-48 sm:h-64 md:h-80 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/1200x800/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                }}
              />
            </div>
            
            {/* Project details */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-nextpixel-blue dark:text-nextpixel-turquoise mb-2">
                    {project.title}
                  </h2>
                  <span className="inline-block px-4 py-1 bg-nextpixel-turquoise/10 text-nextpixel-turquoise rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 sm:px-5 py-2 bg-nextpixel-blue text-white rounded-full hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base whitespace-nowrap"
                  >
                    <span>{typeof t('portfolio.visitWebsite') === 'string' ? t('portfolio.visitWebsite') as string : 'Visit Website'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              
              <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8">
                <p className="text-nextpixel-gray dark:text-gray-300">{project.description}</p>
              </div>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-nextpixel-blue dark:text-nextpixel-turquoise">
                    {typeof t('portfolio.technologies') === 'string' ? t('portfolio.technologies') as string : 'Technologies Used'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 dark:bg-nextpixel-dark/50 text-nextpixel-gray dark:text-gray-200 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-nextpixel-blue dark:text-nextpixel-turquoise">
                    {typeof t('portfolio.keyFeatures') === 'string' ? t('portfolio.keyFeatures') as string : 'Key Features'}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-nextpixel-turquoise mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-nextpixel-gray dark:text-gray-300">
                          {project.id === 7 ? (
                            feature.toLowerCase().includes('kreiranje') || feature.toLowerCase().includes('create') ?
                              typeof t('portfolio.features.createEvent') === 'string' ? t('portfolio.features.createEvent') as string : feature :
                            feature.toLowerCase().includes('dijeljenje') || feature.toLowerCase().includes('share') ?
                              typeof t('portfolio.features.shareLink') === 'string' ? t('portfolio.features.shareLink') as string : feature :
                            feature.toLowerCase().includes('prikupljanje') || feature.toLowerCase().includes('collect') ?
                              typeof t('portfolio.features.collectPhotos') === 'string' ? t('portfolio.features.collectPhotos') as string : feature :
                            feature.toLowerCase().includes('pregled') || feature.toLowerCase().includes('view') ?
                              typeof t('portfolio.features.viewPhotos') === 'string' ? t('portfolio.features.viewPhotos') as string : feature :
                            feature.toLowerCase().includes('preuzimanje') || feature.toLowerCase().includes('download') ?
                              typeof t('portfolio.features.downloadPhotos') === 'string' ? t('portfolio.features.downloadPhotos') as string : feature :
                            feature.toLowerCase().includes('responzivan') || feature.toLowerCase().includes('responsive') ?
                              typeof t('portfolio.features.responsive') === 'string' ? t('portfolio.features.responsive') as string : feature :
                            feature
                          ) : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
