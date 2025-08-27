/**
 * Common TypeScript type definitions
 * Replaces all any types with proper interfaces
 */

// i18n types
export type SupportedLocale = 'sr' | 'de' | 'en';

export interface TranslationOptions {
  lng?: string;
  fallbackLng?: string;
  defaultValue?: string;
  count?: number;
  context?: string;
  replace?: Record<string, string | number>;
  [key: string]: unknown;
}

export type TranslationFunction = (
  key: string | string[], 
  options?: TranslationOptions
) => string;

// Logger types
export interface LogContext {
  component?: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  method?: string;
  statusCode?: number;
  errorCode?: string;
  timestamp?: string;
  environment?: string;
  requestId?: string;
  [key: string]: unknown;
}

export interface LogData {
  message?: string;
  data?: unknown;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

// Form validation types
export interface ContactFormInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  [key: string]: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
}

// API Response types
export type ApiResponseData = 
  | string 
  | number 
  | boolean 
  | null
  | { [key: string]: unknown }
  | unknown[];

// Blog type guards input
export type UnknownObject = Record<string, unknown>;

// Sitemap types
export interface SitemapLocation {
  url: string;
  lastModified: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}