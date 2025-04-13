import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { BlogImage } from '@/components/blogComponents/BlogImage';
import { ShareButtons } from '@/components/blogComponents/ShareButtons';
import { BlogLayout } from '@/components/blogComponents/BlogLayout';
import { BlogContent, BlogMeta, BlogTags } from '@/components/blogComponents/BlogContent';
import { ReactNode } from 'react';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Define types for blog data
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
  blogData: any; // Store the extracted blogData
}

// Define the components used in MDX files
const components = {
  BlogImage,
  ShareButtons,
  BlogLayout,
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
      let blogData = {
        date: new Date().toISOString().split('T')[0],
        author: 'Next Pixel',
        excerpt: '',
        tags: [] as string[]
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
      
      // Parse frontmatter
      const result = await compileMDX({
        source: fileContent,
        components,
        options: { parseFrontmatter: true },
      });
      
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
  let blogData = {
    date: new Date().toISOString().split('T')[0],
    author: 'Next Pixel',
    excerpt: '',
    tags: [] as string[]
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
  
  // Compile the MDX content
  // Add the blogData variable back to the MDX content to make it available in the scope
  const contentWithBlogDataVariable = `const blogData = ${JSON.stringify(blogData)};
${contentWithoutBlogDataExport}`;
  
  const result = await compileMDX({
    source: contentWithBlogDataVariable,
    components,
    options: { 
      parseFrontmatter: true
    },
  });
  
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
    blogData // Include the extracted blogData
  } as FullBlogPost;
}

export async function getAllBlogSlugs() {
  const languages = fs.readdirSync(BLOG_DIR).filter(file => 
    fs.statSync(path.join(BLOG_DIR, file)).isDirectory()
  );
  
  const slugs = [];
  
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
