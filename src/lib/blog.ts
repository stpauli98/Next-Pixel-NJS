import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { BlogImage } from '@/components/blogComponents/BlogImage';
import { ShareButtons } from '@/components/blogComponents/ShareButtons';
import { BlogLayout } from '@/components/blogComponents/BlogLayout';
import { BlogContent, BlogMeta, BlogTags } from '@/components/blogComponents/BlogContent';
import { logError, logWarn } from '@/utils/logger';
import { i18nConfig } from '@/config/i18n';
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

/**
 * Calculate estimated reading time for MDX content.
 * Strips MDX syntax before counting. Uses 200 words/minute.
 */
export function calculateReadingTime(content: string): number {
  const cleanContent = content
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/export\s+(const|default|function)\s+.*?[={]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[#*_~`>-]/g, '')
    .trim();

  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

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
          // Safe parsing - convert JS object literal to valid JSON
          let dataString = blogDataMatch[1]
            // First, handle the tags array
            .replace(/tags:\s*\[([^\]]+)\]/g, (_match, tags) => {
              const formattedTags = tags.split(',').map((tag: string) =>
                '"' + tag.trim().replace(/["']/g, '') + '"'
              ).join(',');
              return '"tags": [' + formattedTags + ']';
            })
            // Convert property names to quoted strings
            .replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":')
            // Convert single quotes to double quotes for string values
            .replace(/:\s*'([^']*)'/g, ': "$1"');

          const extractedData = JSON.parse(dataString);
          blogData = { ...blogData, ...extractedData };
        } catch (error) {
          logError('Greška pri parsiranju blogData', error, {
            file,
            component: 'getBlogPosts',
            blogDataMatch: blogDataMatch[1]
          });
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
        title: frontmatter.title || blogData.title || '',
        description: frontmatter.description || blogData.excerpt || '',
        date: frontmatter.date || blogData.date,
        excerpt: frontmatter.excerpt || blogData.excerpt,
        author: frontmatter.author || blogData.author,
        tags: frontmatter.tags || blogData.tags,
        readTime: calculateReadingTime(fileContent),
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
      // Safe parsing - convert JS object literal to valid JSON
      let dataString = blogDataMatch[1]
        // First, handle the tags array
        .replace(/tags:\s*\[([^\]]+)\]/g, (_match, tags) => {
          const formattedTags = tags.split(',').map((tag: string) =>
            '"' + tag.trim().replace(/["']/g, '') + '"'
          ).join(',');
          return '"tags": [' + formattedTags + ']';
        })
        // Convert property names to quoted strings
        .replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":')
        // Convert single quotes to double quotes for string values
        .replace(/:\s*'([^']*)'/g, ': "$1"');

      const extractedData = JSON.parse(dataString);
      blogData = { ...blogData, ...extractedData };
    } catch (error) {
      logError('Greška pri parsiranju blogData', error, {
        slug,
        component: 'getBlogPost',
        blogDataMatch: blogDataMatch[1]
      });
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
    title: frontmatter.title || blogData.title || '',
    description: frontmatter.description || blogData.excerpt || '',
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

const SUPPORTED_LANGUAGES: readonly string[] = i18nConfig.locales;

/**
 * Translation mapping between blog post slugs across languages.
 * Each entry maps slugs that are translations of the same content.
 * Key: any slug from any language. Value: { lang: slug } for all translations.
 *
 * IMPORTANT: When adding a new blog post with translations, add an entry here.
 * Posts not in this map will have NO cross-language hreflang tags.
 */
const BLOG_TRANSLATION_MAP: Record<string, Record<string, string>> = (() => {
  const groups = [
    { sr: 'premium-animacija-proizvoda', en: 'premium-product-animation', de: 'premium-produkt-animation' },
    { sr: 'analiza-sajtova-rs-2026', en: 'website-analysis-rs-2026', de: 'website-analyse-rs-2026' },
  ];

  const map: Record<string, Record<string, string>> = {};
  for (const group of groups) {
    for (const slug of Object.values(group)) {
      map[slug] = group;
    }
  }
  return map;
})();

export function blogSlugExistsInOtherLanguages(currentLang: string, slug: string): boolean {
  const translations = BLOG_TRANSLATION_MAP[slug];
  if (translations) {
    return SUPPORTED_LANGUAGES
      .filter(lang => lang !== currentLang)
      .some(lang => lang in translations);
  }
  // Fallback: check filesystem for posts with the same slug
  return SUPPORTED_LANGUAGES
    .filter(lang => lang !== currentLang)
    .some(lang => fs.existsSync(path.join(BLOG_DIR, lang, `${slug}.mdx`)));
}

export function getLanguagesWithSlug(slug: string): string[] {
  const translations = BLOG_TRANSLATION_MAP[slug];
  if (translations) {
    return SUPPORTED_LANGUAGES.filter(lang =>
      lang in translations && fs.existsSync(path.join(BLOG_DIR, lang, `${translations[lang]}.mdx`))
    );
  }
  return SUPPORTED_LANGUAGES.filter(lang =>
    fs.existsSync(path.join(BLOG_DIR, lang, `${slug}.mdx`))
  );
}

/**
 * Get the translated slug for a blog post in a target language.
 * Returns the slug for the target language, or undefined if no translation exists.
 */
export function getTranslatedSlug(slug: string, targetLang: string): string | undefined {
  const translations = BLOG_TRANSLATION_MAP[slug];
  if (translations && targetLang in translations) {
    const translatedSlug = translations[targetLang];
    if (fs.existsSync(path.join(BLOG_DIR, targetLang, `${translatedSlug}.mdx`))) {
      return translatedSlug;
    }
  }
  return undefined;
}

/**
 * Get all translations for a given blog post slug.
 * Returns a map of { lang: slug } for all available translations (including the current language).
 */
export function getBlogTranslations(slug: string): Record<string, string> {
  const translations = BLOG_TRANSLATION_MAP[slug];
  if (!translations) return {};

  const result: Record<string, string> = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang in translations && fs.existsSync(path.join(BLOG_DIR, lang, `${translations[lang]}.mdx`))) {
      result[lang] = translations[lang];
    }
  }
  return result;
}
