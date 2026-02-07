"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslate } from '../../context/LanguageContext';
import ProjectDetailsModal from '../ProjectDetailsModal';
import { VerticalProjectStack } from '../ui/VerticalProjectStack';
import { StarButton } from '@/components/ui/star-button';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const getProjects = useCallback(() => [
    {
      id: 1,
      title: typeof t('portfolio:projects.project7.title') === 'string' ? t('portfolio:projects.project7.title') as string : 'Sačuvajte sve uspomene sa vašeg vjenčanja',
      description: typeof t('portfolio:projects.project7.description') === 'string' ? t('portfolio:projects.project7.description') as string : 'Jednostavan način da prikupite sve fotografije koje su vaši gosti napravili tokom vjenčanja na jednom mestu, bez komplikacija.',
      category: typeof t('portfolio:category.webApp') === 'string' ? t('portfolio:category.webApp') as string : 'Web App',
      image: '/images/DodajUspomenuHero.webp',
      url: 'https://www.dodajuspomenu.com',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Cloudinary'],
      features: [
        typeof t('portfolio:features.createEvent') === 'string' ? t('portfolio:features.createEvent') as string : 'Kreiranje besplatnog događaja za vjenčanje',
        typeof t('portfolio:features.shareLink') === 'string' ? t('portfolio:features.shareLink') as string : 'Jednostavno dijeljenje linka sa gostima',
        typeof t('portfolio:features.collectPhotos') === 'string' ? t('portfolio:features.collectPhotos') as string : 'Automatsko prikupljanje i organizacija fotografija',
        typeof t('portfolio:features.viewPhotos') === 'string' ? t('portfolio:features.viewPhotos') as string : 'Pregled svih fotografija na jednom mjestu',
        typeof t('portfolio:features.downloadPhotos') === 'string' ? t('portfolio:features.downloadPhotos') as string : 'Preuzimanje fotografija u visokoj rezoluciji',
        typeof t('portfolio:features.responsive') === 'string' ? t('portfolio:features.responsive') as string : 'Responzivan dizajn za mobilne uređaje'
      ]
    },
    {
      id: 2,
      title: typeof t('portfolio:projects.project8.title') === 'string' ? t('portfolio:projects.project8.title') as string : 'Caffe Bar 919',
      description: typeof t('portfolio:projects.project8.description') === 'string' ? t('portfolio:projects.project8.description') as string : 'Moderan web sajt za kafić u centru Gradiške sa jelovnikom, galerijom, događajima i CTA za rezervacije.',
      category: typeof t('portfolio:category.website') === 'string' ? t('portfolio:category.website') as string : 'Web Site',
      image: '/images/919BarHero.webp',
      url: 'https://www.919bar.com/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio:features.heroSection') === 'string' ? t('portfolio:features.heroSection') as string : 'Hero sekcija sa jasnim USP i pozivom na rezervaciju',
        typeof t('portfolio:features.events') === 'string' ? t('portfolio:features.events') as string : 'Sekcija Događaji',
        typeof t('portfolio:features.gallery') === 'string' ? t('portfolio:features.gallery') as string : 'Galerija enterijera',
        typeof t('portfolio:features.menuWithPrices') === 'string' ? t('portfolio:features.menuWithPrices') as string : 'Meni sa cijenama',
        typeof t('portfolio:features.contactSection') === 'string' ? t('portfolio:features.contactSection') as string : 'Kontakt sa adresom, radnim vremenom i pozivom na navigaciju',
        typeof t('portfolio:features.fastLoading') === 'string' ? t('portfolio:features.fastLoading') as string : 'Responsive dizajn i brzo učitavanje'
      ]
    },
    {
      id: 3,
      title: typeof t('portfolio:projects.project9.title') === 'string' ? t('portfolio:projects.project9.title') as string : 'Šarena Čarolija – mirisne svijeće',
      description: typeof t('portfolio:projects.project9.description') === 'string' ? t('portfolio:projects.project9.description') as string : 'Online shop za ručno rađene mirisne svijeće od sojinog voska, sa lokalnom dostavom u BiH.',
      category: typeof t('portfolio:category.webShop') === 'string' ? t('portfolio:category.webShop') as string : 'Web Shop',
      image: '/images/SarenCarolijaHero.webp',
      url: 'https://www.sarenacarolija.com/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio:features.handmadeCandles') === 'string' ? t('portfolio:features.handmadeCandles') as string : 'Ručno rađene svijeće od sojinog voska, esencijalna ulja i pamučni fitilj',
        typeof t('portfolio:features.onlineShop') === 'string' ? t('portfolio:features.onlineShop') as string : 'Online shop',
        typeof t('portfolio:features.contactInfo') === 'string' ? t('portfolio:features.contactInfo') as string : 'Kontakt telefon i email na sajtu',
        typeof t('portfolio:features.freeShipping') === 'string' ? t('portfolio:features.freeShipping') as string : 'Besplatna dostava za narudžbe iznad 50 KM',
        typeof t('portfolio:features.responsiveDesign') === 'string' ? t('portfolio:features.responsiveDesign') as string : 'Responsive dizajn',
        typeof t('portfolio:features.seoOptimized') === 'string' ? t('portfolio:features.seoOptimized') as string : 'SEO naslov i opis za BiH tržište'
      ]
    },
    {
      id: 4,
      title: typeof t('portfolio:projects.project10.title') === 'string' ? t('portfolio:projects.project10.title') as string : 'Zahnarzt Grimmenstein – Dr. Visnja Milosevic',
      description: typeof t('portfolio:projects.project10.description') === 'string' ? t('portfolio:projects.project10.description') as string : 'Informativna web stranica za zubarsku ordinaciju u Grimmensteinu. Jasne usluge, radno vrijeme, "Alle Kassen", kontakt i mapa za dolazak.',
      category: typeof t('portfolio:category.website') === 'string' ? t('portfolio:category.website') as string : 'Website',
      image: '/images/DentistHero.webp',
      url: 'https://www.zahnarzt-grimmenstein.at/',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      features: [
        typeof t('portfolio:features.dentistServices') === 'string' ? t('portfolio:features.dentistServices') as string : 'Usluge ordinacije',
        typeof t('portfolio:features.openingHours') === 'string' ? t('portfolio:features.openingHours') as string : 'Radno vrijeme',
        typeof t('portfolio:features.allInsurances') === 'string' ? t('portfolio:features.allInsurances') as string : 'Alle Kassen',
        typeof t('portfolio:features.contactCta') === 'string' ? t('portfolio:features.contactCta') as string : 'Kontakt i poziv na broj',
        typeof t('portfolio:features.addressAndMap') === 'string' ? t('portfolio:features.addressAndMap') as string : 'Adresa i mapa',
        typeof t('portfolio:features.fastLoading') === 'string' ? t('portfolio:features.fastLoading') as string : 'Responsive dizajn i brzo učitavanje'
      ]
    },
    {
      id: 5,
      title: typeof t('portfolio:projects.project11.title') === 'string' ? t('portfolio:projects.project11.title') as string : 'Servisna Knjižica',
      description: typeof t('portfolio:projects.project11.description') === 'string' ? t('portfolio:projects.project11.description') as string : 'Mobilna aplikacija za praćenje servisa vozila, podsjetnika i troškova. Radi offline i sinkronizuje se sa cloud bazom.',
      category: typeof t('portfolio:category.mobileApp') === 'string' ? t('portfolio:category.mobileApp') as string : 'Mobile App',
      image: '/images/CarAppHero.webp',
      url: 'https://www.servisnaknjizica.app/',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Supabase'],
      features: [
        typeof t('portfolio:features.offlineSync') === 'string' ? t('portfolio:features.offlineSync') as string : 'Offline rad i automatska sinkronizacija',
        typeof t('portfolio:features.serviceReminders') === 'string' ? t('portfolio:features.serviceReminders') as string : 'Automatski podsjetnici za servise',
        typeof t('portfolio:features.expenseTracking') === 'string' ? t('portfolio:features.expenseTracking') as string : 'Praćenje troškova vozila',
        typeof t('portfolio:features.multiDevice') === 'string' ? t('portfolio:features.multiDevice') as string : 'Sinkronizacija između uređaja',
        typeof t('portfolio:features.vehicleManagement') === 'string' ? t('portfolio:features.vehicleManagement') as string : 'Upravljanje vozilima u Garaži',
        typeof t('portfolio:features.pushNotifications') === 'string' ? t('portfolio:features.pushNotifications') as string : 'Push notifikacije za podsjetnike'
      ]
    },
  ], [t]);

  useEffect(() => {
    if (mounted) {
      setVisibleProjects(getProjects());
    }
  }, [language, mounted, getProjects]);

  const getCategories = () => [
    { id: 'all', name: !mounted ? 'All' : (typeof t('portfolio:category.all') === 'string' ? t('portfolio:category.all') as string : 'All') },
    { id: 'web-app', name: !mounted ? 'Web App' : (typeof t('portfolio:category.webApp') === 'string' ? t('portfolio:category.webApp') as string : 'Web App') },
    { id: 'web-shop', name: !mounted ? 'Web Shop' : (typeof t('portfolio:category.webShop') === 'string' ? t('portfolio:category.webShop') as string : 'Web Shop') },
    { id: 'website', name: !mounted ? 'Website' : (typeof t('portfolio:category.website') === 'string' ? t('portfolio:category.website') as string : 'Website') },
    { id: 'mobile-app', name: !mounted ? 'Mobile App' : (typeof t('portfolio:category.mobileApp') === 'string' ? t('portfolio:category.mobileApp') as string : 'Mobile App') },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (mounted) {
      setVisibleProjects(getProjects());
    }
  }, [mounted, getProjects]);

  const filteredProjects = activeCategory === 'all'
    ? visibleProjects
    : visibleProjects.filter(project => {
      const categoryEntries = Object.entries({
        'webApp': t('portfolio:category.webApp'),
        'webShop': t('portfolio:category.webShop'),
        'website': t('portfolio:category.website'),
        'mobileApp': t('portfolio:category.mobileApp')
      });

      const matchingCategory = categoryEntries.find(([_, translatedName]) =>
        project.category === translatedName ||
        project.category.toLowerCase() === translatedName?.toString().toLowerCase()
      );

      const projectCategoryId = matchingCategory ? matchingCategory[0] : null;
      const directMatch = project.category.toLowerCase().includes(activeCategory.toLowerCase());

      if (activeCategory === 'web-app' && projectCategoryId === 'webApp') return true;
      if (activeCategory === 'web-shop' && projectCategoryId === 'webShop') return true;
      if (activeCategory === 'website' && projectCategoryId === 'website') return true;
      if (activeCategory === 'mobile-app' && projectCategoryId === 'mobileApp') return true;
      if (activeCategory === 'softver' && projectCategoryId === 'software') return true;

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

  // Handle scroll exit from the stack
  const handleScrollExit = useCallback((direction: 'up' | 'down') => {
    // Restore body scroll
    document.body.style.overflow = '';

    if (direction === 'down') {
      // Scroll to why-choose-us section (directly below portfolio)
      const nextSection = document.getElementById('why-choose-us');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to services section (directly above portfolio)
      const prevSection = document.getElementById('services');
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section
      id="portfolio"
      className="section bg-white py-10 sm:py-16 lg:py-0 lg:pb-8 lg:min-h-screen lg:sticky lg:top-0 relative overflow-hidden"
    >
      {/* Gradient transition from WhyChooseUs (dark) */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-nextpixel-dark/20 to-transparent pointer-events-none z-0" />

      {/* Desktop: Full viewport container */}
      <div className="lg:h-screen lg:flex lg:flex-col relative z-10">
        {/* Header - positioned at top on desktop */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-3"
            >
              {!mounted ? 'Portfolio' : (
                formatTitle(typeof t('portfolio:title') === 'string' ? t('portfolio:title') as string : 'Portfolio')
              )}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 lg:w-20 h-1 bg-nextpixel-turquoise mx-auto mb-4 lg:mb-3"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base lg:text-lg text-nextpixel-gray max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-5"
            >
              {!mounted ? 'Check out some of our recent projects' : (
                typeof t('portfolio:subtitle') === 'string' ? t('portfolio:subtitle') as string : ''
              )}
            </motion.p>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 lg:gap-3 overflow-x-auto sm:overflow-x-visible px-1 sm:px-0 pb-2 sm:pb-0 mb-4 lg:mb-6 scrollbar-hide"
            >
              {getCategories().map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full transition-all text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-nextpixel-blue text-white shadow-md'
                      : 'bg-gray-100 text-nextpixel-gray hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Vertical Project Stack - takes remaining space on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 min-h-0 mt-6 lg:mt-0"
        >
          {!mounted ? (
            <div className="flex h-[540px] sm:h-[620px] md:h-[700px] lg:h-full items-center justify-center">
              <div className="h-[470px] sm:h-[540px] md:h-[620px] lg:h-[660px] w-[320px] sm:w-[360px] md:w-[510px] lg:w-[740px] rounded-2xl lg:rounded-3xl bg-gray-100 animate-pulse" />
            </div>
          ) : (
            <VerticalProjectStack
              projects={filteredProjects}
              onProjectClick={(project) => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              viewProjectText={typeof t('portfolio:viewProject') === 'string' ? t('portfolio:viewProject') as string : 'View Project'}
              enableScrollLock={true}
              onScrollExit={handleScrollExit}
            />
          )}
        </motion.div>

        {/* CTA Button - mobile only below stack */}
        <div className="lg:hidden container mx-auto px-4 py-8">
          <div className="text-center">
            <StarButton href="#contact">
              {!mounted ? 'Start Your Project' : (
                typeof t('portfolio:startProject') === 'string' ? t('portfolio:startProject') as string : 'Start Your Project'
              )}
            </StarButton>
          </div>
        </div>
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
