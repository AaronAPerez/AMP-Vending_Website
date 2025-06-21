// lib/utils/rateLimit.ts
import { NextRequest } from 'next/server';

/**
 * Rate Limiting Utility
 * Build Process: Implements sliding window rate limiting with Redis-like behavior
 */
interface RateLimitResult {
  currentCount: any;
  suspicious: any;
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

class InMemoryStore {
  private store = new Map<string, { count: number; windowStart: number; attempts: number[] }>();
  
  /**
   * Get rate limit info for a key
   */
  get(key: string): { count: number; windowStart: number; attempts: number[] } | null {
    return this.store.get(key) || null;
  }
  
  /**
   * Set rate limit info for a key
   */
  set(key: string, value: { count: number; windowStart: number; attempts: number[] }): void {
    this.store.set(key, value);
  }
  
  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now - value.windowStart > 15 * 60 * 1000) { // 15 minutes
        this.store.delete(key);
      }
    }
  }
}

const store = new InMemoryStore();

// Clean up expired entries every 5 minutes
setInterval(() => store.cleanup(), 5 * 60 * 1000);

/**
 * Rate limit function with sliding window
 */
export async function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  let data = store.get(key);
  
  if (!data) {
    data = { count: 0, windowStart: now, attempts: [] };
  }
  
  // Clean old attempts (sliding window)
  data.attempts = data.attempts.filter(timestamp => now - timestamp < windowMs);
  
  // Check if limit exceeded
  if (data.attempts.length >= limit) {
    const oldestAttempt = Math.min(...data.attempts);
    const retryAfter = Math.ceil((oldestAttempt + windowMs - now) / 1000);
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: oldestAttempt + windowMs,
      retryAfter,
      currentCount: data.count,
      suspicious: true,
    };
  }
  
  // Add current attempt
  data.attempts.push(now);
  data.count = data.attempts.length;
  
  store.set(key, data);
  
  return {
    allowed: true,
    remaining: limit - data.count,
    resetTime: now + windowMs,
    currentCount: data.count,
    suspicious: false,
  };
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}