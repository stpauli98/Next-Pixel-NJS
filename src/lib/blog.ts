import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { BlogImage } from '@/components/blog/BlogImage';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogContent, BlogMeta, BlogTags } from '@/components/blog/BlogContent';
import { ReactNode } from 'react';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Define blog data interface
export interface BlogData {
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  [key: string]: any; // Allow for additional properties
}

// Define types for blog post
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export interface FullBlogPost extends BlogPost {
  content: ReactNode;
  blogData: BlogData; // Include the extracted blogData
}

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
      let blogData: BlogData = {
        date: new Date().toISOString().split('T')[0],
        author: 'Next Pixel',
        excerpt: '',
        tags: []
      };
      
      if (blogDataMatch && blogDataMatch[1]) {
        try {
          // Use Function constructor to safely evaluate the blogData object
          const extractedData = new Function(`return ${blogDataMatch[1]}`)();
          blogData = { ...blogData, ...extractedData };
        } catch (error) {
          console.error('Error parsing blogData:', error);
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
      
      // Extract frontmatter with type assertion
      const frontmatter = result.frontmatter as any;
      
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
  let blogData: BlogData = {
    date: new Date().toISOString().split('T')[0],
    author: 'Next Pixel',
    excerpt: '',
    tags: []
  };
  
  if (blogDataMatch && blogDataMatch[1]) {
    try {
      // Use Function constructor to safely evaluate the blogData object
      const extractedData = new Function(`return ${blogDataMatch[1]}`)();
      blogData = { ...blogData, ...extractedData };
    } catch (error) {
      console.error('Error parsing blogData:', error);
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
  
  // Extract frontmatter with type assertion
  const frontmatter = result.frontmatter as any;
  
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

// Define the structure for static params
type BlogSlugParams = {
  lang: string;
  slug: string;
};

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
