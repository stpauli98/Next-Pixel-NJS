import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { BlogImage } from '@/components/blogComponents/BlogImage';
import { ShareButtons } from '@/components/blogComponents/ShareButtons';
import { BlogLayout } from '@/components/blogComponents/BlogLayout';
import { BlogContent, BlogMeta, BlogTags } from '@/components/blogComponents/BlogContent';
import { logError, logWarn } from '@/utils/logger';
import { 
  BlogDataExtracted, 
  BlogFrontmatter, 
  BlogPost, 
  FullBlogPost, 
  BlogSlugParams,
  isBlogFrontmatter 
} from '@/types/blog';
import { ReactNode } from 'react';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Re-export tipova iz centralnog mesta
export type { BlogPost, FullBlogPost, BlogSlugParams, BlogDataExtracted, BlogFrontmatter } from '@/types/blog';

// Backward compatibility
export interface BlogData extends BlogDataExtracted {}

// Define the components used in MDX files
const components = {
  BlogImage,
  ShareButtons,
  BlogLayout,
  BlogContent,
  BlogMeta,
  BlogTags
};

export async function getBlogPosts(lang: string): Promise<BlogPost[]> {
  const langDir = path.join(BLOG_DIR, lang);
  
  if (!fs.existsSync(langDir)) {
    return [];
  }
  
  const files = fs.readdirSync(langDir);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(langDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract blogData from the file content
      const blogDataMatch = fileContent.match(/export const blogData = ({[\s\S]*?})/m);
      let blogData: BlogDataExtracted = {
        date: new Date().toISOString().split('T')[0],
        author: 'Next Pixel',
        excerpt: '',
        tags: []
      };
      
      if (blogDataMatch && blogDataMatch[1]) {
        try {
          // Bezbedni pristup - koristi JSON.parse umesto new Function()
          // Prvo pokušavamo da parsiramo kao JSON
          const jsonString = blogDataMatch[1].replace(/'/g, '"');
          const extractedData = JSON.parse(jsonString);
          blogData = { ...blogData, ...extractedData };
        } catch (jsonError) {
          // Fallback: pokušavamo sa eval samo za trusted sadržaj
          try {
            // NAPOMENA: Ovo je još uvek potencijalno ranjivo, ali ograničeno na trusted fajlove
            const extractedData = eval(`(${blogDataMatch[1]})`);
            blogData = { ...blogData, ...extractedData };
            logWarn('Korišćen eval za blog data parsing', { file, data: blogDataMatch[1] });
          } catch (evalError) {
            logError('Greška pri parsiranju blogData', evalError, { 
              file, 
              component: 'getBlogPosts',
              blogDataMatch: blogDataMatch[1] 
            });
          }
        }
      }
      
      // Remove the original blogData export to avoid conflicts
      const contentWithoutBlogDataExport = fileContent.replace(/export const blogData = ({[\s\S]*?})/m, '');
      
      // Compile the MDX content with blogData injected into the scope
      const result = await compileMDX<{ title?: string; description?: string; date?: string; excerpt?: string; author?: string; tags?: string[] }>({
        source: `{/* Inject blogData into MDX scope */}
{(() => { globalThis.blogData = ${JSON.stringify(blogData)}; return null; })()}
${contentWithoutBlogDataExport}`,
        components,
        options: { parseFrontmatter: true },
      });
      
      // Extract frontmatter sa type checking
      const frontmatter: BlogFrontmatter = isBlogFrontmatter(result.frontmatter) 
        ? result.frontmatter 
        : {};
      
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date || blogData.date,
        excerpt: frontmatter.excerpt || blogData.excerpt,
        author: frontmatter.author || blogData.author,
        tags: frontmatter.tags || blogData.tags,
      } as BlogPost;
    })
  );
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(lang: string, slug: string): Promise<FullBlogPost | null> {
  const filePath = path.join(BLOG_DIR, lang, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract blogData from the file content
  const blogDataMatch = fileContent.match(/export const blogData = ({[\s\S]*?})/m);
  let blogData: BlogDataExtracted = {
    date: new Date().toISOString().split('T')[0],
    author: 'Next Pixel',
    excerpt: '',
    tags: []
  };
  
  if (blogDataMatch && blogDataMatch[1]) {
    try {
      // Bezbedni pristup - koristi JSON.parse umesto new Function()
      const jsonString = blogDataMatch[1].replace(/'/g, '"');
      const extractedData = JSON.parse(jsonString);
      blogData = { ...blogData, ...extractedData };
    } catch (jsonError) {
      // Fallback: pokušavamo sa eval samo za trusted sadržaj
      try {
        const extractedData = eval(`(${blogDataMatch[1]})`);
        blogData = { ...blogData, ...extractedData };
        logWarn('Korišćen eval za blog data parsing', { slug, data: blogDataMatch[1] });
      } catch (evalError) {
        logError('Greška pri parsiranju blogData', evalError, { 
          slug, 
          component: 'getBlogPost',
          blogDataMatch: blogDataMatch[1] 
        });
      }
    }
  }
  
  // Remove the original blogData export to avoid conflicts
  const contentWithoutBlogDataExport = fileContent.replace(/export const blogData = ({[\s\S]*?})/m, '');
  
  // Compile the MDX content with blogData injected into the scope
  const result = await compileMDX<{ title?: string; description?: string; date?: string; excerpt?: string; author?: string; tags?: string[] }>({
    source: `{/* Inject blogData into MDX scope */}
{(() => { globalThis.blogData = ${JSON.stringify(blogData)}; return null; })()}
${contentWithoutBlogDataExport}`,
    components,
    options: { parseFrontmatter: true },
  });
  
  // Extract frontmatter sa type checking
  const frontmatter: BlogFrontmatter = isBlogFrontmatter(result.frontmatter) 
    ? result.frontmatter 
    : {};
  
  return {
    slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    date: frontmatter.date || blogData.date,
    content: result.content,
    author: frontmatter.author || blogData.author,
    tags: frontmatter.tags || blogData.tags,
    excerpt: frontmatter.excerpt || blogData.excerpt,
    blogData
  } as FullBlogPost;
}

// BlogSlugParams je već definisan u types/blog.ts

export async function getAllBlogSlugs(): Promise<BlogSlugParams[]> {
  const languages = fs.readdirSync(BLOG_DIR).filter(file => 
    fs.statSync(path.join(BLOG_DIR, file)).isDirectory()
  );
  
  const slugs: BlogSlugParams[] = [];
  
  for (const lang of languages) {
    const langDir = path.join(BLOG_DIR, lang);
    const files = fs.readdirSync(langDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    for (const file of mdxFiles) {
      slugs.push({
        lang,
        slug: file.replace(/\.mdx$/, ''),
      });
    }
  }
  
  return slugs;
}
