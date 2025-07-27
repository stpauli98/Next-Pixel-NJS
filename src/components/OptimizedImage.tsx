'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { logError } from '@/utils/logger';

/**
 * Props za OptimizedImage komponentu
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

/**
 * Optimizovana Image komponenta sa lazy loading, error handling i fallback
 * Wrappuje Next.js Image komponentu sa dodatnim optimizacijama
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  className = "",
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  loading,
  onLoad,
  onError,
  fallbackSrc = "https://placehold.co/600x400/0A2463/FFFFFF?text=NextPixel"
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Log error
    logError('Image failed to load', new Error(`Failed to load image: ${src}`), {
      component: 'OptimizedImage',
      imageSrc: src,
      fallbackSrc,
      alt
    });

    // Set fallback image
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false); // Reset error state for fallback
    }

    onError?.();
  };

  // Generate blur placeholder if needed
  const getBlurDataURL = (): string | undefined => {
    if (placeholder === 'blur') {
      return blurDataURL || generateBlurDataURL();
    }
    return undefined;
  };

  // Generate simple blur placeholder
  const generateBlurDataURL = (): string => {
    // Simple 1x1 pixel transparent image as base64
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  };

  // Determine loading strategy
  const imageLoading = loading || (priority ? 'eager' : 'lazy');

  // Base props koji su zajednički za fill i non-fill mode
  const baseProps = {
    src: imgSrc,
    alt,
    priority,
    quality,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder,
    blurDataURL: getBlurDataURL(),
    loading: imageLoading,
  };

  // Style object za objectFit
  const imageStyle = {
    objectFit: objectFit,
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${fill ? '' : 'w-full h-full'}`}>
          <div className="animate-pulse bg-gray-300 rounded w-8 h-8" aria-label="Loading image"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && imgSrc === fallbackSrc && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${fill ? '' : 'w-full h-full'}`}>
          <span>Image not available</span>
        </div>
      )}

      {/* Image component */}
      {fill ? (
        <Image
          {...baseProps}
          fill
          sizes={sizes}
          style={imageStyle}
          alt={alt} // Explicit alt prop za ESLint
        />
      ) : (
        <Image
          {...baseProps}
          width={width}
          height={height}
          sizes={sizes}
          style={imageStyle}
          alt={alt} // Explicit alt prop za ESLint
        />
      )}
    </div>
  );
};

/**
 * Responsive Image komponenta za hero sekcije
 */
export const HeroImage: React.FC<Omit<OptimizedImageProps, 'sizes' | 'priority'>> = (props) => {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      placeholder="blur"
      quality={90}
    />
  );
};

/**
 * Thumbnail Image komponenta za kartice i preview-e
 */
export const ThumbnailImage: React.FC<Omit<OptimizedImageProps, 'sizes' | 'loading'>> = (props) => {
  return (
    <OptimizedImage
      {...props}
      loading="lazy"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      quality={75}
    />
  );
};

/**
 * Blog Image komponenta za članke
 */
export const BlogImage: React.FC<Omit<OptimizedImageProps, 'sizes'>> = (props) => {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      quality={80}
    />
  );
};

/**
 * Avatar Image komponenta za profile slike
 */
export const AvatarImage: React.FC<Omit<OptimizedImageProps, 'sizes' | 'objectFit'>> = (props) => {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 80px, 120px"
      objectFit="cover"
      quality={85}
    />
  );
};

export default OptimizedImage;