import { createChallenge } from "@/lib/contact/captcha";
import { clientIp, createRateLimiter } from "@/lib/contact/rate-limit";

const limit = createRateLimiter({ limit: 30, windowMs: 10 * 60 * 1000 });

export function GET(request: Request) {
  const verdict = limit(clientIp(request.headers));
  if (!verdict.ok) {
    return Response.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(verdict.retryAfter), "Cache-Control": "no-store" } },
    );
  }
  return Response.json(createChallenge(), { headers: { "Cache-Control": "no-store" } });
}
