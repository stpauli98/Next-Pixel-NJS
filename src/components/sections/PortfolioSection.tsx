"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslate } from '../../context/LanguageContext';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const PortfolioSection: React.FC = () => {
  const { t } = useTranslate();
  const projects = [
    {
      id: 1,
      title: typeof t('portfolio.projects.project1.title') === 'string' ? t('portfolio.projects.project1.title') as string : 'Project 1',
      description: typeof t('portfolio.projects.project1.description') === 'string' ? t('portfolio.projects.project1.description') as string : '',
      category: typeof t('portfolio.category.webShop') === 'string' ? t('portfolio.category.webShop') as string : 'Web Shop',
      image: '/images/web-shop.png',
    },
    {
      id: 2,
      title: typeof t('portfolio.projects.project2.title') === 'string' ? t('portfolio.projects.project2.title') as string : 'Project 2',
      description: typeof t('portfolio.projects.project2.description') === 'string' ? t('portfolio.projects.project2.description') as string : '',
      category: typeof t('portfolio.category.webDesign') === 'string' ? t('portfolio.category.webDesign') as string : 'Web Design',
      image: '/images/corporate-website.png',
    },
    {
      id: 3,
      title: typeof t('portfolio.projects.project3.title') === 'string' ? t('portfolio.projects.project3.title') as string : 'Project 3',
      description: typeof t('portfolio.projects.project3.description') === 'string' ? t('portfolio.projects.project3.description') as string : '',
      category: typeof t('portfolio.category.software') === 'string' ? t('portfolio.category.software') as string : 'Software',
      image: '/images/pm-app.png',
    },
    {
      id: 4,
      title: typeof t('portfolio.projects.project4.title') === 'string' ? t('portfolio.projects.project4.title') as string : 'Project 4',
      description: typeof t('portfolio.projects.project4.description') === 'string' ? t('portfolio.projects.project4.description') as string : '',
      category: typeof t('portfolio.category.seo') === 'string' ? t('portfolio.category.seo') as string : 'SEO',
      image: '/images/seo-optim.png',
    },
    {
      id: 5,
      title: typeof t('portfolio.projects.project5.title') === 'string' ? t('portfolio.projects.project5.title') as string : 'Project 5',
      description: typeof t('portfolio.projects.project5.description') === 'string' ? t('portfolio.projects.project5.description') as string : '',
      category: typeof t('portfolio.category.software') === 'string' ? t('portfolio.category.software') as string : 'Software',
      image: '/images/mobile-app.png',
    },
    {
      id: 6,
      title: typeof t('portfolio.projects.project6.title') === 'string' ? t('portfolio.projects.project6.title') as string : 'Project 6',
      description: typeof t('portfolio.projects.project6.description') === 'string' ? t('portfolio.projects.project6.description') as string : '',
      category: typeof t('portfolio.category.webDesign') === 'string' ? t('portfolio.category.webDesign') as string : 'Web Design',
      image: '/images/redesign.png',
    },
  ];

  const categories = [
    { id: 'all', name: typeof t('portfolio.category.all') === 'string' ? t('portfolio.category.all') as string : 'All' },
    { id: 'webDesign', name: typeof t('portfolio.category.webDesign') === 'string' ? t('portfolio.category.webDesign') as string : 'Web Design' },
    { id: 'webShop', name: typeof t('portfolio.category.webShop') === 'string' ? t('portfolio.category.webShop') as string : 'Web Shop' },
    { id: 'seo', name: typeof t('portfolio.category.seo') === 'string' ? t('portfolio.category.seo') as string : 'SEO' },
    { id: 'software', name: typeof t('portfolio.category.software') === 'string' ? t('portfolio.category.software') as string : 'Software' },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].name);

  const filteredProjects = activeCategory === categories[0].name
    ? projects
    : projects.filter(project => project.category === activeCategory);

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
            {formatTitle(typeof t('portfolio.title') === 'string' ? t('portfolio.title') as string : 'Portfolio')}
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
            {typeof t('portfolio.subtitle') === 'string' ? t('portfolio.subtitle') as string : 'Subtitle'}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center mb-20 gap-4"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-full transition-all text-sm font-medium ${
                activeCategory === category.name
                  ? 'bg-nextpixel-blue text-white shadow-md'
                  : 'bg-gray-100 text-nextpixel-gray hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg h-full flex flex-col transform transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="w-full h-72 overflow-hidden bg-white flex items-center justify-center p-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/600x400/0A2463/FFFFFF?text=${encodeURIComponent(project.title)}`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-nextpixel-dark to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <h3 className="text-xl font-bold mb-2">
                  {formatTitle(project.title)}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{typeof project.description === 'string' ? project.description : ''}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="inline-block text-nextpixel-turquoise text-sm font-medium">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <span className="inline-block text-white text-sm font-medium hover:text-nextpixel-turquoise transition-colors">
                    {typeof t('portfolio.viewProject') === 'string' ? t('portfolio.viewProject') as string : 'View Project'} →
                  </span>
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
            {typeof t('portfolio.startProject') === 'string' ? t('portfolio.startProject') as string : 'Start Your Project'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
