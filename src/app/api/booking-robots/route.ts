import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://booking.nextpixel.dev';

  const robotsTxt = `# Robots.txt for booking.nextpixel.dev
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /*.json

User-agent: Googlebot
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
