import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import type { CaptchaChallenge, CaptchaSolution } from "./captcha-types";

/**
 * Self-hosted proof-of-work captcha (the ALTCHA scheme): the server hides a
 * random number behind a SHA-256 hash and HMAC-signs the challenge; the
 * browser brute-forces the number. Solving costs a visitor ~0.1-0.5s once,
 * but makes every bulk submission pay for itself. No third-party script,
 * cookie or tracking.
 *
 * Without CAPTCHA_SECRET a per-process secret is used: fine for one server,
 * but set it when running several instances so they accept each other's
 * challenges.
 */
const SECRET = process.env.CAPTCHA_SECRET || randomBytes(32).toString("hex");
export const CAPTCHA_MAX_NUMBER = 100_000;
const TTL_MS = 10 * 60 * 1000;
const MAX_TRACKED = 50_000;

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
const sign = (salt: string, challenge: string) =>
  createHmac("sha256", SECRET).update(`${salt}:${challenge}`).digest("hex");

/** Signatures already redeemed, until their challenge expires (blocks replay). */
const redeemed = new Map<string, number>();

function pruneRedeemed(now: number) {
  for (const [signature, expires] of redeemed) if (expires <= now) redeemed.delete(signature);
}

export function createChallenge(): CaptchaChallenge {
  const salt = `${Date.now() + TTL_MS}.${randomBytes(12).toString("hex")}`;
  const challenge = sha256(`${salt}${randomInt(0, CAPTCHA_MAX_NUMBER + 1)}`);
  return { salt, challenge, maxNumber: CAPTCHA_MAX_NUMBER, signature: sign(salt, challenge) };
}

export type CaptchaResult = "ok" | "invalid" | "expired" | "reused";

export function verifySolution(input: unknown, now = Date.now()): CaptchaResult {
  if (!input || typeof input !== "object") return "invalid";
  const { salt, challenge, signature, number } = input as Partial<CaptchaSolution>;
  if (
    typeof salt !== "string" || salt.length > 64 ||
    typeof challenge !== "string" || !/^[0-9a-f]{64}$/.test(challenge) ||
    typeof signature !== "string" || !/^[0-9a-f]{64}$/.test(signature) ||
    typeof number !== "number" || !Number.isInteger(number) || number < 0 || number > CAPTCHA_MAX_NUMBER
  ) {
    return "invalid";
  }

  const expected = Buffer.from(sign(salt, challenge), "hex");
  if (!timingSafeEqual(expected, Buffer.from(signature, "hex"))) return "invalid";
  if (sha256(`${salt}${number}`) !== challenge) return "invalid";

  const expires = Number(salt.split(".")[0]);
  if (!Number.isFinite(expires) || expires <= now) return "expired";

  if (redeemed.size >= MAX_TRACKED) pruneRedeemed(now);
  if (redeemed.has(signature)) return "reused";
  redeemed.set(signature, expires);
  return "ok";
}
