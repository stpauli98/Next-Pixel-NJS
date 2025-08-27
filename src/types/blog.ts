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
import type { UnknownObject } from '@/types/common';
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
export function isBlogPost(obj: unknown): obj is BlogPost {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const post = obj as Record<string, unknown>;
  return (
    typeof post.slug === 'string' &&
    typeof post.title === 'string' &&
    typeof post.description === 'string' &&
    typeof post.date === 'string' &&
    typeof post.excerpt === 'string' &&
    typeof post.author === 'string' &&
    Array.isArray(post.tags)
  );
}

export function isFullBlogPost(obj: unknown): obj is FullBlogPost {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const post = obj as Record<string, unknown>;
  return (
    typeof post.slug === 'string' &&
    typeof post.title === 'string' &&
    typeof post.description === 'string' &&
    typeof post.date === 'string' &&
    typeof post.excerpt === 'string' &&
    typeof post.author === 'string' &&
    Array.isArray(post.tags) &&
    typeof post.content === 'string' &&
    typeof post.blogData === 'object'
  );
}

export function isBlogFrontmatter(obj: unknown): obj is BlogFrontmatter {
  return obj !== null && typeof obj === 'object';
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