'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useTranslate } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { ReviewSummaryCard } from '@/components/ui/review-summary-card';
import type { ReviewsData, CleanReview } from '@/app/api/google-reviews/route';

// ── Google "G" icon (inline SVG for attribution) ──
const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ── Single review card ──
function ReviewCard({ review, index, isVisible }: { review: CleanReview; index: number; isVisible: boolean }) {
  return (
    <article
      className={`bg-gray-900/60 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Author + stars */}
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{review.author}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${review.rating >= i + 1 ? 'text-yellow-400' : 'text-gray-700'}`}
              fill="currentColor"
            />
          ))}
        </div>
      </div>

      {/* Review text */}
      {review.text && (
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>
      )}

      {/* Time */}
      <span className="text-gray-500 text-xs mt-auto">{review.relativeTime}</span>
    </article>
  );
}

// ── Loading skeleton ──
function ReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-24 bg-gray-800 rounded" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} className="w-3.5 h-3.5 bg-gray-800 rounded" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-800 rounded" />
            <div className="h-3 w-4/5 bg-gray-800 rounded" />
            <div className="h-3 w-3/5 bg-gray-800 rounded" />
          </div>
          <div className="h-3 w-16 bg-gray-800 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}

// ── Main Section ──
export default function SajamReviews() {
  const { t } = useTranslate();
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    fetch('/api/google-reviews')
      .then((res) => res.json())
      .then((json: ReviewsData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Hide section if no reviews
  if (!loading && (!data || data.reviews.length === 0)) {
    return null;
  }

  return (
    <section className="pt-12 pb-20 bg-gray-950" aria-label="Google Reviews">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-12 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {(() => {
              const val = t('sajam2026:reviews.sectionTitle') as string;
              return val.includes('sectionTitle') ? 'Šta kažu naši klijenti' : val;
            })()}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {(() => {
              const val = t('sajam2026:reviews.sectionSubtitle') as string;
              return val.includes('sectionSubtitle') ? 'Realne recenzije sa Google-a od zadovoljnih klijenata' : val;
            })()}
          </p>
        </div>

        {loading ? (
          <ReviewsSkeleton />
        ) : data ? (
          <>
            {/* Summary Card — centered */}
            <div className="flex justify-center mb-12">
              <ReviewSummaryCard
                rating={data.rating}
                reviewCount={data.userRatingCount}
                summaryText={`Google Reviews · ${data.rating.toFixed(1)} prosječna ocjena`}
              />
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {data.reviews
                .filter((r) => r.text) // only reviews with text
                .map((review, i) => (
                  <ReviewCard key={i} review={review} index={i} isVisible={isInView} />
                ))}
            </div>

            {/* Google Attribution (ToS required) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-gray-500 text-xs text-center">
              <GoogleG />
              <a
                href={`https://www.google.com/maps/place/?q=place_id:ChIJ40ZeSCkQoWARKnA5HDgWS1s`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline underline-offset-2"
              >
                Pogledaj sve recenzije na Google Maps
              </a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
