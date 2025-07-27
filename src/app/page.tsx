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

export default function Home() {
  return (
    <div className="App">
      <Navbar />
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
