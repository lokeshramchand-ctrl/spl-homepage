import { verifySolution } from "@/lib/contact/captcha";
import { isMailConfigured, sendContactEmail } from "@/lib/contact/mailer";
import { clientIp, createRateLimiter } from "@/lib/contact/rate-limit";
import { validateContact } from "@/lib/contact/validate";

const MAX_BODY_BYTES = 16 * 1024;
const limit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Rejects cross-site posts: browsers always send Origin on a fetch POST. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients; the captcha still applies
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  } catch {
    return false;
  }
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    // Enforce the cap while streaming too: Content-Length can lie or be absent.
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return json({ error: "unsupported_media_type" }, 415);

  const ip = clientIp(request.headers);
  const verdict = limit(ip);
  if (!verdict.ok) return json({ error: "rate_limited" }, 429, { "Retry-After": String(verdict.retryAfter) });

  const body = await readBody(request);
  if (!body) return json({ error: "invalid_body" }, 400);

  // Honeypot: a field hidden from people. Bots that fill it get a fake
  // success so they don't learn to skip it.
  if (typeof body.company === "string" && body.company.trim() !== "") return json({ ok: true });

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length > 0) return json({ error: "invalid_fields", fields: errors }, 400);

  const captcha = verifySolution(body.captcha);
  if (captcha !== "ok") return json({ error: "captcha_failed", reason: captcha }, 403);

  if (!isMailConfigured()) {
    console.error("[contact] SMTP_URL is not set; enquiry not delivered");
    return json({ error: "unavailable" }, 503);
  }
  try {
    await sendContactEmail(data, ip);
  } catch (error) {
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : error);
    return json({ error: "delivery_failed" }, 502);
  }
  return json({ ok: true });
}
