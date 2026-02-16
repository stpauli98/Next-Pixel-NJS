import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://booking.nextpixel.dev';
  const locales = ['de', 'en', 'sr'];
  const lastmod = '2026-02-16';

  const urls = locales.map(
    (locale) => `  <url>
    <loc>${baseUrl}/${locale}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${locale === 'de' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/de"/>
  </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
