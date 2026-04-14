'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  className?: string;
  /** CSS aspect-ratio utility, e.g. "aspect-[4/3]" (default), "aspect-square", "aspect-video" */
  aspectClassName?: string;
  /** Initial slider position (0-100) */
  initialPosition?: number;
  /** object-position applied to both images (e.g. "object-top") */
  imageObjectPosition?: string;
  /** Extra classes for the BEFORE image (e.g. "scale-125 object-top") — useful to match head size */
  beforeImageClassName?: string;
  /** Extra classes for the AFTER image (e.g. "scale-125 object-top") */
  afterImageClassName?: string;
  /** Inline style for BEFORE image — useful for precise transform/translate alignment */
  beforeImageStyle?: React.CSSProperties;
  /** Inline style for AFTER image — useful for precise transform/translate alignment */
  afterImageStyle?: React.CSSProperties;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = '',
  altAfter = '',
  className,
  aspectClassName = 'aspect-[4/3]',
  initialPosition = 50,
  imageObjectPosition = 'object-center',
  beforeImageClassName,
  afterImageClassName,
  beforeImageStyle,
  afterImageStyle,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    const stop = () => setIsDragging(false);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    window.addEventListener('touchcancel', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
      window.removeEventListener('touchcancel', stop);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 2));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full select-none rounded-2xl overflow-hidden shadow-2xl bg-gray-100',
        aspectClassName,
        className
      )}
      onMouseMove={(e) => isDragging && move(e.clientX)}
      onTouchMove={(e) => isDragging && move(e.touches[0].clientX)}
    >
      {/* Before image — full layer (bottom) */}
      <Image
        src={beforeImage}
        alt={altBefore}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn('object-cover pointer-events-none', imageObjectPosition, beforeImageClassName)}
        style={beforeImageStyle}
        draggable={false}
        priority
      />

      {/* After image — clipped layer (top) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={altAfter}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn('object-cover pointer-events-none', imageObjectPosition, afterImageClassName)}
          style={afterImageStyle}
          draggable={false}
          priority
        />
      </div>

      {/* Slider handle */}
      <div
        role="slider"
        aria-label="Image comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onKeyDown={onKeyDown}
        className="absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        style={{ left: `calc(${position}% - 3px)` }}
      >
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-transform duration-200',
            isDragging ? 'scale-110 shadow-xl' : 'scale-100'
          )}
        >
          <ChevronLeft className="w-4 h-4 text-gray-700 -mr-1" aria-hidden="true" />
          <ChevronRight className="w-4 h-4 text-gray-700 -ml-1" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default ImageComparison;
