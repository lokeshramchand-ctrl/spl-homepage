import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Every page is statically rendered, so the CSP is set here without nonces
// (nonces would force dynamic rendering). 'unsafe-inline' scripts cover the
// entry-gate script, JSON-LD and Next's own inline bootstrap; every asset,
// font and image is first-party, so nothing else is allowlisted.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  // No includeSubDomains/preload: those commit every *.splsystems.in host
  // (e.g. ai.splsystems.in) to HTTPS and are hard to roll back.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  allowedDevOrigins: ["192.168.1.11", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: SECURITY_HEADERS },
      // public/ files aren't content-hashed (unlike /_next/static), so they
      // get a day of freshness plus a week of stale-while-revalidate instead
      // of `immutable`: repeat visits skip the network, and a replaced file
      // still shows up within a day.
      {
        source: "/sites/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
