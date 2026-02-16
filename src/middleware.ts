import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig, isValidLocale, type Locale } from './config/i18n';
import { getSubdomainFromHost, subdomains } from './config/subdomains';

/**
 * Detect user's preferred locale from:
 * 1. Cookie (saved preference)
 * 2. Accept-Language header (browser language)
 * 3. Default locale
 */
function detectLocale(request: NextRequest, defaultLocale: Locale = i18nConfig.defaultLocale): Locale {
  // 1. Check cookie for saved preference
  const cookieLocale = request.cookies.get(i18nConfig.cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);

    for (const lang of languages) {
      if (isValidLocale(lang)) {
        return lang;
      }
    }
  }

  // 3. Default locale
  return defaultLocale;
}

function addSecurityHeaders(response: NextResponse, locale: string) {
  const lastModified = new Date().toUTCString();
  response.headers.set('Last-Modified', lastModified);
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Language', locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');

  // --- Subdomain detection ---
  const subdomain = getSubdomainFromHost(host);

  if (subdomain) {
    const config = subdomains[subdomain];

    // Check if path already has a valid locale
    const segments = pathname.split('/');
    const potentialLocale = segments[1];

    if (potentialLocale && isValidLocale(potentialLocale)) {
      // Rewrite /{lang}/... → /booking/{lang}/...
      const url = request.nextUrl.clone();
      url.pathname = `${config.internalPrefix}${pathname}`;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-locale', potentialLocale);
      requestHeaders.set('x-subdomain', subdomain);

      const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
      addSecurityHeaders(response, potentialLocale);
      return response;
    }

    // No locale in path → detect and redirect
    const detectedLocale = detectLocale(request, config.defaultLocale);
    const redirectPath = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
    const response = NextResponse.redirect(new URL(redirectPath, request.url));
    addSecurityHeaders(response, detectedLocale);
    return response;
  }

  // --- Main site (no subdomain) ---
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  // If path already has valid locale, continue with headers
  if (potentialLocale && isValidLocale(potentialLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', potentialLocale);
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });
    addSecurityHeaders(response, potentialLocale);
    return response;
  }

  // Path doesn't have locale, detect and redirect
  const detectedLocale = detectLocale(request);
  const redirectPath = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(new URL(redirectPath, request.url));
  addSecurityHeaders(response, detectedLocale);
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
     * - robots.txt, sitemap.xml (SEO files - subdomain handled via next.config.js rewrites)
     * - booking (internal rewrite prefix)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|booking|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.webp$).*)',
  ],
};
