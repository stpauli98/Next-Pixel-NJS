"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslate } from '../../context/LanguageContext';
import Image from 'next/image';
import ProjectDetailsModal from '../ProjectDetailsModal';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  url?: string;
  technologies?: string[];
  features?: string[];
}

const PortfolioSection: React.FC = () => {
  const { t, language } = useTranslate();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Rešava problem hidratacije
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Definišemo projekte nakon što je komponenta montirana da bi se izbegli problemi hidratacije
  const getProjects = useCallback(() => [
    {
      id: 1,
      title: typeof t('portfolio.projects.project7.title') === 'string' ? t('portfolio.projects.project7.title') as string : 'Sačuvajte sve uspomene sa vašeg vjenčanja',
      description: typeof t('portfolio.projects.project7.description') === 'string' ? t('portfolio.projects.project7.description') as string : 'Jednostavan način da prikupite sve fotografije koje su vaši gosti napravili tokom vjenčanja na jednom mestu, bez komplikacija.',
      category: typeof t('portfolio.category.webApp') === 'string' ? t('portfolio.category.webApp') as string : 'Web App',
      image: '/images/DodajUspomenuHero.webp',
      url: 'https://www.dodajuspomenu.com',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Cloudinary'],
      features: [
        typeof t('portfolio.features.createEvent') === 'string' ? t('portfolio.features.createEvent') as string : 'Kreiranje besplatnog događaja za vjenčanje',
        typeof t('portfolio.features.shareLink') === 'string' ? t('portfolio.features.shareLink') as string : 'Jednostavno dijeljenje linka sa gostima',
        typeof t('portfolio.features.collectPhotos') === 'string' ? t('portfolio.features.collectPhotos') as string : 'Automatsko prikupljanje i organizacija fotografija',
        typeof t('portfolio.features.viewPhotos') === 'string' ? t('portfolio.features.viewPhotos') as string : 'Pregled svih fotografija na jednom mjestu',
        typeof t('portfolio.features.downloadPhotos') === 'string' ? t('portfolio.features.downloadPhotos') as string : 'Preuzimanje fotografija u visokoj rezoluciji',
        typeof t('portfolio.features.responsive') === 'string' ? t('portfolio.features.responsive') as string : 'Responzivan dizajn za mobilne uređaje'
      ]
    },
    {
      id: 2,
      title: typeof t('portfolio.projects.project8.title') === 'string' ? t('portfolio.projects.project8.title') as string : 'Caffe Bar 919',
      description: typeof t('portfolio.projects.project8.description') === 'string' ? t('portfolio.projects.project8.description') as string : 'Moderan web sajt za kafić u centru Gradiške sa jelovnikom, galerijom, događajima i CTA za rezervacije.',
      category: typeof t('portfolio.category.website') === 'string' ? t('portfolio.category.website') as string : 'Web Site',
      image: '/images/919BarHero.webp',
      url: 'https://www.919bar.com/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio.features.heroSection') === 'string' ? t('portfolio.features.heroSection') as string : 'Hero sekcija sa jasnim USP i pozivom na rezervaciju',
        typeof t('portfolio.features.events') === 'string' ? t('portfolio.features.events') as string : 'Sekcija Događaji',
        typeof t('portfolio.features.gallery') === 'string' ? t('portfolio.features.gallery') as string : 'Galerija enterijera',
        typeof t('portfolio.features.menuWithPrices') === 'string' ? t('portfolio.features.menuWithPrices') as string : 'Meni sa cijenama',
        typeof t('portfolio.features.contactSection') === 'string' ? t('portfolio.features.contactSection') as string : 'Kontakt sa adresom, radnim vremenom i pozivom na navigaciju',
        typeof t('portfolio.features.fastLoading') === 'string' ? t('portfolio.features.fastLoading') as string : 'Responsive dizajn i brzo učitavanje'
      ]
    },
    {
      id: 3,
      title: typeof t('portfolio.projects.project9.title') === 'string' ? t('portfolio.projects.project9.title') as string : 'Šarena Čarolija – mirisne svijeće',
      description: typeof t('portfolio.projects.project9.description') === 'string' ? t('portfolio.projects.project9.description') as string : 'Online shop za ručno rađene mirisne svijeće od sojinog voska, sa lokalnom dostavom u BiH.',
      category: typeof t('portfolio.category.webShop') === 'string' ? t('portfolio.category.webShop') as string : 'Web Shop',
      image: '/images/SarenCarolijaHero.webp',
      url: 'https://www.sarenacarolija.com/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio.features.handmadeCandles') === 'string' ? t('portfolio.features.handmadeCandles') as string : 'Ručno rađene svijeće od sojinog voska, esencijalna ulja i pamučni fitilj',
        typeof t('portfolio.features.onlineShop') === 'string' ? t('portfolio.features.onlineShop') as string : 'Online shop',
        typeof t('portfolio.features.contactInfo') === 'string' ? t('portfolio.features.contactInfo') as string : 'Kontakt telefon i email na sajtu',
        typeof t('portfolio.features.freeShipping') === 'string' ? t('portfolio.features.freeShipping') as string : 'Besplatna dostava za narudžbe iznad 50 KM',
        typeof t('portfolio.features.responsiveDesign') === 'string' ? t('portfolio.features.responsiveDesign') as string : 'Responsive dizajn',
        typeof t('portfolio.features.seoOptimized') === 'string' ? t('portfolio.features.seoOptimized') as string : 'SEO naslov i opis za BiH tržište'
      ]
    },
    {
      id: 4,
      title: typeof t('portfolio.projects.project10.title') === 'string' ? t('portfolio.projects.project10.title') as string : 'Zahnarzt Grimmenstein – Dr. Visnja Milosevic',
      description: typeof t('portfolio.projects.project10.description') === 'string' ? t('portfolio.projects.project10.description') as string : 'Informativna web stranica za zubarsku ordinaciju u Grimmensteinu. Jasne usluge, radno vrijeme, "Alle Kassen", kontakt i mapa za dolazak.',
      category: typeof t('portfolio.category.website') === 'string' ? t('portfolio.category.website') as string : 'Website',
      image: '/images/DentistHero.webp',
      url: 'https://www.zahnarzt-grimmenstein.at/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio.features.dentistServices') === 'string' ? t('portfolio.features.dentistServices') as string : 'Usluge ordinacije',
        typeof t('portfolio.features.openingHours') === 'string' ? t('portfolio.features.openingHours') as string : 'Radno vrijeme',
        typeof t('portfolio.features.allInsurances') === 'string' ? t('portfolio.features.allInsurances') as string : 'Alle Kassen',
        typeof t('portfolio.features.contactCta') === 'string' ? t('portfolio.features.contactCta') as string : 'Kontakt i poziv na broj',
        typeof t('portfolio.features.addressAndMap') === 'string' ? t('portfolio.features.addressAndMap') as string : 'Adresa i mapa',
        typeof t('portfolio.features.fastLoading') === 'string' ? t('portfolio.features.fastLoading') as string : 'Responsive dizajn i brzo učitavanje'
      ]
    },
  ], [t]);

  // Osvježavanje komponente kada se promijeni jezik
  useEffect(() => {
    if (mounted) {
      // Osvježavanje projekata kada se promijeni jezik
      setVisibleProjects(getProjects());
    }
  }, [language, mounted, getProjects]);

  // Definišemo kategorije sa fallback vrednostima za inicijalni render
  const getCategories = () => [
    { id: 'all', name: !mounted ? 'All' : (typeof t('portfolio.category.all') === 'string' ? t('portfolio.category.all') as string : 'All') },
    { id: 'web-app', name: !mounted ? 'Web App' : (typeof t('portfolio.category.webApp') === 'string' ? t('portfolio.category.webApp') as string : 'Web App') },
    { id: 'web-shop', name: !mounted ? 'Web Shop' : (typeof t('portfolio.category.webShop') === 'string' ? t('portfolio.category.webShop') as string : 'Web Shop') },
    { id: 'website', name: !mounted ? 'Website' : (typeof t('portfolio.category.website') === 'string' ? t('portfolio.category.website') as string : 'Website') },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);

  // Inicijalizacija projekata nakon što je komponenta montirana
  useEffect(() => {
    if (mounted) {
      setVisibleProjects(getProjects());
    }
  }, [mounted, getProjects]);

  // Filtriramo projekte na osnovu aktivne kategorije
  const filteredProjects = activeCategory === 'all'
    ? visibleProjects
    : visibleProjects.filter(project => {
      // Get the category ID for the current project by comparing with translation keys
      const categoryEntries = Object.entries({
        'webApp': t('portfolio.category.webApp'),
        'webShop': t('portfolio.category.webShop'),
        'website': t('portfolio.category.website')
      });
      
      // Find which category key matches this project's category name
      const matchingCategory = categoryEntries.find(([_, translatedName]) => 
        project.category === translatedName || 
        project.category.toLowerCase() === translatedName?.toString().toLowerCase()
      );
      
      // Get the category ID from the matching entry
      const projectCategoryId = matchingCategory ? matchingCategory[0] : null;
      
      // Also check if the category name directly includes the active category
      const directMatch = project.category.toLowerCase().includes(activeCategory.toLowerCase());
      
      // For webApp, webShop, website - do direct comparison with the category ID
      if (activeCategory === 'web-app' && projectCategoryId === 'webApp') return true;
      if (activeCategory === 'web-shop' && projectCategoryId === 'webShop') return true;
      if (activeCategory === 'website' && projectCategoryId === 'website') return true;
      
      // Special case for Serbian 'softver' category
      if (activeCategory === 'softver' && projectCategoryId === 'software') return true;
      
      // For other categories or fallback
      return directMatch;
    });

  const formatTitle = (title: string) => {
    if (title.includes('radovi')) {
      const parts = title.split('radovi');
      return (
        <>
          {parts[0]}<span className="text-nextpixel-blue">radovi</span>{parts[1]}
        </>
      );
    } else if (title.includes('Arbeiten')) {
      const parts = title.split('Arbeiten');
      return (
        <>
          {parts[0]}<span className="text-nextpixel-blue">Arbeiten</span>{parts[1]}
        </>
      );
    } else {
      return title;
    }
  };

  return (
    <section id="portfolio" className="section bg-white py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {!mounted ? 'Portfolio' : (
              formatTitle(typeof t('portfolio.title') === 'string' ? t('portfolio.title') as string : 'Portfolio')
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
            className="text-lg text-nextpixel-gray max-w-3xl mx-auto mb-12"
          >
            {!mounted ? 'Check out some of our recent projects' : (
              typeof t('portfolio.subtitle') === 'string' ? t('portfolio.subtitle') as string : ''
            )}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center mb-20 gap-4"
        >
          {getCategories().map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-nextpixel-blue text-white shadow-md'
                  : 'bg-gray-100 text-nextpixel-gray hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {!mounted ? (
            // Prikazujemo placeholder projekte tokom inicijalnog renderovanja
            Array(3).fill(0).map((_, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg h-full flex flex-col bg-gray-100"
                style={{height: '400px'}}
              ></div>
            ))
          ) : filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg h-full flex flex-col transform transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="w-full h-72 overflow-hidden bg-white flex items-center justify-center p-0">
                <Image
                  src={project.image} 
                  alt={project.title} 
                  width={600}
                  height={400}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${project.id === 1 || project.id === 2 || project.id === 3 ? 'object-contain bg-nextpixel-white' : 'object-cover'}`} //Ovde se mjenja oblik i izgled sike u kartici
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/600x400/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-nextpixel-dark/80 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <h3 className="text-xl font-bold mb-2 inline-block">
                  <span className="bg-nextpixel-dark/90 px-3 py-1 rounded-md text-nextpixel-turquoise shadow-md">
                    {formatTitle(project.title)}
                  </span>
                </h3>
                <p className="text-gray-100 text-sm leading-relaxed">{typeof project.description === 'string' ? project.description : ''}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="inline-block text-nextpixel-turquoise text-sm font-medium">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    className="inline-block text-white text-sm font-medium hover:text-nextpixel-turquoise transition-colors"
                  >
                    {typeof t('portfolio.viewProject') === 'string' ? t('portfolio.viewProject') as string : 'View Project'} →
                  </button>
                </div>
              </div>
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
            className="btn-primary inline-block px-8 py-4 text-white bg-nextpixel-blue hover:bg-blue-700 rounded-full font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {!mounted ? 'Start Your Project' : (
              typeof t('portfolio.startProject') === 'string' ? t('portfolio.startProject') as string : 'Start Your Project'
            )}
          </a>
        </motion.div>
      </div>
      
      {/* Project Details Modal */}
      <ProjectDetailsModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default PortfolioSection;
