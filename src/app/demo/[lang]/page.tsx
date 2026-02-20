import type { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>;
};

const meta: Record<string, { title: string; description: string; locale: string }> = {
  de: {
    title: 'Termini - Online Buchungssystem Demo',
    description: 'Testen Sie unser Online-Buchungssystem. Einfach, schnell und benutzerfreundlich. Perfekt für Friseure, Kosmetik, Fitness und mehr.',
    locale: 'de_DE',
  },
  en: {
    title: 'Termini - Online Booking System Demo',
    description: 'Try our online booking system. Simple, fast and user-friendly. Perfect for hair salons, beauty, fitness and more.',
    locale: 'en_US',
  },
  sr: {
    title: 'Termini - Demo Online Booking Sistema',
    description: 'Isprobajte naš online booking sistem. Jednostavan, brz i prilagođen korisnicima. Savršen za frizerske salone, kozmetiku, fitness i više.',
    locale: 'sr_RS',
  },
};

export function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'sr' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.de;
  const url = `https://booking.nextpixel.dev/demo/${lang}`;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: 'NextPixel Booking',
      type: 'website',
      locale: m.locale,
      images: [
        {
          url: `https://booking.nextpixel.dev/${lang}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: m.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`https://booking.nextpixel.dev/${lang}/opengraph-image`],
    },
    alternates: {
      canonical: url,
      languages: {
        de: 'https://booking.nextpixel.dev/demo/de',
        en: 'https://booking.nextpixel.dev/demo/en',
        sr: 'https://booking.nextpixel.dev/demo/sr',
      },
    },
  };
}

export default async function DemoPage({ params }: Props) {
  const { lang } = await params;

  return (
    <iframe
      src={`/demo/index.html#/${lang}`}
      title={meta[lang]?.title || 'Termini Demo'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
    />
  );
}
