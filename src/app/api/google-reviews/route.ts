import { NextResponse } from 'next/server';

// ── Types ──

interface GoogleReviewAuthor {
  displayName: string;
  uri: string;
  photoUri?: string;
}

interface GoogleReviewText {
  text: string;
  languageCode: string;
}

interface GoogleReview {
  rating: number;
  text?: GoogleReviewText;
  originalText?: GoogleReviewText;
  authorAttribution: GoogleReviewAuthor;
  relativePublishTimeDescription: string;
  publishTime: string;
  googleMapsUri: string;
}

interface GooglePlacesResponse {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

export interface CleanReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  mapsUri: string;
}

export interface ReviewsData {
  rating: number;
  userRatingCount: number;
  reviews: CleanReview[];
}

// ── Config ──

const PLACE_ID = 'ChIJ40ZeSCkQoWARKnA5HDgWS1s';
const FIELDS = 'reviews,rating,userRatingCount';

// ── Handler ──

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { rating: 0, userRatingCount: 0, reviews: [] } satisfies ReviewsData,
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=43200' },
      }
    );
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=${FIELDS}&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // 24h ISR
    });

    if (!res.ok) {
      throw new Error(`Google Places API error: ${res.status}`);
    }

    const data: GooglePlacesResponse = await res.json();

    const reviews: CleanReview[] = (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution.displayName,
      rating: r.rating,
      text: r.originalText?.text ?? r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription,
      publishTime: r.publishTime,
      mapsUri: r.googleMapsUri,
    }));

    const result: ReviewsData = {
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      reviews,
    };

    return NextResponse.json(result, {
      status: 200,
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=43200' },
    });
  } catch (error) {
    console.error('[google-reviews] Error fetching reviews:', error);
    return NextResponse.json(
      { rating: 0, userRatingCount: 0, reviews: [] } satisfies ReviewsData,
      { status: 200 }
    );
  }
}
