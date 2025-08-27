import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';

export const metadata: Metadata = {
  title: 'Web Dizajn Sarajevo | Izrada Web Stranica i Aplikacija | NextPixel',
  description: 'Profesionalna izrada web stranica u Sarajevu. Moderni dizajn, brza izrada, SEO optimizacija. Web development agencija sa iskustvom. ☎️ +387 66 603 900',
  keywords: 'web dizajn Sarajevo, izrada web stranica Sarajevo, web development Sarajevo, digitalna agencija Sarajevo, aplikacije Sarajevo, web sajt Sarajevo',
  openGraph: {
    title: 'Web Dizajn Sarajevo | NextPixel',
    description: 'Profesionalne web stranice za vaš biznis u Sarajevu',
    images: ['/og-sarajevo.png'],
  },
  alternates: {
    canonical: 'https://nextpixel.dev/gradovi/sarajevo',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NextPixel - Sarajevo',
  description: 'Web development agencija u Sarajevu',
  areaServed: {
    '@type': 'City',
    name: 'Sarajevo',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.8563,
    longitude: 18.4131,
  },
  url: 'https://nextpixel.dev/gradovi/sarajevo',
  telephone: '+38766603900',
  priceRange: '€€',
};

export default function SarajevoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Web Dizajn Sarajevo
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Vaš partner za digitalnu transformaciju u glavnom gradu BiH
            </p>
            <div className="flex flex-wrap gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Besplatne Konsultacije
              </SmoothScrollLink>
              <a href="tel:+38766603900" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
                📞
                Pozovite Odmah
              </a>
            </div>
          </div>
        </section>

        {/* Usluge za Sarajevo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Web Development Rješenja za Sarajevske Biznise
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl text-green-600 mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-2">Multijezične Stranice</h3>
                <p className="text-gray-600">
                  Bosanski, engleski, njemački - dosegnite širu publiku
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl text-green-600 mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Hitna Izrada</h3>
                <p className="text-gray-600">
                  Express usluga - web stranica za 5-7 radnih dana
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl text-green-600 mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">SEO Optimizacija</h3>
                <p className="text-gray-600">
                  Prvi na Google-u za "Sarajevo" pretrage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paketi i Cijene */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Paketi Prilagođeni Sarajevskom Tržištu
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Startup Paket',
                  price: '450€',
                  features: ['5 stranica', 'Mobile responsive', 'Osnovna SEO', 'SSL certifikat', 'Hosting 1 godina'],
                  popular: false,
                },
                {
                  title: 'Business Paket',
                  price: '950€',
                  features: ['10 stranica', 'CMS sistem', 'SEO optimizacija', 'Google Analytics', 'Email adrese'],
                  popular: true,
                },
                {
                  title: 'E-Commerce',
                  price: '1850€',
                  features: ['Neograničeno proizvoda', 'Online plaćanje', 'Multi-valuta', 'Inventar sistem', 'Marketing alati'],
                  popular: false,
                },
              ].map((pkg, index) => (
                <div key={index} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition ${pkg.popular ? 'ring-2 ring-green-600' : ''}`}>
                  {pkg.popular && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      NAJPOPULARNIJI
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mt-4 mb-3">{pkg.title}</h3>
                  <p className="text-3xl font-bold text-green-600 mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        ✓
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <SmoothScrollLink href="/#contact" className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    Odaberite Paket
                  </SmoothScrollLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industrije */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Specijalizovani za Sarajevske Industrije
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🏥', title: 'Zdravstvo', desc: 'Privatne klinike i ordinacije' },
                { icon: '🎓', title: 'Obrazovanje', desc: 'Škole i edukacijski centri' },
                { icon: '🏪', title: 'Trgovina', desc: 'Online i fizičke prodavnice' },
                { icon: '🏗️', title: 'Građevina', desc: 'Građevinske kompanije' },
                { icon: '🍽️', title: 'Ugostiteljstvo', desc: 'Restorani i hoteli' },
                { icon: '⚖️', title: 'Pravo', desc: 'Advokatske kancelarije' },
                { icon: '🏢', title: 'Nekretnine', desc: 'Agencije za nekretnine' },
                { icon: '✈️', title: 'Turizam', desc: 'Turističke agencije' },
              ].map((industry, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="text-4xl mb-3">{industry.icon}</div>
                  <h3 className="font-semibold text-lg mb-1">{industry.title}</h3>
                  <p className="text-gray-600 text-sm">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proces rada */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Kako Radimo sa Klijentima iz Sarajeva
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  { step: '1', title: 'Besplatne Konsultacije', desc: 'Online ili uživo sastanak za analizu potreba' },
                  { step: '2', title: 'Ponuda za 24h', desc: 'Detaljna ponuda sa rokom i cijenom' },
                  { step: '3', title: 'Dizajn i Razvoj', desc: 'Izrada prema dogovorenim specifikacijama' },
                  { step: '4', title: 'Testiranje', desc: 'Provjera funkcionalnosti i optimizacija' },
                  { step: '5', title: 'Lansiranje', desc: 'Postavljanje na server i obuka za korištenje' },
                  { step: '6', title: 'Podrška', desc: 'Kontinuirana tehnička podrška i održavanje' },
                ].map((process, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{process.title}</h3>
                      <p className="text-gray-600">{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Što Kažu Naši Klijenti iz Sarajeva
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: 'Odličan tim, brza realizacija i profesionalan pristup. Web stranica nam je povećala prodaju za 40%.',
                  author: 'Amir H.',
                  company: 'Trgovinska radnja',
                },
                {
                  text: 'Najbolja investicija za naš biznis. SEO optimizacija je dovela do prvog mjesta na Google-u.',
                  author: 'Selma K.',
                  company: 'Privatna ordinacija',
                },
                {
                  text: 'Hitno smo trebali web shop i NextPixel je završio posao za samo 7 dana. Impresivno!',
                  author: 'Edin M.',
                  company: 'Online prodavnica',
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Započnite Svoj Online Uspjeh u Sarajevu
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Kontaktirajte nas danas za besplatnu ponudu
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SmoothScrollLink href="/#contact" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Zatražite Ponudu
              </SmoothScrollLink>
              <a href="tel:+38766603900" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
                📞
                066 603 900
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}