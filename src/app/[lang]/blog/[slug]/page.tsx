import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';

// Dynamic import for BlogContent since it may use client-side features
import { BlogContent } from '@/components/blogComponents/BlogContent';

const baseUrl = 'https://nextpixel.dev';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const post = await getBlogPost(lang, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const localeCode = lang === 'sr' ? 'sr_RS' : lang === 'en' ? 'en_US' : 'de_DE';

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${slug}`,
      languages: {
        'sr': `${baseUrl}/sr/blog/${slug}`,
        'en': `${baseUrl}/en/blog/${slug}`,
        'de': `${baseUrl}/de/blog/${slug}`,
        'x-default': `${baseUrl}/sr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${lang}/blog/${slug}`,
      type: 'article',
      locale: localeCode,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: (typeof post.blogData.ogImage === 'string' ? post.blogData.ogImage : null) || '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      card: 'summary_large_image',
      images: [
        {
          url: (typeof post.blogData.ogImage === 'string' ? post.blogData.ogImage : null) || '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs;
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const post = await getBlogPost(lang, slug);

  if (!post) {
    notFound();
  }

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NextPixel',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/NextPixelV2.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${lang}/blog/${slug}`,
    },
    inLanguage: lang,
    keywords: post.tags?.join(', '),
    image: (typeof post.blogData?.image === 'string' ? `${baseUrl}${post.blogData.image}` : null) || `${baseUrl}/opengraph-image.png`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BlogNavbar lang={lang} />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <article>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {post.date && (
              <time dateTime={post.date} className="sr-only">
                {post.date}
              </time>
            )}
            <BlogContent blogData={{
              ...(post.blogData || {}),
              date: post.date,
              author: post.author,
              excerpt: post.excerpt,
              tags: post.tags || []
            }}>
              {post.content}
            </BlogContent>
          </article>
        </div>
      </main>
      <BlogFooter lang={lang} />
    </div>
  );
}
