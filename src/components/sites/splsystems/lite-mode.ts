/**
 * "Lite" visitors get the static, fast version of the site: phones/small
 * tablets only. Desktop, laptops and TVs always get the full animations.
 */
export const LITE_QUERY = "(max-width: 767px)";

export function isLiteMode(): boolean {
  return window.matchMedia(LITE_QUERY).matches;
}
