import React from 'react';
import BookingClientLayout from '../client-layout';
import BookingNavbar from '@/components/booking/BookingNavbar';
import BookingFooter from '@/components/booking/BookingFooter';
import BookingHeroSection from '@/components/booking/sections/BookingHeroSection';
import BookingFeaturesSection from '@/components/booking/sections/BookingFeaturesSection';
import BookingProcessSection from '@/components/booking/sections/BookingProcessSection';
import BookingPricingSection from '@/components/booking/sections/BookingPricingSection';
import BookingFaqSection from '@/components/booking/sections/BookingFaqSection';
import BookingCtaSection from '@/components/booking/sections/BookingCtaSection';

export default async function BookingPage() {
  return (
    <BookingClientLayout>
      <div className="App">
        <header>
          <BookingNavbar />
        </header>
        <main>
          <BookingHeroSection />
          <BookingFeaturesSection />
          <BookingProcessSection />
          <BookingPricingSection />
          <BookingFaqSection />
          <BookingCtaSection />
        </main>
        <BookingFooter />
      </div>
    </BookingClientLayout>
  );
}
