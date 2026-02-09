import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig, isValidLocale, type Locale } from './config/i18n';

/**
 * Detect user's preferred locale from:
 * 1. Cookie (saved preference)
 * 2. Accept-Language header (browser language)
 * 3. Default locale (sr)
 */
function detectLocale(request: NextRequest): Locale {
  // 1. Check cookie for saved preference
  const cookieLocale = request.cookies.get(i18nConfig.cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language: "en-US,en;q=0.9,sr;q=0.8"
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);

    // Find first matching locale
    for (const lang of languages) {
      if (isValidLocale(lang)) {
        return lang;
      }
    }
  }

  // 3. Default to Serbian
  return i18nConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a valid locale
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  // If path already has valid locale, continue with headers
  if (potentialLocale && isValidLocale(potentialLocale)) {
    // Forward locale as request header so root layout can set <html lang> correctly
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', potentialLocale);
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });

    // Add SEO and security headers
    const lastModified = new Date().toUTCString();
    response.headers.set('Last-Modified', lastModified);
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Language', potentialLocale);

    return response;
  }

  // Path doesn't have locale, detect and redirect
  const detectedLocale = detectLocale(request);
  const redirectPath = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  // Add SEO and security headers to redirect
  const lastModified = new Date().toUTCString();
  response.headers.set('Last-Modified', lastModified);
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Language', detectedLocale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public static images)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.webp$).*)',
  ],
};