import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Clock, Star, CheckCircle2, Briefcase, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Development Novi Sad | NextPixel - IT Services Vojvodina',
  description: 'Professional web development services in Novi Sad. Custom websites, mobile apps, and digital solutions for Vojvodina businesses. Expert local team!',
  keywords: 'web development Novi Sad, IT services Novi Sad, website design Vojvodina, web developer Novi Sad, IT kompanija Novi Sad, izrada sajtova Novi Sad',
  alternates: {
    canonical: 'https://nextpixel.com/locations/novi-sad',
    languages: {
      'sr': 'https://nextpixel.com/sr/lokacije/novi-sad',
      'en': 'https://nextpixel.com/en/locations/novi-sad',
      'de': 'https://nextpixel.com/de/standorte/novi-sad',
    },
  },
  openGraph: {
    title: 'NextPixel Novi Sad - Web Development & IT Solutions',
    description: 'Your trusted web development partner in Novi Sad and Vojvodina region.',
    images: ['/images/novi-sad-office.jpg'],
    locale: 'en_US',
    type: 'website',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel Novi Sad Office',
  image: 'https://nextpixel.com/images/novi-sad-office.jpg',
  '@id': 'https://nextpixel.com/locations/novi-sad',
  url: 'https://nextpixel.com/locations/novi-sad',
  telephone: '+381-21-123-4567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bulevar Mihajla Pupina 10',
    addressLocality: 'Novi Sad',
    addressRegion: 'Vojvodina',
    postalCode: '21000',
    addressCountry: 'RS'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.2671,
    longitude: 19.8335
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
    ratingValue: '4.8',
    reviewCount: '67'
  }
};

export default function NoviSadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Web Development Services in Novi Sad
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Digital Innovation Hub of Vojvodina
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Building2 className="w-5 h-5" />
                  <span>Novi Sad Tech Hub</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>30+ Local Clients</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/portfolio"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  See Our Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services for Novi Sad */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              IT Solutions for Novi Sad Businesses
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              From startups at Novi Sad Science and Technology Park to established Vojvodina enterprises, 
              we deliver cutting-edge digital solutions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Startup Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for Novi Sad&apos;s thriving startup ecosystem. MVP development, scalable architecture, investor-ready platforms.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Rapid MVP development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Scalable cloud infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Startup-friendly pricing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Enterprise Systems</h3>
                <p className="text-gray-600 mb-4">
                  Complex solutions for Vojvodina&apos;s agricultural, industrial, and service sectors. ERP integration, custom platforms.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Agricultural tech solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Manufacturing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Supply chain management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Education Platforms</h3>
                <p className="text-gray-600 mb-4">
                  Supporting Novi Sad University and educational institutions with modern e-learning and management systems.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>E-learning platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Student management systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Virtual classroom solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Local Industries */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Serving Novi Sad&apos;s Key Industries
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-lg font-semibold mb-2">Agriculture Tech</h3>
                <p className="text-gray-600 text-sm">
                  Digital solutions for Vojvodina&apos;s agricultural sector
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-lg font-semibold mb-2">Manufacturing</h3>
                <p className="text-gray-600 text-sm">
                  Industry 4.0 solutions for local manufacturers
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-600 text-sm">
                  Supporting Novi Sad&apos;s academic excellence
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm">
                  Digital health solutions for medical institutions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Novi Sad */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Partner with Novi Sad Web Developers?
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Tech Hub Excellence</h3>
                      <p className="text-gray-600">
                        Part of Novi Sad&apos;s growing IT ecosystem with access to top talent from local universities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Vojvodina Market Knowledge</h3>
                      <p className="text-gray-600">
                        Deep understanding of regional business needs and consumer preferences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Multilingual Capabilities</h3>
                      <p className="text-gray-600">
                        Serbian, Hungarian, Slovak, and English language support for diverse audiences.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">EXIT Festival Partner</h3>
                      <p className="text-gray-600">
                        Experience with high-traffic events and tourism-related digital projects.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">European Capital of Culture</h3>
                      <p className="text-gray-600">
                        Supporting Novi Sad&apos;s cultural initiatives with innovative digital solutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Competitive Pricing</h3>
                      <p className="text-gray-600">
                        High-quality development at competitive rates compared to Western Europe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Novi Sad Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join dozens of successful Vojvodina companies who trust NextPixel for their digital presence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Your Project
              </Link>
              <a
                href="tel:+38121123456"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Call +381 21 123 4567
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Visit us at Bulevar Mihajla Pupina 10, Novi Sad</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}