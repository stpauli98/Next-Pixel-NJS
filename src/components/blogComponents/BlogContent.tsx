'use client';

import React, { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import { BlogDataExtracted } from '@/types/blog';

// Declare global type for window with blogData property
declare global {
  interface Window {
    blogData: BlogDataExtracted;
  }
}

// Make blogData available globally for MDX content
if (typeof window !== 'undefined') {
  // Only set in browser context to avoid SSR issues
  window.blogData = window.blogData || {};
}

// Create a context for blog data
export const BlogDataContext = createContext<BlogDataExtracted | null>(null);

// Create a hook to access blog data
export const useBlogData = (): BlogDataExtracted => {
  const blogData = useContext(BlogDataContext);
  if (!blogData) {
    // Provide default values if blogData is not available
    return {
      date: new Date().toISOString().split('T')[0],
      author: 'Next Pixel',
      excerpt: '',
      tags: []
    };
  }
  return blogData;
};

interface BlogContentProps {
  blogData: BlogDataExtracted;
  children: ReactNode;
}

export const BlogContent: React.FC<BlogContentProps> = ({ blogData, children }) => {
  // Make blogData available globally for MDX content
  if (typeof window !== 'undefined') {
    window.blogData = blogData;
  }

  return (
    <BlogDataContext.Provider value={blogData}>
      <article className="
        prose prose-lg dark:prose-invert
        max-w-none mx-auto

        prose-headings:font-bold
        prose-headings:text-nextpixel-dark prose-headings:dark:text-white

        prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:md:text-5xl
        prose-h1:mb-6 prose-h1:mt-0

        prose-h2:text-2xl prose-h2:sm:text-3xl
        prose-h2:mt-12 prose-h2:mb-6
        prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-700

        prose-h3:text-xl prose-h3:sm:text-2xl
        prose-h3:mt-8 prose-h3:mb-4

        prose-p:text-gray-800 prose-p:dark:text-gray-200
        prose-p:leading-relaxed prose-p:mb-6

        prose-a:text-nextpixel-turquoise prose-a:no-underline
        hover:prose-a:underline prose-a:transition-colors

        prose-strong:text-nextpixel-dark prose-strong:dark:text-white

        prose-ul:my-6 prose-ul:pl-6
        prose-ol:my-6 prose-ol:pl-6
        prose-li:my-2

        prose-blockquote:border-l-4 prose-blockquote:border-nextpixel-turquoise
        prose-blockquote:bg-gray-50 prose-blockquote:dark:bg-gray-800/50
        prose-blockquote:py-4 prose-blockquote:px-6
        prose-blockquote:rounded-r-xl
        prose-blockquote:not-italic
        prose-blockquote:my-8

        prose-code:bg-gray-100 prose-code:dark:bg-gray-800
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:text-sm prose-code:font-mono
        prose-code:before:content-[''] prose-code:after:content-['']

        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-pre:rounded-xl prose-pre:shadow-lg
        prose-pre:overflow-x-auto

        prose-img:rounded-xl prose-img:shadow-lg
        prose-figure:my-8

        prose-hr:my-10 prose-hr:border-gray-200 prose-hr:dark:border-gray-700
      ">
        <div className="blog-content">
          {children}
        </div>
      </article>
    </BlogDataContext.Provider>
  );
};

// Create a component to display blog metadata
export const BlogMeta: React.FC<{
  className?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
  locale?: string;
}> = ({
  className = "flex flex-wrap items-center gap-4 mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300",
  dateFormat = { day: 'numeric', month: 'long', year: 'numeric' },
  locale = 'en-US'
}) => {
  const blogData = useBlogData();

  return (
    <div className={className}>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-nextpixel-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{blogData.author}</span>
      </div>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-nextpixel-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{new Date(blogData.date).toLocaleDateString(locale, dateFormat)}</span>
      </div>
    </div>
  );
};

// Create a component to display blog tags
export const BlogTags: React.FC<{
  className?: string;
}> = ({
  className = "flex flex-wrap gap-2 mt-6 mb-8"
}) => {
  const blogData = useBlogData();

  if (!blogData.tags || blogData.tags.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blogData.tags.map((tag: string) => (
        <span
          key={tag}
          className="px-3 py-1.5 text-sm bg-nextpixel-turquoise/10 text-nextpixel-turquoise rounded-full font-medium hover:bg-nextpixel-turquoise/20 transition-colors cursor-default"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};
