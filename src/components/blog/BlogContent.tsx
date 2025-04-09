'use client';

import React, { createContext, useContext } from 'react';
import { ReactNode } from 'react';

// Create a context for blog data
export const BlogDataContext = createContext<any>(null);

// Create a hook to access blog data
export const useBlogData = () => {
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
  blogData: {
    date: string;
    author: string;
    excerpt: string;
    tags: string[];
    [key: string]: any;
  };
  children: ReactNode;
}

export const BlogContent: React.FC<BlogContentProps> = ({ blogData, children }) => {
  return (
    <BlogDataContext.Provider value={blogData}>
      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        {/* Apply your preferred styling for blog content */}
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
  className = "flex items-center mb-6 text-gray-600 dark:text-gray-400",
  dateFormat = {day: 'numeric', month: 'long', year: 'numeric'},
  locale = 'en-US'
}) => {
  const blogData = useBlogData();
  
  return (
    <div className={className}>
      <span className="mr-4">Autor: {blogData.author}</span>
      <span>Datum objave: {new Date(blogData.date).toLocaleDateString(locale, dateFormat)}</span>
    </div>
  );
};

// Create a component to display blog tags
export const BlogTags: React.FC<{ 
  className?: string;
}> = ({ 
  className = "flex flex-wrap gap-2 mt-4 mb-6"
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
          className="px-3 py-1 text-sm bg-nextpixel-turquoise/10 text-nextpixel-turquoise rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
