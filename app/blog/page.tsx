import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';

export const metadata: Metadata = {
  title: 'NextPixel Blog',
  description: 'Pročitajte najnovije članke o web razvoju, dizajnu i digitalnom marketingu.',
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  <Link href="/blog/why_web_site" className="text-nextpixel-dark hover:text-nextpixel-turquoise transition-colors">
                    Zašto je potrebna Web Stranica u 2025. godini?
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  Saznajte zašto je web stranica neophodna za uspjeh vašeg poslovanja u digitalnom dobu.
                </p>
                <Link 
                  href="/blog/why_web_site" 
                  className="inline-block bg-nextpixel-turquoise text-white py-2 px-4 rounded hover:bg-nextpixel-dark transition-colors"
                >
                  Pročitaj više
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
