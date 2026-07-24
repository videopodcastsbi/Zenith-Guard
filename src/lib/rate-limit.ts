// Simple in-memory rate limiter for demo purposes
// In production, use Redis or a proper rate limiting service

interface RateLimitData {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitData>();

const ENDPOINT_LIMITS = {
  events: { limit: 100, windowMs: 60000 },     // 100 per minute
  player: { limit: 50, windowMs: 60000 },      // 50 per minute
  heartbeat: { limit: 10, windowMs: 60000 },   // 10 per minute
  detection: { limit: 20, windowMs: 60000 },   // 20 per minute
  moderation: { limit: 10, windowMs: 60000 },  // 10 per minute
  default: { limit: 60, windowMs: 60000 }      // 60 per minute
};

export function checkRateLimit(
  identifier: string, 
  endpoint: keyof typeof ENDPOINT_LIMITS | 'default' = 'default'
) {
  const config = ENDPOINT_LIMITS[endpoint] || ENDPOINT_LIMITS.default;
  const key = `${identifier}:${endpoint}`;
  const now = Date.now();
  
  let data = store.get(key);
  
  // If no data or window expired, reset
  if (!data || now > data.resetAt) {
    data = {
      count: 0,
      resetAt: now + config.windowMs
    };
  }
  
  // Increment
  data.count++;
  store.set(key, data);
  
  const allowed = data.count <= config.limit;
  const remaining = Math.max(0, config.limit - data.count);
  
  return {
    allowed,
    limit: config.limit,
    remaining,
    resetTime: Math.ceil(data.resetAt / 1000) // Unix timestamp in seconds
  };
}

// Cleanup interval to prevent memory leaks in dev
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of store.entries()) {
      if (now > data.resetAt) {
        store.delete(key);
      }
    }
  }, 60000); // Clean up every minute
}
