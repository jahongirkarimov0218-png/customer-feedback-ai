/**
 * Security Utilities for Customer Feedback AI Intelligence
 * Defense-in-depth implementations for:
 * 1. Rate Limiting (Token Bucket / Sliding Window per IP)
 * 2. Input Sanitization (Null bytes, control character stripping)
 * 3. Validation constants (Max/Min length constraints)
 * 4. CSV Formula Injection Neutralization (CWE-1236)
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting (isolated per serverless container)
const rateLimitMap = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL_MS = 60000;
let lastCleanup = Date.now();

export const MAX_FEEDBACK_LENGTH = 5000;
export const MIN_FEEDBACK_LENGTH = 10;
export const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute
export const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

/**
 * Checks and updates rate limit for a given IP identifier.
 */
export function checkRateLimit(
  ip: string,
  limit: number = RATE_LIMIT_MAX_REQUESTS,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();

  // Periodic garbage collection for memory hygiene
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetAt <= now) {
        rateLimitMap.delete(key);
      }
    }
    lastCleanup = now;
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetIn: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetIn: Math.ceil((entry.resetAt - now) / 1000),
  };
}

/**
 * Reset rate limit cache (useful for testing)
 */
export function resetRateLimitCache(): void {
  rateLimitMap.clear();
  lastCleanup = Date.now();
}

/**
 * Extract client IP from request headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Sanitizes input text:
 * - Strips null bytes (\0)
 * - Strips non-printable ASCII control characters (0x00-0x08, 0x0B, 0x0C, 0x0E-0x1F, 0x7F)
 * - Preserves standard whitespace (\n, \r, \t)
 * - Unicode normalization (NFC)
 */
export function sanitizeFeedbackInput(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/\0/g, "")
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .normalize("NFC");
}

/**
 * Sanitizes a single CSV cell to neutralize Formula Injection (CWE-1236).
 * Prepend single quote (') if the field starts with =, +, -, @, \t, \r, or %
 */
export function sanitizeCSVField(value: string | undefined | null): string {
  if (!value) return '""';
  let escaped = String(value).replace(/"/g, '""');
  // Check for spreadsheet formula triggers
  if (/^[=+\-@\t\r%]/.test(escaped)) {
    escaped = `'${escaped}`;
  }
  return `"${escaped}"`;
}
