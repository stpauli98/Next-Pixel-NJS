// i18n Configuration Constants
export const i18nConfig = {
  defaultLocale: 'sr',
  locales: ['sr', 'en', 'de'] as const,
  localeNames: {
    sr: 'Српски',
    en: 'English',
    de: 'Deutsch'
  },
  localeCodes: {
    sr: 'sr_RS',
    en: 'en_US',
    de: 'de_DE'
  },
  rtlLocales: [] as string[],
  cookieName: 'i18next',
  cookieOptions: {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production'
  }
} as const;

export type Locale = typeof i18nConfig.locales[number];

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return i18nConfig.defaultLocale;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/');
  const currentLocale = segments[1];
  
  if (isValidLocale(currentLocale)) {
    segments[1] = locale;
    return segments.join('/');
  }
  
  if (locale === i18nConfig.defaultLocale) {
    return pathname;
  }
  
  return `/${locale}${pathname}`;
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    segments.splice(1, 1);
    return segments.join('/') || '/';
  }
  
  return pathname;
}

// SEO helpers for language alternates
export function generateAlternateLinks(pathname: string) {
  const basePath = stripLocaleFromPathname(pathname);
  const baseUrl = 'https://nextpixel.dev';
  
  return {
    canonical: `${baseUrl}${basePath}`,
    alternates: i18nConfig.locales.map(locale => ({
      hrefLang: locale === i18nConfig.defaultLocale ? 'x-default' : locale,
      href: locale === i18nConfig.defaultLocale 
        ? `${baseUrl}${basePath}`
        : `${baseUrl}/${locale}${basePath}`
    }))
  };
}

// Generate hreflang tags for SEO
export function generateHreflangTags(pathname: string) {
  const { canonical, alternates } = generateAlternateLinks(pathname);
  
  return {
    canonical,
    languages: alternates.reduce((acc, alt) => {
      if (alt.hrefLang !== 'x-default') {
        acc[alt.hrefLang] = alt.href;
      }
      return acc;
    }, {} as Record<string, string>)
  };
}