# Career Page Behaviors — phenomenonstudio.com/career/

## Scroll sweep
- No header appearance change on scroll (verified: header stays `button-white`/fixed styling constant).
- No scroll-snap containers.
- No smooth-scroll library (no `.lenis` class, `scrollBehavior: auto` on `<html>`).
- Headings/captions/paragraphs use IntersectionObserver-driven reveal-on-scroll: word-by-word slide-up+fade for `<title>` elements (class `isview slidetop new-animate`, staggered `transition-delay` per word, 0.08s increments), scramble-in for uppercase eyebrow captions (class `scramble`), simple fade+slide for body paragraphs (class `slidetop trd02`). These map directly to the already-built `RevealWords`, `ScrambleText`, `FadeUp` helpers in `shared/reveal.tsx` — reuse them as-is.
- **Sticky-stack scroll-driven fade** (ValuesSection, GrowthStories): each row is `position: sticky; top: 0` inside a taller scroll track. Verified via scroll test (scrollTo 3200px): row-1 `.inner` opacity 0 (fully covered/passed), row-2 opacity 0.269 (mid-transition), row-3 opacity 0.836, row-4+ opacity 1 (fully visible, not yet covered). `transform` stayed `none` throughout — only `.inner`'s opacity is animated, via inline `style="opacity: ..."` set by a scroll listener (not a CSS transition or IntersectionObserver toggle — it's continuously recalculated proportional to scroll position). Border-top divider (`1px solid rgb(233,233,233)` on white bg; a translucent white/8 line on dark bg) sits on each row's top edge, visible once the row beneath fades revealing separation. Approximate for the clone: compute progress via `getBoundingClientRect` inside a scroll listener (0 = row top at viewport top, 1 = row about to be fully covered by next sticky row) and set `.inner` opacity via that progress. This matches the general sticky-stack pattern already approximated in the homepage's `ProblemsWeSolve.tsx` (which instead staggers `top` offsets) — the career page variant instead keeps `top: 0` for every row and animates opacity, so builders should NOT copy `ProblemsWeSolve`'s top-offset approach verbatim; implement the opacity-fade version described here.

## Click sweep
- "Explore Open Vacancies" hero button → external link to `https://phenomenonstudio.hurma.work/public-vacancies` (target="_blank").
- "Ready to join us?" footer CTA banner → external link to the same Hurma vacancies URL (no target attribute, same tab).
- No tabs, accordions, or modals specific to this page beyond the site-wide smart-search popup and mobile menu (already handled by shared Header).

## Hover sweep
- CTA button (hero): `bg--orange` → `hover--white` (background flips from orange `rgb(255,122,0)` to white, text presumably flips to dark — matches existing `Button` component's `orange` variant which already implements `hover:bg-white hover:text-[#080d10]`). Reuse `shared/button.tsx` `Button` with `variant="orange"`.
- Footer CTA banner ("Ready to join us?" / "View openings"): two stacked text lines, hover swaps which is shown. Both spans measured as `opacity: 1` in computed styles (the swap likely uses a translateY/overflow-hidden wrapper rather than opacity toggle — computed opacity of both at rest is 1 because the technique masks via clipping, not fading). For the clone, implement as: wrapper `overflow-hidden`, two stacked lines, `group-hover:-translate-y-full` with `transition-transform duration-400 ease` on an inner flex column — a standard "line-swap on hover" reveal that matches the visual result even if the exact source mechanism differs slightly.
- Vertical divider lines (`vertical_line`) in the benefits grid are static decorative elements, no hover state observed.

## Responsive sweep (1440 / 768 / 390)
- Stats grid (hero): 3 columns desktop → 2 columns mobile (source class `col-3 col-2-mob`).
- Quotes grid (AboutQuotes): 3 columns desktop → 1 column mobile (source class `col-3 col-1-mob`).
- Sticky-stack rows (Values/GrowthStories): left label column (`344px` fixed) + right content column side-by-side desktop → stacks to a single column on mobile (standard `flex` → `flex-col` at the site's `sm`/`lg` breakpoint, consistent with other already-built sticky sections).
- Benefits grid: 3 columns desktop → 1 column mobile (source class `col-3 col-1-mob`), vertical divider lines hide/reflow to horizontal on mobile (`mob-visible` toggling on some lines) — acceptable simplification: hide vertical dividers below `sm`, keep horizontal borders between stacked cards instead.
- Footer CTA banner heading is very large (`170px` desktop computed) — must clamp down aggressively on mobile (matches existing homepage Footer's `text-4xl sm:text-6xl` scale-down pattern; use a similarly large but responsive clamp e.g. `text-5xl sm:text-7xl lg:text-8xl`).
