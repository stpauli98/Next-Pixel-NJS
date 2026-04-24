'use client';

import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReviewSummaryCardProps {
  rating: number;
  reviewCount: number;
  maxRating?: number;
  summaryText: string;
  className?: string;
}

export const ReviewSummaryCard: React.FC<ReviewSummaryCardProps> = ({
  rating,
  reviewCount,
  maxRating = 5,
  summaryText,
  className,
}) => {
  const ratingRef = useRef<HTMLSpanElement>(null);
  const reviewCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ratingControl = animate(0, rating, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (ratingRef.current) {
          ratingRef.current.textContent = value.toFixed(1);
        }
      },
    });

    const reviewCountControl = animate(0, reviewCount, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (reviewCountRef.current) {
          reviewCountRef.current.textContent = new Intl.NumberFormat('en-US').format(
            Math.round(value)
          );
        }
      },
    });

    return () => {
      ratingControl.stop();
      reviewCountControl.stop();
    };
  }, [rating, reviewCount]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      className={cn(
        'w-full max-w-xs rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-6 text-center shadow-lg',
        'flex flex-col items-center justify-center',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      aria-label={`Rating: ${rating} out of ${maxRating} based on ${reviewCount} reviews.`}
    >
      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <motion.div key={i} custom={i} variants={starVariants}>
            <Star
              className={cn(
                'h-6 w-6',
                rating >= i + 1 ? 'text-yellow-400' : 'text-gray-600'
              )}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Rating + Count */}
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
        <span ref={ratingRef}>0.0</span>
        <span className="text-lg sm:text-2xl font-semibold text-gray-300">
          {' '}(<span ref={reviewCountRef}>0</span> Reviews)
        </span>
      </h2>

      {/* Summary */}
      <p className="mt-2 text-sm text-gray-400">{summaryText}</p>
    </motion.div>
  );
};

export default ReviewSummaryCard;
