// /src/components/blogComponents/BlogImage.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { logError } from '@/utils/logger';

interface BlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  imageClassName?: string;
  fallbackSrc?: string;
}

export const BlogImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  caption, 
  className,
  imageClassName,
  fallbackSrc = "https://placehold.co/800x420/0A2463/FFFFFF?text=Blog+Image"
}: BlogImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle image load error with fallback
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Log error for debugging
    logError('BlogImage failed to load', new Error(`Failed to load blog image: ${src}`), {
      component: 'BlogImage',
      imageSrc: src,
      fallbackSrc,
      alt,
      caption
    });

    // Set fallback image if different from current src
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false); // Reset error state for fallback
      setIsLoading(true); // Show loading for fallback
    }
  };

  return (
    <figure className={`my-6 ${className || ''}`}>
      <div className="rounded-xl overflow-hidden shadow-md relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded w-8 h-8" aria-label="Loading image"></div>
          </div>
        )}

        {/* Error state */}
        {hasError && imgSrc === fallbackSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm">
            <span>Blog image not available</span>
          </div>
        )}

        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${imageClassName || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={false}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
