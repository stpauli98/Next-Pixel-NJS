import React from 'react';
import { Metadata } from 'next';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import BlogList from '@/components/blogComponents/BlogList';
import { getBlogPosts } from '@/lib/blog';
import { getPageMetadata, siteConfig } from '@/config/metadata';
import { Locale } from '@/config/i18n';

interface BlogPageProps {
  params: Promise<{
    lang: string;
  }>;
}

/**
 * Generate metadata for blog page based on locale
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('blog', locale);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const currentLang = resolvedParams.lang;

  // Get posts only for the current language
  const posts = await getBlogPosts(currentLang);

  const breadcrumbNames = {
    sr: { home: 'Početna', blog: 'Blog' },
    en: { home: 'Home', blog: 'Blog' },
    de: { home: 'Startseite', blog: 'Blog' },
  };
  const names = breadcrumbNames[currentLang as keyof typeof breadcrumbNames] || breadcrumbNames.en;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: names.home,
        item: `${siteConfig.url}/${currentLang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: names.blog,
        item: `${siteConfig.url}/${currentLang}/blog`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <BlogList posts={posts} currentLang={currentLang} />
      </main>
      <BlogFooter />
    </div>
  );
}
