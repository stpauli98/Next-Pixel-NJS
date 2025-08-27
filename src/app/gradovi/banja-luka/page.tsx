import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';

export const metadata: Metadata = {
  title: 'Web Dizajn Banja Luka | Izrada Sajtova i Aplikacija | NextPixel',
  description: 'Profesionalna izrada web stranica u Banja Luci. Moderni dizajn, SEO optimizacija, povoljne cijene. Besplatna ponuda za vaš biznis. ☎️ +387 66 603 900',
  keywords: 'web dizajn Banja Luka, izrada sajtova Banja Luka, web stranice Banja Luka, digitalna agencija Banja Luka, web development Banja Luka, aplikacije Banja Luka',
  openGraph: {
    title: 'Web Dizajn Banja Luka | NextPixel',
    description: 'Vaš lokalni partner za digitalnu transformaciju u Banja Luci',
    images: ['/og-banja-luka.png'],
  },
  alternates: {
    canonical: 'https://nextpixel.dev/gradovi/banja-luka',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel - Banja Luka',
  description: 'Web development i digitalne usluge u Banja Luci',
  areaServed: {
    '@type': 'City',
    name: 'Banja Luka',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.7722,
    longitude: 17.1910,
  },
  url: 'https://nextpixel.dev/gradovi/banja-luka',
  telephone: '+38766603900',
  priceRange: '€€',
};

export default function BanjaLukaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Web Dizajn Banja Luka
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Profesionalna izrada web stranica i aplikacija za vaš biznis u Banja Luci
            </p>
            <div className="flex flex-wrap gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Besplatna Ponuda
              </SmoothScrollLink>
              <a href="tel:+38766603900" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                📞
                066 603 900
              </a>
            </div>
          </div>
        </section>

        {/* Lokalne Prednosti */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Zašto NextPixel za Web Development u Banja Luci?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl text-blue-600 mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">Lokalno Prisustvo</h3>
                <p className="text-gray-600">
                  Razumijemo lokalno tržište Banja Luke i potrebe biznisa u Republici Srpskoj
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl text-blue-600 mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Brza Izrada</h3>
                <p className="text-gray-600">
                  Web stranica gotova za 2-3 sedmice. Hitna izrada moguća za 7 dana
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl text-blue-600 mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Povoljne Cijene</h3>
                <p className="text-gray-600">
                  Prilagođene lokalnom tržištu. Mogućnost plaćanja na rate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usluge */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Web Development Usluge u Banja Luci
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Web Stranice za Firme',
                  price: 'od 500€',
                  features: ['Responsive dizajn', 'SEO optimizacija', 'Kontakt forma', 'Google mape'],
                },
                {
                  title: 'Online Prodavnice',
                  price: 'od 1500€',
                  features: ['Katalog proizvoda', 'Korpa za kupovinu', 'Online plaćanje', 'Admin panel'],
                },
                {
                  title: 'Web Aplikacije',
                  price: 'od 2500€',
                  features: ['Custom funkcionalnosti', 'Baza podataka', 'Korisnički sistem', 'API integracije'],
                },
                {
                  title: 'WordPress Sajtovi',
                  price: 'od 400€',
                  features: ['Lako upravljanje', 'Blog sistem', 'Pluginovi', 'Teme po mjeri'],
                },
                {
                  title: 'Redizajn Postojećeg Sajta',
                  price: 'od 300€',
                  features: ['Moderni dizajn', 'Bolje performanse', 'Mobile-first', 'SEO poboljšanja'],
                },
                {
                  title: 'Održavanje i Podrška',
                  price: 'od 50€/mjesec',
                  features: ['Redovni backup', 'Sigurnosni update', 'Tehnička podrška', 'Izmjene sadržaja'],
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{service.price}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        ✓
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <SmoothScrollLink href="/#contact" className="block mt-6 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Zatraži Ponudu
                  </SmoothScrollLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lokalni Klijenti */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Uspješni Projekti u Banja Luci i Republici Srpskoj
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Restorani i kafići',
                'Privatne ordinacije',
                'Prodavnice i butici',
                'Građevinske firme',
                'Advokatske kancelarije',
                'Frizerski i kozmetički saloni',
              ].map((industry, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                  <h3 className="font-semibold text-lg">{industry}</h3>
                  <p className="text-gray-600 mt-2">Specijalizovana rješenja prilagođena vašoj industriji</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Često Postavljana Pitanja - Banja Luka
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Koliko košta izrada web stranice u Banja Luci?',
                  a: 'Cijene počinju od 400€ za osnovnu web stranicu. Tačna cijena zavisi od funkcionalnosti i obima projekta. Nudimo besplatnu ponudu prilagođenu vašim potrebama.',
                },
                {
                  q: 'Koliko traje izrada sajta?',
                  a: 'Standardna web stranica je gotova za 2-3 sedmice. Za hitne slučajeve nudimo ubrzanu izradu za 7 dana uz dodatnu nadoknadu.',
                },
                {
                  q: 'Da li mogu sam mijenjati sadržaj na sajtu?',
                  a: 'Da, sve naše web stranice dolaze sa jednostavnim sistemom za upravljanje sadržajem (CMS) i besplatnom obukom.',
                },
                {
                  q: 'Da li nudite održavanje web stranica?',
                  a: 'Da, nudimo mjesečne pakete održavanja od 50€ koji uključuju backup, sigurnosne update-ove i izmjene sadržaja.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Započnite Digitalnu Transformaciju Vašeg Biznisa u Banja Luci
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Besplatne konsultacije i ponuda u roku od 24 sata
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Zatražite Ponudu
              </SmoothScrollLink>
              <a href="mailto:pixelnext9@gmail.com" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                ✉️
                pixelnext9@gmail.com
              </a>
            </div>
            <div className="mt-8 flex justify-center items-center gap-6 text-sm">
              <span className="flex items-center">
                🕐
                Pon-Pet: 09-18h
              </span>
              <span className="flex items-center">
                📞
                066 603 900
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}