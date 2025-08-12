import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Development Belgrade | NextPixel - Digital Agency Serbia',
  description: 'Leading web development agency in Belgrade. Custom websites, mobile apps, and e-commerce solutions. Local team, global standards. Free consultation!',
  keywords: 'web development Belgrade, website design Belgrade, Belgrade digital agency, web developer Beograd, IT kompanija Beograd, izrada sajtova Beograd',
  alternates: {
    canonical: 'https://nextpixel.com/locations/belgrade',
    languages: {
      'sr': 'https://nextpixel.com/sr/lokacije/beograd',
      'en': 'https://nextpixel.com/en/locations/belgrade',
      'de': 'https://nextpixel.com/de/standorte/belgrad',
    },
  },
  openGraph: {
    title: 'NextPixel Belgrade - Professional Web Development Services',
    description: 'Your local web development partner in Belgrade. Creating digital solutions that drive business growth.',
    images: ['/images/belgrade-office.jpg'],
    locale: 'en_US',
    type: 'website',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel Belgrade Office',
  image: 'https://nextpixel.com/images/belgrade-office.jpg',
  '@id': 'https://nextpixel.com/locations/belgrade',
  url: 'https://nextpixel.com/locations/belgrade',
  telephone: '+381-11-123-4567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Knez Mihailova 10',
    addressLocality: 'Belgrade',
    addressRegion: 'Central Serbia',
    postalCode: '11000',
    addressCountry: 'RS'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.8176,
    longitude: 20.4633
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '89'
  }
};

export default function BelgradePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Web Development Services in Belgrade
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Your Local Digital Partner in Serbia&apos;s Capital
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Building2 className="w-5 h-5" />
                  <span>Local Belgrade Team</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span>50+ Projects Delivered</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Free Consultation
                </Link>
                <Link
                  href="/portfolio"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Web Development Solutions for Belgrade Businesses
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Corporate Websites</h3>
                <p className="text-gray-600 mb-4">
                  Professional websites for Belgrade companies. Modern design, SEO optimized, multilingual support.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Responsive design for all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Serbian & English language support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Local SEO optimization</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">E-commerce Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Online stores for Belgrade retailers. Secure payments, inventory management, local delivery integration.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Serbian payment gateways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Local shipping integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Multi-currency support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Custom Applications</h3>
                <p className="text-gray-600 mb-4">
                  Tailored web applications for Belgrade enterprises. Process automation, data management, API integration.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Business process automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Integration with local services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>GDPR compliant solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Local Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose a Belgrade-Based Web Developer?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Market Understanding</h3>
                    <p className="text-gray-600">
                      We understand Belgrade&apos;s business environment, consumer behavior, and local regulations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Same Time Zone Support</h3>
                    <p className="text-gray-600">
                      Real-time communication and support during Belgrade business hours. No delays, immediate responses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Face-to-Face Meetings</h3>
                    <p className="text-gray-600">
                      Meet our team in person at our Belgrade office. Build trust through direct collaboration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Serbian Language Expertise</h3>
                    <p className="text-gray-600">
                      Native Serbian speakers ensuring perfect content localization and cultural relevance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local SEO Advantage</h3>
                    <p className="text-gray-600">
                      Expertise in ranking for Belgrade and Serbian search queries. Know what local customers search for.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Business Network</h3>
                    <p className="text-gray-600">
                      Connected with Belgrade&apos;s business community. Partnerships with local service providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Belgrade Web Project?
              </h2>
              <p className="text-xl mb-8 opacity-95">
                Get a free consultation with our Belgrade team. We speak your language and understand your market.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-sm opacity-75">Call Us</div>
                    <div className="font-semibold">+381 11 123 4567</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-sm opacity-75">Email</div>
                    <div className="font-semibold">belgrade@nextpixel.com</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-sm opacity-75">Visit Us</div>
                    <div className="font-semibold">Knez Mihailova 10</div>
                  </div>
                </div>
              </div>
              
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}