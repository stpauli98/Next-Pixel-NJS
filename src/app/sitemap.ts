import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/metadata';

/**
 * Automatski generirani sitemap za NextPixel sajt
 * Uključuje sve glavne stranice i blog postove
 */

// Statičke stranice sajta
const staticPages = [
  {
    url: '',
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    lastModified: new Date('2025-01-20'), // Datum poslednje velike izmene
  },
  {
    url: '/blog',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: new Date('2025-01-20'),
  },
  {
    url: '/privacy-policy',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
    lastModified: new Date('2025-01-15'),
  },
  {
    url: '/terms',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
    lastModified: new Date('2025-01-15'),
  },
];

// Blog posts - dodaće se dinamički kad budu dostupni
const blogPosts = [
  {
    slug: 'why_web_site',
    lastModified: new Date('2025-01-13'),
    languages: ['sr'], // Dodaj druge jezike kad budu dostupni
  },
  {
    slug: 'why-website-2025',
    lastModified: new Date('2025-01-20'),
    languages: ['sr', 'en', 'de'],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Generiši sitemap entries za statičke stranice
  const staticEntries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Generiši sitemap entries za blog postove
  const blogEntries: MetadataRoute.Sitemap = [];
  
  blogPosts.forEach(post => {
    // Dodaj entry za svaki jezik
    post.languages.forEach(lang => {
      blogEntries.push({
        url: `${baseUrl}/blog/${lang}/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Dodaj i legacy blog post
  blogEntries.push({
    url: `${baseUrl}/blog/why_web_site`,
    lastModified: new Date('2025-01-13'),
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  // Dodaj placeholder stranice koje će možda biti dodane kasnije
  const futurePages: MetadataRoute.Sitemap = [
    // Uncomment kad budu stranice dostupne
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/services`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/portfolio`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ];

  // Kombinuj sve entries
  return [
    ...staticEntries,
    ...blogEntries,
    ...futurePages,
  ];
}

/**
 * Helper funkcija za dodavanje novih blog postova u sitemap
 * Poziva se automatski tokom build procesa
 */
export async function generateBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implementirati kada bude dinamičko učitavanje blog postova iz file system-a
  // const fs = require('fs');
  // const path = require('path');
  // const blogDir = path.join(process.cwd(), 'content/blog');
  
  // if (fs.existsSync(blogDir)) {
  //   const languages = fs.readdirSync(blogDir);
  //   const entries: MetadataRoute.Sitemap = [];
    
  //   languages.forEach(lang => {
  //     const langDir = path.join(blogDir, lang);
  //     if (fs.lstatSync(langDir).isDirectory()) {
  //       const posts = fs.readdirSync(langDir)
  //         .filter(file => file.endsWith('.mdx'))
  //         .map(file => file.replace('.mdx', ''));
        
  //       posts.forEach(slug => {
  //         const filePath = path.join(langDir, `${slug}.mdx`);
  //         const stats = fs.statSync(filePath);
          
  //         entries.push({
  //           url: `${siteConfig.url}/blog/${lang}/${slug}`,
  //           lastModified: stats.mtime,
  //           changeFrequency: 'monthly',
  //           priority: 0.7,
  //         });
  //       });
  //     }
  //   });
    
  //   return entries;
  // }
  
  return [];
}