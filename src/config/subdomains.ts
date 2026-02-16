import type { Locale } from './i18n';

export interface SubdomainConfig {
  hostname: string;
  devHostname: string;
  defaultLocale: Locale;
  baseUrl: string;
  internalPrefix: string;
}

export const subdomains: Record<string, SubdomainConfig> = {
  booking: {
    hostname: 'booking.nextpixel.dev',
    devHostname: 'booking.localhost',
    defaultLocale: 'de',
    baseUrl: 'https://booking.nextpixel.dev',
    internalPrefix: '/booking',
  },
};

/**
 * Detect subdomain from request host header.
 * Returns the subdomain key (e.g. 'booking') or null for the main site.
 */
export function getSubdomainFromHost(host: string | null): string | null {
  if (!host) return null;

  // Strip port for comparison
  const hostname = host.split(':')[0];

  for (const [key, config] of Object.entries(subdomains)) {
    if (hostname === config.hostname || hostname === config.devHostname) {
      return key;
    }
  }

  return null;
}
