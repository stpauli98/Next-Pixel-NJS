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
  figureClassName?: string;
  imageClassName?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export const BlogImage = ({
  src,
  alt,
  width,
  height,
  caption,
  className,
  figureClassName,
  imageClassName,
  fallbackSrc = "/blogImages/image1.webp",
  priority = false
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
    <figure className={`my-8 ${figureClassName || className || ''}`}>
      <div className="rounded-xl overflow-hidden shadow-lg relative bg-gray-100 dark:bg-gray-800">
        {/* Enhanced loading skeleton */}
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ aspectRatio: `${width}/${height}` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 animate-shimmer"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite'
                }}
              />
            </div>
            {/* Loading icon */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && imgSrc === fallbackSrc && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm gap-2"
            style={{ aspectRatio: `${width}/${height}` }}
          >
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-gray-500 dark:text-gray-400">Image not available</span>
          </div>
        )}

        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${imageClassName || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
        />
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3 px-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
