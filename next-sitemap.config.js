/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nextpixel.dev',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: true,
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
    '/server-sitemap.xml'
  ],
  alternateRefs: [
    {
      href: 'https://nextpixel.dev',
      hreflang: 'x-default',
    },
    {
      href: 'https://nextpixel.dev',
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
    // Custom priority for important pages
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/' || path === '/en' || path === '/de') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/services') || path.includes('/usluge')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/portfolio') || path.includes('/projects')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.includes('/blog') || path.includes('/contact')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('/about') || path.includes('/o-nama')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Add dynamic routes here if needed
    const services = [
      'web-development',
      'mobile-apps',
      'e-commerce',
      'seo-optimization',
      'maintenance'
    ];
    
    const locales = ['', '/en', '/de'];
    
    for (const locale of locales) {
      for (const service of services) {
        result.push({
          loc: `${locale}/services/${service}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    }
    
    return result;
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