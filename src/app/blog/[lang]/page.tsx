import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import { getBlogPosts } from '@/lib/blog';
import { BlogLanguageSelector } from '@/components/blogComponents/BlogLanguageSelector';

// Define the BlogPost interface here to avoid circular dependencies
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const translations = {
    sr: {
      title: 'NextPixel Blog',
      description: 'Pročitajte najnovije članke o web razvoju, dizajnu i digitalnom marketingu.',
    },
    en: {
      title: 'NextPixel Blog',
      description: 'Read the latest articles about web development, design, and digital marketing.',
    },
    de: {
      title: 'NextPixel Blog',
      description: 'Lesen Sie die neuesten Artikel über Webentwicklung, Design und digitales Marketing.',
    }
  };

  const { title, description } = translations[resolvedParams.lang as keyof typeof translations] || translations.sr;

  return {
    title,
    description,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const posts = await getBlogPosts(lang);

  const translations = {
    sr: {
      title: 'NextPixel Blog',
      readMore: 'Pročitaj više',
      subtitle: 'Najnoviji članci o web razvoju i digitalnim rješenjima',
    },
    en: {
      title: 'NextPixel Blog',
      readMore: 'Read more',
      subtitle: 'Latest articles about web development and digital solutions',
    },
    de: {
      title: 'NextPixel Blog',
      readMore: 'Weiterlesen',
      subtitle: 'Neueste Artikel über Webentwicklung und digitale Lösungen',
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.sr;

  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar lang={lang} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mt-20 text-4xl font-bold mb-4 text-center text-nextpixel-dark dark:text-nextpixel-dark">{t.title}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>
          
          <div className="flex justify-center mb-8">
            <BlogLanguageSelector currentLang={lang} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link href={`/blog/${lang}/${post.slug}`} className="text-nextpixel-dark dark:text-white hover:text-nextpixel-turquoise transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {post.date && new Date(post.date).toLocaleDateString(
                      lang === 'sr' ? 'sr-Latn-RS' : lang === 'de' ? 'de-DE' : 'en-US', 
                      {day: 'numeric', month: 'long', year: 'numeric'}
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${lang}/${post.slug}`} 
                    className="inline-block bg-nextpixel-turquoise text-white py-2 px-4 rounded hover:bg-nextpixel-dark transition-colors"
                  >
                    {t.readMore}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BlogFooter lang={lang} />
    </div>
  );
}
