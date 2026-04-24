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
  name: string;
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
// Fetch with 3 language codes in parallel — Google returns different
// batches of reviews per language, so we can surface more text reviews.
const LANG_CODES = ['bs', 'en', 'de'] as const;
const FIELD_MASK =
  'reviews.name,reviews.rating,reviews.text,reviews.originalText,' +
  'reviews.authorAttribution,reviews.relativePublishTimeDescription,' +
  'reviews.publishTime,reviews.googleMapsUri,rating,userRatingCount';

// ── Helper ──

async function fetchReviews(apiKey: string, lang: string): Promise<GooglePlacesResponse> {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?key=${apiKey}&languageCode=${lang}`;
  const res = await fetch(url, {
    headers: { 'X-Goog-FieldMask': FIELD_MASK },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Places API ${lang}: ${res.status}`);
  return res.json() as Promise<GooglePlacesResponse>;
}

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
    // Fetch all 3 language variants in parallel
    const results = await Promise.allSettled(
      LANG_CODES.map((lang) => fetchReviews(apiKey, lang))
    );

    // Use the first successful response for the overall rating/count
    const firstOk = results.find((r): r is PromiseFulfilledResult<GooglePlacesResponse> => r.status === 'fulfilled');
    const rating = firstOk?.value.rating ?? 0;
    const userRatingCount = firstOk?.value.userRatingCount ?? 0;

    // Collect all raw reviews, deduplicate by review `name` (unique ID)
    const seen = new Set<string>();
    const allRaw: GoogleReview[] = [];

    for (const result of results) {
      if (result.status !== 'fulfilled') continue;
      for (const r of result.value.reviews ?? []) {
        if (!r.name || seen.has(r.name)) continue;
        seen.add(r.name);
        allRaw.push(r);
      }
    }

    // Keep only reviews with actual text content, sort newest first
    const reviews: CleanReview[] = allRaw
      .filter((r) => {
        const text = r.originalText?.text ?? r.text?.text ?? '';
        return text.trim().length > 0;
      })
      .sort((a, b) => {
        const ta = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const tb = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return tb - ta;
      })
      .map((r) => ({
        author: r.authorAttribution.displayName,
        rating: r.rating,
        text: r.originalText?.text ?? r.text?.text ?? '',
        relativeTime: r.relativePublishTimeDescription,
        publishTime: r.publishTime,
        mapsUri: r.googleMapsUri,
      }));

    const result: ReviewsData = { rating, userRatingCount, reviews };

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
