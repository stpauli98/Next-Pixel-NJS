"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  summary: string;
  slug: string;
  className?: string;
  date?: string;
  image?: {
    src: string;
    alt: string;
  };
  maxSummaryLength?: number;
  category?: string;
  readTime?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  summary, 
  slug,
  className = '',
  date,
  image,
  maxSummaryLength = 150,
  category,
  readTime
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Truncate summary if it's too long
  const displaySummary = summary.length > maxSummaryLength 
    ? `${summary.substring(0, maxSummaryLength)}...` 
    : summary;

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${isHovered ? 'translate-y-[-4px]' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={image.src} 
            alt={image.alt} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {category && (
            <span className="absolute top-4 left-4 bg-nextpixel-turquoise text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        {date && (
          <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
            {readTime && (
              <>
                <span className="mx-2">•</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime}</span>
              </>
            )}
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2">
          <Link 
            href={`/blog/${slug}`} 
            className="text-nextpixel-dark dark:text-white hover:text-nextpixel-turquoise dark:hover:text-nextpixel-turquoise transition-colors"
          >
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {displaySummary}
        </p>
        <Link 
          href={`/blog/${slug}`} 
          className="inline-block bg-nextpixel-turquoise text-white py-2 px-4 rounded-lg hover:bg-nextpixel-dark transition-colors mt-auto font-medium text-sm"
        >
          Pročitaj više
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
