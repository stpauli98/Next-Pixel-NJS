import React from 'react';
import { Metadata } from 'next';
import Content from './content.mdx';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Define metadata from the MDX frontmatter
export const metadata: Metadata = {
  title: 'Koliko košta izrada sajta u 2025? Kompletan vodič za firme',
  description: 'Ako planirate novi sajt, ovaj vodič će vam pomoći da razumete cene, šta sve ulazi u ponudu i na šta da obratite pažnju.'
};

export default function WhyWebSite() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Content />
      </main>
      <Footer />
    </div>
  );
}
