/**
 * Production-safe logging utility
 * Kondicionalno logovanje - samo u development okruženju
 */

type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
  component?: string;
  function?: string;
  userId?: string;
  requestId?: string;
  [key: string]: any;
}

class Logger {
  private isDev: boolean;

  constructor() {
    this.isDev = process.env.NODE_ENV === 'development';
  }

  /**
   * Basic log - samo u development okruženju
   */
  log(...args: any[]): void {
    if (this.isDev) {
      console.log('[NextPixel]', ...args);
    }
  }

  /**
   * Error logging - uvek aktivan, ali sa kontrolisanim output-om
   */
  error(message: string, error?: Error | any, context?: LogContext): void {
    if (this.isDev) {
      console.error('[NextPixel ERROR]', message, error, context);
    } else {
      // U produkciji možemo poslati na tracking servis (Sentry, LogRocket, etc.)
      // Za sada samo struktuiran error format
      const errorLog = {
        level: 'error' as LogLevel,
        message,
        error: error?.message || error,
        context,
        timestamp: new Date().toISOString(),
      };
      
      // Ovde bi trebalo dodati integraciju sa error tracking servisom
      // npr: Sentry.captureException(error, { contexts: { custom: context } });
    }
  }

  /**
   * Warning - važno za debugging ali ne kritično
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.warn('[NextPixel WARN]', message, context);
    }
  }

  /**
   * Info logging - za važne sistemske informacije
   */
  info(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.info('[NextPixel INFO]', message, context);
    }
  }

  /**
   * Debug logging - detaljno za razvoj
   */
  debug(message: string, data?: any, context?: LogContext): void {
    if (this.isDev) {
      console.debug('[NextPixel DEBUG]', message, data, context);
    }
  }

  /**
   * API call logging - za praćenje API poziva
   */
  apiCall(method: string, url: string, status?: number, duration?: number): void {
    if (this.isDev) {
      console.log('[NextPixel API]', { method, url, status, duration });
    }
  }

  /**
   * Performance timing
   */
  time(label: string): void {
    if (this.isDev) {
      console.time(`[NextPixel] ${label}`);
    }
  }

  timeEnd(label: string): void {
    if (this.isDev) {
      console.timeEnd(`[NextPixel] ${label}`);
    }
  }
}

// Singleton instance
export const logger = new Logger();

// Export helper functions za lakše korišćenje
export const log = (...args: any[]) => logger.log(...args);
export const logError = (message: string, error?: Error | any, context?: LogContext) => 
  logger.error(message, error, context);
export const logWarn = (message: string, context?: LogContext) => 
  logger.warn(message, context);
export const logInfo = (message: string, context?: LogContext) => 
  logger.info(message, context);
export const logDebug = (message: string, data?: any, context?: LogContext) => 
  logger.debug(message, data, context);

export default logger;