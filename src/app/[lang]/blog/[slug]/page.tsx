import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { BlogContent } from '@/components/blogComponents/BlogContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const post = await getBlogPost(lang, slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nextpixel.dev/blog/${lang}/${slug}`,
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BlogNavbar lang={lang} />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <BlogContent blogData={{
            // Ensure we have a default empty object if blogData is undefined
            ...(post.blogData || {}),
            // Always provide these required fields from the post itself
            date: post.date,
            author: post.author,
            excerpt: post.excerpt,
            tags: post.tags || []
          }}>
            {post.content}
          </BlogContent>
        </div>
      </main>
      <BlogFooter lang={lang} />
    </div>
  );
}
