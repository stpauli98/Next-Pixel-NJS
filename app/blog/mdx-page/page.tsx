import React from 'react';
import { Metadata } from 'next';
import Content from './page.mdx';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Dobrodošli na NextPixel Blog',
  description: 'Naša prva MDX stranica koja kombinira Markdown s React komponentama.',
};

export default function MdxPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <article className="prose lg:prose-xl mx-auto">
          <Content />
        </article>
      </div>
      <Footer />
    </div>
  );
}
