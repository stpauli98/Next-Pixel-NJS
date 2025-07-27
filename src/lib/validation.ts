/**
 * Validation utilities za API endpoints
 * Provides type-safe validation for contact form data
 */

// Email regex pattern za osnovnu validaciju
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex pattern za međunarodne telefone (opciono)
const PHONE_REGEX = /^[+]?[(]?[\d\s\-\(\)]{7,15}$/;

/**
 * Interface za contact form podatke
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  data?: ContactFormData;
}

/**
 * Sanitize string input - uklanja potencijalno opasne karaktere
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Uklanja HTML tagove
    .replace(/javascript:/gi, '') // Uklanja javascript: protokol
    .replace(/data:/gi, ''); // Uklanja data: URI scheme
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const sanitized = sanitizeString(email, 254); // RFC 5321 limit
  return EMAIL_REGEX.test(sanitized);
}

/**
 * Validate phone number format (opciono)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return true; // Phone je opciono
  }
  
  const sanitized = sanitizeString(phone, 20);
  return PHONE_REGEX.test(sanitized);
}

/**
 * Validate name field
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  const sanitized = sanitizeString(name, 100);
  return sanitized.length >= 2 && sanitized.length <= 100;
}

/**
 * Validate message field
 */
export function isValidMessage(message: string): boolean {
  if (!message || typeof message !== 'string') {
    return false;
  }
  
  const sanitized = sanitizeString(message, 5000);
  return sanitized.length >= 10 && sanitized.length <= 5000;
}

/**
 * Comprehensive validation za contact form
 */
export function validateContactForm(formData: any): ValidationResult {
  const errors: string[] = [];
  
  // Type checking
  if (!formData || typeof formData !== 'object') {
    return {
      isValid: false,
      errors: ['Invalid form data format']
    };
  }
  
  const { name, email, phone, message } = formData;
  
  // Name validation
  if (!isValidName(name)) {
    errors.push('Name must be between 2 and 100 characters');
  }
  
  // Email validation
  if (!isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }
  
  // Phone validation (opciono)
  if (phone && !isValidPhone(phone)) {
    errors.push('Please provide a valid phone number');
  }
  
  // Message validation
  if (!isValidMessage(message)) {
    errors.push('Message must be between 10 and 5000 characters');
  }
  
  // Vraćamo rezultat
  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }
  
  // Sanitize i vrati clean data
  const cleanData: ContactFormData = {
    name: sanitizeString(name, 100),
    email: sanitizeString(email, 254),
    phone: phone ? sanitizeString(phone, 20) : undefined,
    message: sanitizeString(message, 5000)
  };
  
  return {
    isValid: true,
    errors: [],
    data: cleanData
  };
}

/**
 * Rate limiting utility (simple in-memory implementation)
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  
  constructor(maxRequests: number = 5, windowMs: number = 60000) { // 5 requests per minute
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  /**
   * Check da li je IP address pod rate limit
   */
  isAllowed(ip: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(ip) || [];
    
    // Ukloni stare request-e van window
    const recentRequests = userRequests.filter(time => now - time < this.windowMs);
    
    // Check da li je dosegnut limit
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Dodaj novi request
    recentRequests.push(now);
    this.requests.set(ip, recentRequests);
    
    return true;
  }
  
  /**
   * Get remaining requests for IP
   */
  getRemaining(ip: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(ip) || [];
    const recentRequests = userRequests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - recentRequests.length);
  }
}

// Export global rate limiter instance
export const contactFormRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  // Check various headers za real IP
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback to localhost za development
  return '127.0.0.1';
}

/**
 * Create standardized API response
 */
export function createApiResponse(
  data: any, 
  status: number = 200, 
  message?: string
): Response {
  const response = {
    success: status >= 200 && status < 300,
    data: status >= 200 && status < 300 ? data : undefined,
    error: status >= 400 ? data : undefined,
    message,
    timestamp: new Date().toISOString()
  };
  
  return new Response(
    JSON.stringify(response), 
    { 
      status, 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      } 
    }
  );
}