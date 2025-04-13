
import React from 'react';
import { Metadata } from 'next';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import BlogCard from '@/components/blogComponents/BlogCard';
import Image from 'next/image';

export const metadata: Metadata = {
  title: {
    absolute: 'NextPixel Blog',
  },
  description: 'Pročitajte najnovije članke o web razvoju, dizajnu i digitalnom marketingu.',
  keywords: 'blog, web dizajn, razvoj softvera, digitalni marketing, SEO, web aplikacije, web stranica',
};


export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mt-20 text-4xl font-bold mb-8 text-center">NextPixel Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Zašto je potrebna Web Stranica u 2025. godini? */}
            <BlogCard
              title="Zašto je potrebna Web Stranica u 2025. godini?"
              summary="Saznajte zašto je web stranica neophodna za uspjeh vašeg poslovanja u digitalnom dobu."
              slug="why_web_site"
              image={{
                src: '/blogImages/image1.png',
                alt: 'Image 1'
              }}
              date="2025-04-13"
              readTime="5 min"
            />
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
