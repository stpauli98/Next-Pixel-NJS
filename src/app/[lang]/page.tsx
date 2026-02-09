import React from 'react';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Section Components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';

// Lazy loaded komponente za bolje performance
import { LazyPortfolioSection, LazyContactSection } from '@/components/LazySection';

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

import { Metadata } from 'next';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';

/**
 * Generate metadata for home page based on locale
 */
export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('home', locale);
}

export default async function Home({ params }: HomeProps) {
  const resolvedParams = await params;
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <LazyPortfolioSection />
        <WhyChooseUsSection />
        <LazyContactSection />
      </main>
      <Footer />
    </div>
  );
}
