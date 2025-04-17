import React from 'react';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Section Components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ContactSection from '@/components/sections/ContactSection';

export const metadata = {
  title: "NextPixel - Digitalna agencija za web i softverska rješenja",
  description: "Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.",
  openGraph: {
    title: "NextPixel - Digitalna agencija za web i softverska rješenja",
    description: "Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.",
    url: "https://next-pixel-njs.onrender.com",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextPixel - Digitalna agencija za web i softverska rješenja",
      },
    ],
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextPixel - Digitalna agencija za web i softverska rješenja",
    description: "Profesionalna digitalna agencija specijalizirana za web dizajn, razvoj softvera i digitalni marketing.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextPixel - Digitalna agencija za web i softverska rješenja",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
