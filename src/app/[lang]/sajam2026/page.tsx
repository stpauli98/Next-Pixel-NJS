import { Metadata } from 'next';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SajamHero from '@/components/sajam/SajamHero';

// Lazy load below-fold sections — HTML still SSR'd for SEO
const SajamProblems = dynamic(() => import('@/components/sajam/SajamProblems'), { ssr: true });
const SajamProof = dynamic(() => import('@/components/sajam/SajamProof'), { ssr: true });
const SajamOffer = dynamic(() => import('@/components/sajam/SajamOffer'), { ssr: true });
const SajamCTA = dynamic(() => import('@/components/sajam/SajamCTA'), { ssr: true });

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return getPageMetadata('sajam2026', locale);
}

export async function generateStaticParams() {
  return [{ lang: 'sr' }, { lang: 'en' }, { lang: 'de' }];
}

function getSajamStructuredData(locale: string) {
  const baseUrl = 'https://www.nextpixel.dev';
  const isSr = locale === 'sr';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: isSr
          ? 'NextPixel na Sajamskim danima Gradiška 2026'
          : 'NextPixel at Gradiška Fair Days 2026',
        description: isSr
          ? 'Specijalna ponuda za web usluge na Sajamskim danima Gradiška i Banja Luka EXPO 2026.'
          : 'Special offer for web services at Gradiška Fair Days and Banja Luka EXPO 2026.',
        startDate: '2026-05-01',
        endDate: '2026-05-04',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: isSr ? 'Sajamski centar Gradiška' : 'Gradiška Fair Center',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gradiška',
            addressRegion: 'Republika Srpska',
            addressCountry: 'BA',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'NextPixel',
          url: baseUrl,
        },
        offers: [
          {
            '@type': 'Offer',
            name: isSr ? 'Poslovni web sajt' : 'Business Website',
            price: '999',
            priceCurrency: 'BAM',
            validFrom: '2026-05-01',
            validThrough: '2026-06-30',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/${locale}/sajam2026`,
          },
          {
            '@type': 'Offer',
            name: isSr ? 'Online prodavnica' : 'Online Store',
            price: '2499',
            priceCurrency: 'BAM',
            validFrom: '2026-05-01',
            validThrough: '2026-06-30',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/${locale}/sajam2026`,
          },
          {
            '@type': 'Offer',
            name: isSr ? 'Booking sistem' : 'Booking System',
            price: '1499',
            priceCurrency: 'BAM',
            validFrom: '2026-05-01',
            validThrough: '2026-06-30',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/${locale}/sajam2026`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isSr ? 'Šta ako nemam web sajt?' : 'What if I don\'t have a website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSr
                ? 'Profesionalni web sajt za firmu u Gradišci košta od 999 KM i gotov je za 4-6 sedmica. Klijenti vas ne mogu naći online — konkurencija koja ima sajt dobija vaše mušterije.'
                : 'A professional website for a business in Gradiška costs from 999 KM and is ready in 4-6 weeks. Clients can\'t find you online — competitors with websites are getting your customers.',
            },
          },
          {
            '@type': 'Question',
            name: isSr ? 'Šta ako mi je sajt zastario?' : 'What if my website is outdated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSr
                ? 'Redizajn modernizuje izgled i poboljšava rezultate. Sajt koji ne radi na mobilnom i sporo se učitava tjera klijente na konkurenciju.'
                : 'A redesign modernizes the look and improves results. A website that doesn\'t work on mobile and loads slowly drives clients to competitors.',
            },
          },
          {
            '@type': 'Question',
            name: isSr ? 'Koliko košta online prodavnica?' : 'How much does an online store cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSr
                ? 'Online prodavnica kreće od 2.499 KM sa sajamskim popustom od 20%. Vaši proizvodi postaju dostupni kupcima u cijeloj BiH.'
                : 'An online store starts from 2,499 KM with the 20% fair discount. Your products become available to buyers across all of BiH.',
            },
          },
          {
            '@type': 'Question',
            name: isSr ? 'Da li mogu platiti na rate?' : 'Can I pay in installments?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isSr
                ? 'Da, nudimo plaćanje u do 6 rata bez kamata za sve sajamske ponude.'
                : 'Yes, we offer payment in up to 6 interest-free installments for all fair offers.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${baseUrl}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isSr ? 'Sajam 2026' : 'Trade Fair 2026',
            item: `${baseUrl}/${locale}/sajam2026`,
          },
        ],
      },
    ],
  };
}

export default async function Sajam2026Page({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang;

  const structuredData = getSajamStructuredData(locale);

  return (
    <div className="App">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <header>
        <Navbar />
      </header>
      <main>
        <SajamHero />
        <SajamProblems />
        <SajamProof />
        <SajamOffer />
        <SajamCTA />
      </main>
      <Footer />
    </div>
  );
}
