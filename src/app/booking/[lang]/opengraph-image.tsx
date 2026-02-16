import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const content: Record<string, { title: string; subtitle: string; price: string; badge: string }> = {
  de: {
    title: 'Ihr maßgeschneidertes Online-Buchungssystem',
    subtitle: 'Mehr Buchungen. Weniger Aufwand.',
    price: 'Ab 990 EUR',
    badge: 'Buchungssystem',
  },
  en: {
    title: 'Your Custom Online Booking System',
    subtitle: 'More bookings. Less effort.',
    price: 'From 990 EUR',
    badge: 'Booking System',
  },
  sr: {
    title: 'Vaš prilagođeni online booking sistem',
    subtitle: 'Više rezervacija. Manje posla.',
    price: 'Od 990 EUR',
    badge: 'Booking Sistem',
  },
};

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = content[lang] || content.de;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2E8B9A 100%)',
          color: 'white',
          padding: 60,
          textAlign: 'center',
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 32,
            fontSize: 36,
          }}
        >
          <span style={{ fontWeight: 700 }}>Next</span>
          <span style={{ color: '#2E8B9A', fontWeight: 700 }}>Pixel</span>
          <span
            style={{
              fontSize: 18,
              marginLeft: 12,
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            {c.badge}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 20,
            maxWidth: '90%',
            lineHeight: 1.2,
          }}
        >
          {c.title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 36,
          }}
        >
          {c.subtitle}
        </div>

        {/* Price badge */}
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <div
            style={{
              background: '#2E8B9A',
              padding: '14px 36px',
              borderRadius: 12,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {c.price}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
