import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';

export const metadata: Metadata = {
  title: 'Web Development Beograd | Izrada Sajtova i Aplikacija | NextPixel',
  description: 'Profesionalna izrada web sajtova u Beogradu. React, Next.js, Node.js. Moderna web rešenja za srpsko tržište. ☎️ +387 66 603 900',
  keywords: 'web development Beograd, izrada sajtova Beograd, web aplikacije Beograd, React developer Beograd, Next.js Beograd, Node.js Beograd',
  openGraph: {
    title: 'Web Development Beograd | NextPixel',
    description: 'Moderna web rešenja za biznis u Srbiji',
    images: ['/og-beograd.png'],
  },
  alternates: {
    canonical: 'https://nextpixel.dev/gradovi/beograd',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel - Beograd',
  description: 'Web development agencija za srpsko tržište',
  areaServed: {
    '@type': 'City',
    name: 'Beograd',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.7866,
    longitude: 20.4489,
  },
  url: 'https://nextpixel.dev/gradovi/beograd',
  telephone: '+38766603900',
  priceRange: '€€',
};

export default function BeogradPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Web Development Beograd
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Moderna web rešenja za digitalni rast vašeg biznisa u Srbiji
            </p>
            <div className="flex flex-wrap gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Besplatna Procena Projekta
              </SmoothScrollLink>
              <a href="tel:+38766603900" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                📞
                Konsultacije
              </a>
            </div>
          </div>
        </section>

        {/* Tehnologije */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Najnovije Tehnologije za Beogradske Kompanije
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: '⚛️', name: 'React', desc: 'Moderne UI komponente' },
                { icon: '▲', name: 'Next.js', desc: 'Full-stack framework' },
                { icon: '🟩', name: 'Node.js', desc: 'Backend development' },
                { icon: '🔷', name: 'TypeScript', desc: 'Type-safe kod' },
                { icon: '🎨', name: 'Tailwind CSS', desc: 'Responsive design' },
                { icon: '📱', name: 'React Native', desc: 'Mobilne aplikacije' },
                { icon: '🗄️', name: 'PostgreSQL', desc: 'Baze podataka' },
                { icon: '☁️', name: 'Cloud Deploy', desc: 'AWS, Vercel' },
              ].map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usluge */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Kompletan Spektar Web Development Usluga
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl text-red-600 mb-4">💻</div>
                <h3 className="text-2xl font-bold mb-4">Custom Development</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>SaaS Aplikacije</strong>
                      <p className="text-gray-600">Multi-tenant arhitektura, skalabilna rešenja</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>Enterprise Sistemi</strong>
                      <p className="text-gray-600">CRM, ERP, interno softversko rešenje</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>API Development</strong>
                      <p className="text-gray-600">RESTful i GraphQL API servisi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>Migracija Legacy Sistema</strong>
                      <p className="text-gray-600">Modernizacija postojećih aplikacija</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl text-blue-600 mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Startup Paketi</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>MVP Development</strong>
                      <p className="text-gray-600">Brza izrada prototipa za validaciju ideje</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>Investor-Ready Prezentacije</strong>
                      <p className="text-gray-600">Interaktivni demo i pitch deck</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>Skalabilna Arhitektura</strong>
                      <p className="text-gray-600">Priprema za rast od 0 do 1M korisnika</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                    <div>
                      <strong>Tehnički Savetnik</strong>
                      <p className="text-gray-600">CTO as a Service za startape</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cene */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Transparentne Cene za Beogradsko Tržište
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Tip Projekta</th>
                    <th className="px-6 py-4 text-left">Vreme Izrade</th>
                    <th className="px-6 py-4 text-left">Cena (EUR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Landing Page</td>
                    <td className="px-6 py-4">5-7 dana</td>
                    <td className="px-6 py-4 font-semibold">300-500€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Korporativni Sajt</td>
                    <td className="px-6 py-4">2-3 nedelje</td>
                    <td className="px-6 py-4 font-semibold">800-1500€</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">E-commerce</td>
                    <td className="px-6 py-4">3-4 nedelje</td>
                    <td className="px-6 py-4 font-semibold">1500-3000€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Web Aplikacija</td>
                    <td className="px-6 py-4">1-3 meseca</td>
                    <td className="px-6 py-4 font-semibold">3000-10000€</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Mobilna Aplikacija</td>
                    <td className="px-6 py-4">2-4 meseca</td>
                    <td className="px-6 py-4 font-semibold">5000-15000€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-gray-600">
              * Cene su okvirne i zavise od kompleksnosti projekta. Kontaktirajte nas za tačnu ponudu.
            </p>
          </div>
        </section>

        {/* Garancije */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Naše Garancije za Klijente iz Beograda
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl text-green-600 mx-auto mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">100% Zadovoljstvo</h3>
                <p className="text-gray-600">
                  Besplatne izmene dok ne budete potpuno zadovoljni
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="text-xl font-semibold mb-2">Na Vreme</h3>
                <p className="text-gray-600">
                  Garantujemo isporuku u dogovorenom roku
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Sigurnost</h3>
                <p className="text-gray-600">
                  SSL, GDPR compliant, redovni backup
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hajde da Pokrenemo Vaš Projekat u Beogradu
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Besplatne konsultacije i procena projekta
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Započnite Projekat
              </SmoothScrollLink>
              <a href="mailto:pixelnext9@gmail.com" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                ✉️
                Pošaljite Email
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}