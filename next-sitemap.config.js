/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nextpixel.dev',
  generateRobotsTxt: false, // We use src/app/robots.ts
  generateIndexSitemap: false, // We use src/app/sitemap.ts
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/private',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  alternateRefs: [
    {
      href: 'https://nextpixel.dev',
      hreflang: 'x-default',
    },
    {
      href: 'https://nextpixel.dev/sr',
      hreflang: 'sr',
    },
    {
      href: 'https://nextpixel.dev/en',
      hreflang: 'en',
    },
    {
      href: 'https://nextpixel.dev/de',
      hreflang: 'de',
    },
  ],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/' || path === '/sr' || path === '/en' || path === '/de') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.includes('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: '2025-02-01',
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
