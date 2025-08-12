import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Clock, Star, CheckCircle2, TrendingUp, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Development Niš | NextPixel - IT Services Southern Serbia',
  description: 'Top web development agency in Niš. Custom websites, applications, and digital solutions for Southern Serbia businesses. Competitive prices, expert team!',
  keywords: 'web development Niš, IT services Niš, website design Southern Serbia, web developer Niš, IT kompanija Niš, izrada sajtova Niš',
  alternates: {
    canonical: 'https://nextpixel.com/locations/nis',
    languages: {
      'sr': 'https://nextpixel.com/sr/lokacije/nis',
      'en': 'https://nextpixel.com/en/locations/nis',
      'de': 'https://nextpixel.com/de/standorte/nis',
    },
  },
  openGraph: {
    title: 'NextPixel Niš - Professional Web Development Services',
    description: 'Leading digital agency serving Niš and Southern Serbia with modern web solutions.',
    images: ['/images/nis-office.jpg'],
    locale: 'en_US',
    type: 'website',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel Niš Office',
  image: 'https://nextpixel.com/images/nis-office.jpg',
  '@id': 'https://nextpixel.com/locations/nis',
  url: 'https://nextpixel.com/locations/nis',
  telephone: '+381-18-123-4567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Obrenovićeva 10',
    addressLocality: 'Niš',
    addressRegion: 'Southern Serbia',
    postalCode: '18000',
    addressCountry: 'RS'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.3209,
    longitude: 21.8958
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
    reviewCount: '45'
  }
};

export default function NisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Web Development Services in Niš
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Southern Serbia&apos;s Digital Innovation Partner
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5" />
                  <span>Growing Tech Scene</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span>Fast Delivery</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Started Today
                </Link>
                <Link
                  href="/portfolio"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Digital Solutions for Niš Businesses
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Supporting Niš&apos;s growing economy with cutting-edge web development and IT solutions. 
              From local SMEs to international companies with offices in Niš.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">International Business</h3>
                <p className="text-gray-600 mb-4">
                  Supporting Niš&apos;s international companies with global-standard web solutions and multilingual platforms.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Multi-language websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>International SEO</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Global payment integration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Local Business Growth</h3>
                <p className="text-gray-600 mb-4">
                  Helping Niš SMEs establish strong online presence and reach customers across Southern Serbia.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Local SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Google My Business setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Regional marketing integration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Tech Startups</h3>
                <p className="text-gray-600 mb-4">
                  Accelerating Niš&apos;s startup ecosystem with MVP development and scalable digital platforms.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Rapid prototyping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Cloud-native architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Investor-ready platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Serving Niš&apos;s Key Economic Sectors
            </h2>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-semibold mb-2">IT & Software</h3>
                <p className="text-gray-600 text-sm">
                  Supporting Niš&apos;s growing IT sector
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-lg font-semibold mb-2">Manufacturing</h3>
                <p className="text-gray-600 text-sm">
                  Digital transformation for factories
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">🛍️</div>
                <h3 className="text-lg font-semibold mb-2">Retail & Commerce</h3>
                <p className="text-gray-600 text-sm">
                  E-commerce for local retailers
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-600 text-sm">
                  Solutions for Niš University
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-lg font-semibold mb-2">Tourism</h3>
                <p className="text-gray-600 text-sm">
                  Promoting Niš tourism online
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Success Stories from Niš
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-red-600 mb-2">+250%</div>
                <div className="text-xl font-semibold mb-2">Online Sales Growth</div>
                <p className="text-gray-600">
                  Local Niš retailer increased online revenue after launching e-commerce platform.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-orange-600 mb-2">3x</div>
                <div className="text-xl font-semibold mb-2">Lead Generation</div>
                <p className="text-gray-600">
                  Manufacturing company tripled B2B leads with new website and SEO strategy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-yellow-600 mb-2">45%</div>
                <div className="text-xl font-semibold mb-2">Cost Reduction</div>
                <p className="text-gray-600">
                  Education platform reduced operational costs through digital automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Niš Developers */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Advantages of Working with Niš Web Developers
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Cost-Effective Solutions</h3>
                        <p className="text-gray-600 text-sm">
                          Competitive pricing with EU-quality standards. Save 30-50% compared to Western Europe.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Growing IT Hub</h3>
                        <p className="text-gray-600 text-sm">
                          Part of Niš&apos;s expanding technology sector with access to talented developers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Strategic Location</h3>
                        <p className="text-gray-600 text-sm">
                          Gateway to Southern Serbia and Balkans markets. Perfect for regional expansion.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">University Partnerships</h3>
                        <p className="text-gray-600 text-sm">
                          Collaboration with Niš University ensures access to latest technologies and talent.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Cultural Understanding</h3>
                        <p className="text-gray-600 text-sm">
                          Deep knowledge of local market needs and consumer behavior in Southern Serbia.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold">6</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Dedicated Support</h3>
                        <p className="text-gray-600 text-sm">
                          Personal attention and long-term partnership approach to client relationships.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Let&apos;s Build Your Digital Success in Niš
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              From Constantine the Great&apos;s birthplace to modern digital innovation. 
              Your Niš business deserves a world-class web presence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Request Free Quote
              </Link>
              <a
                href="tel:+38118123456"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                +381 18 123 4567
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Obrenovićeva 10, Niš</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>nis@nextpixel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri 9:00-18:00</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}