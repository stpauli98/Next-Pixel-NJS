"use client";

import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  summary: string;
  slug: string;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  summary, 
  slug,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link 
            href={`/blog/${slug}`} 
            className="text-nextpixel-dark dark:text-white hover:text-nextpixel-turquoise dark:hover:text-nextpixel-turquoise transition-colors"
          >
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {summary}
        </p>
        <Link 
          href={`/blog/${slug}`} 
          className="inline-block bg-nextpixel-turquoise text-white py-2 px-4 rounded hover:bg-nextpixel-dark transition-colors"
        >
          Pročitaj više
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
