/**
 * In-memory sliding-window limiter, keyed per client IP. Good for a single
 * self-hosted instance (output: "standalone"); several instances would each
 * keep their own window, so use a shared store (e.g. Redis) at that point.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, number[]>();

  return function check(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfter: number } {
    const since = now - windowMs;
    const recent = (hits.get(key) ?? []).filter((t) => t > since);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return { ok: false, retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000) };
    }
    recent.push(now);
    hits.set(key, recent);
    // Bound memory under an IP-spraying flood: drop idle keys, then oldest.
    if (hits.size > maxKeys) {
      for (const [k, times] of hits) if (times[times.length - 1] <= since) hits.delete(k);
      while (hits.size > maxKeys) hits.delete(hits.keys().next().value as string);
    }
    return { ok: true };
  };
}

/** Client IP as reported by the reverse proxy in front of the server. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
