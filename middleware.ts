import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware za server-side language detection i routing
 * Automatski detektuje jezik na osnovu cookie-ja ili Accept-Language header-a
 */

// Podržani jezici
const locales = ['sr', 'en', 'de'] as const;
const defaultLocale = 'sr';

/**
 * Detektuje preferirani jezik iz Accept-Language header-a
 */
function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header (format: "en-US,en;q=0.9,de;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = q.startsWith('q=') ? parseFloat(q.slice(2)) : 1;
      return { code: code.split('-')[0].toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Pronađi prvi podržani jezik
  for (const { code } of languages) {
    if (locales.includes(code as any)) {
      return code;
    }
  }

  return defaultLocale;
}

/**
 * Proveri da li putanja već sadrži locale
 */
function pathnameHasLocale(pathname: string): boolean {
  return locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * Ekstraktuj locale iz putanje
 */
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/');
  const firstSegment = segments[1];
  
  if (locales.includes(firstSegment as any)) {
    return firstSegment;
  }
  
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware za API rute, _next, i static fajlove
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/twitter-image') ||
    pathname.includes('.') // Statični fajlovi sa ekstenzijom
  ) {
    return NextResponse.next();
  }

  // Ako putanja već ima locale, nastavi dalje
  if (pathnameHasLocale(pathname)) {
    // Sačuvaj trenutni locale u cookie-ju
    const currentLocale = getLocaleFromPathname(pathname);
    if (currentLocale) {
      const response = NextResponse.next();
      response.cookies.set('i18nextLng', currentLocale, {
        maxAge: 365 * 24 * 60 * 60, // 1 godina
        path: '/',
        sameSite: 'lax'
      });
      return response;
    }
    return NextResponse.next();
  }

  // Detektuj locale na osnovu prioriteta:
  // 1. Cookie
  // 2. Accept-Language header
  // 3. Default locale
  let locale = defaultLocale;

  // Prvo proveravamo cookie
  const cookieLocale = request.cookies.get('i18nextLng')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    locale = cookieLocale;
  } else {
    // Zatim proveravamo Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    locale = getLocaleFromAcceptLanguage(acceptLanguage);
  }

  // Redirect na putanju sa locale
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  
  const response = NextResponse.redirect(redirectUrl);
  
  // Postavi cookie sa detektovanim locale-om
  response.cookies.set('i18nextLng', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 godina
    path: '/',
    sameSite: 'lax'
  });

  return response;
}

// Konfiguracija middleware-a - definiše na kojim putanjama se izvršava
export const config = {
  // Matcher za sve putanje osim isključenih
  matcher: [
    /*
     * Match sve putanje osim:
     * - api (API rute)
     * - _next/static (static fajlovi)
     * - _next/image (image optimization fajlovi)
     * - favicon.ico (favicon fajl)
     * - opengraph-image, twitter-image (metadata slike)
     * - fajlovi sa ekstenzijama
     */
    '/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|.*\\.).*)'
  ]
};

// Export tipova za TypeScript
export type SupportedLocale = typeof locales[number];
export { locales, defaultLocale };