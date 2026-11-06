/**
 * "Lite" visitors get the static, fast version of the site: phones/small
 * tablets (the WebGL heroes and long intro are the main GPU/CPU cost there)
 * and anyone who asked for reduced motion. Desktop is unaffected.
 */
export const LITE_QUERY = "(max-width: 767px), (prefers-reduced-motion: reduce)";

export function isLiteMode(): boolean {
  return window.matchMedia(LITE_QUERY).matches;
}
