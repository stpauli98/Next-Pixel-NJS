"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BlogCard from './BlogCard';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
}

interface BlogListProps {
  posts: BlogPost[];
  currentLang: string;
}

export default function BlogList({ posts, currentLang }: BlogListProps) {
  const { t, i18n } = useTranslation('blog');
  const [mounted, setMounted] = React.useState(false);

  // Handle hydration
  React.useEffect(() => {
    setMounted(true);
    // Sync i18n language with current page language
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  // Get locale for date formatting
  const dateLocale = currentLang === 'sr' ? 'sr-Latn-RS' :
                     currentLang === 'de' ? 'de-DE' : 'en-US';

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="bg-nextpixel-light dark:bg-nextpixel-dark py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nextpixel-dark dark:text-white mb-4">
              NextPixel Blog
            </h1>
            <div className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6"></div>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-nextpixel-light dark:bg-nextpixel-dark py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - matching main site style */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-nextpixel-dark dark:text-white mb-4"
          >
            {t('title')}
          </motion.h1>

          {/* Accent bar - like ServicesSection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-nextpixel-turquoise mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Blog posts grid */}
        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-300 text-lg"
          >
            {t('noPostsYet')}
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <BlogCard
                  title={post.title}
                  summary={post.excerpt || post.description}
                  slug={post.slug}
                  date={new Date(post.date).toLocaleDateString(dateLocale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  readTime="5 min"
                  readMoreText={t('readMore')}
                  lang={currentLang}
                  image={
                    post.slug === 'why-website-2025' ? {
                      src: '/blogImages/image1.webp',
                      alt: post.title
                    } : undefined
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
