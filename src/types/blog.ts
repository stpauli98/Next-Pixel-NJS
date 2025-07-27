import { ReactNode } from 'react';

/**
 * Tip-bezbedni interfejsi za blog sistem
 * Zamenjuje 'any' tipove sa specifičnim definicijama
 */

// Osnovni blog metapodaci
export interface BlogMetadata {
  title?: string;
  description?: string;
  date?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  slug?: string;
  language?: string;
  readTime?: number;
  featured?: boolean;
  image?: string;
  category?: string;
}

// Blog podaci koji se ekstraktuju iz MDX fajlova
export interface BlogDataExtracted {
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  // Dodatne opcione properties sa kontrolisanim tipovima
  readTime?: number;
  featured?: boolean;
  image?: string;
  category?: string;
  language?: string;
  // Indeksni tip za dodatne string ili string[] vrednosti
  [key: string]: string | string[] | number | boolean | undefined;
}

// Frontmatter iz MDX fajlova
export interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  image?: string;
  category?: string;
  language?: string;
}

// Osnovni blog post tip
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime?: number;
  featured?: boolean;
  image?: string;
  category?: string;
  language?: string;
}

// Kompletni blog post sa sadržajem
export interface FullBlogPost extends BlogPost {
  content: ReactNode;
  blogData: BlogDataExtracted;
}

// Parametri za blog slug-ove
export interface BlogSlugParams {
  lang: string;
  slug: string;
}

// Blog kategorije
export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  slug: string;
}

// Blog tag
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

// Blog listing sa paginacijom
export interface BlogListing {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Blog search rezultati
export interface BlogSearchResult {
  posts: BlogPost[];
  query: string;
  totalResults: number;
}

// Blog context za React komponente
export interface BlogContextData {
  currentPost?: FullBlogPost;
  relatedPosts?: BlogPost[];
  categories?: BlogCategory[];
  tags?: BlogTag[];
  isLoading?: boolean;
  error?: string | null;
}

// Enum za blog statuse
export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SCHEDULED = 'scheduled'
}

// Enum za blog tipove
export enum BlogType {
  ARTICLE = 'article',
  TUTORIAL = 'tutorial',
  NEWS = 'news',
  REVIEW = 'review',
  GUIDE = 'guide'
}

// Type guards za proveru tipova
export function isBlogPost(obj: any): obj is BlogPost {
  return obj && 
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.excerpt === 'string' &&
    typeof obj.author === 'string' &&
    Array.isArray(obj.tags);
}

export function isFullBlogPost(obj: any): obj is FullBlogPost {
  return obj && 
    typeof obj === 'object' &&
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.excerpt === 'string' &&
    typeof obj.author === 'string' &&
    Array.isArray(obj.tags) &&
    obj.content !== undefined && 
    obj.blogData !== undefined;
}

export function isBlogFrontmatter(obj: any): obj is BlogFrontmatter {
  return obj && typeof obj === 'object';
}

// Helper tipovi
export type BlogContentComponent = React.ComponentType<{
  children?: ReactNode;
  blogData?: BlogDataExtracted;
}>;

export type BlogMetaComponent = React.ComponentType<{
  metadata: BlogMetadata;
}>;

export type BlogListComponent = React.ComponentType<{
  posts: BlogPost[];
  loading?: boolean;
}>;

// Note: All types are already exported inline above