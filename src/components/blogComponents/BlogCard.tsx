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
  readMoreText?: string;
  lang?: string;
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
  readTime,
  readMoreText = 'Read more',
  lang = 'sr'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Truncate summary if it's too long
  const displaySummary = summary.length > maxSummaryLength
    ? `${summary.substring(0, maxSummaryLength)}...`
    : summary;

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full ${isHovered ? 'translate-y-[-4px]' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with aspect-video for consistent responsive sizing */}
      {image && (
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer" />
            </div>
          )}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Category badge */}
          {category && (
            <span className="absolute top-4 left-4 bg-nextpixel-turquoise text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        {/* Meta info */}
        {date && (
          <div className="flex items-center flex-wrap gap-2 mb-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-nextpixel-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center">
                <span className="mx-1 text-gray-400 dark:text-gray-500">|</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-nextpixel-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 line-clamp-2">
          <Link
            href={lang ? `/${lang}/blog/${slug}` : `/blog/${slug}`}
            className="text-nextpixel-dark dark:text-white hover:text-nextpixel-turquoise dark:hover:text-nextpixel-turquoise transition-colors duration-200"
          >
            {title}
          </Link>
        </h2>

        {/* Summary */}
        <p className="text-gray-700 dark:text-gray-200 mb-5 flex-grow line-clamp-3 text-sm sm:text-base leading-relaxed">
          {displaySummary}
        </p>

        {/* Read more button */}
        <Link
          href={lang ? `/${lang}/blog/${slug}` : `/blog/${slug}`}
          className="inline-flex items-center justify-center bg-nextpixel-turquoise text-white py-2.5 px-5 rounded-lg hover:bg-nextpixel-dark transition-colors duration-200 mt-auto font-medium text-sm group/btn"
        >
          {readMoreText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
