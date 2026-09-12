# Behaviors — Qurtuba Project Case Study

## Global
- Headings use word-by-word slide-up+fade reveal on scroll into view (matches existing `RevealWords`).
- Eyebrow/caption labels (uppercase, small) scramble-in on scroll into view (matches existing `ScrambleText`).
- Cards/media fade-up on scroll into view (matches existing `FadeUp`).
- No Lenis/smooth-scroll wrapper detected beyond the existing site-wide behavior already in the homepage clone (native scroll).

## ComparisonSlider — INTERACTION MODEL: drag (click-and-drag / touch-drag, not scroll or click-to-toggle)
- Structure: two full-width images stacked (`img-left` under, `img-right` clipped to a %), a vertical divider handle (`mover`) draggable left/right.
- Behavior to implement: track pointer x position within the container; clip the "after" image (comparison-after.png.webp) to `inset(0 ${100-pct}% 0 0)` where `pct` = pointer position as % of container width; the divider line + handle sit at that %. Default position: 50%.
- Use pointerdown/pointermove/pointerup (works for mouse + touch). No native browser drag-and-drop needed.

## FeaturesScroll — INTERACTION MODEL: scroll-driven (sticky pinned column + progress-based active index)
- NOT click-driven. Confirmed by inspecting live DOM: `.scroll-block.features` is a tall (~4700px) track; inside it `.scroll-block-holder` has `position: sticky; top: -85px` and pins the illustration+heading while the user scrolls through the tall track.
- Two columns inside the sticky holder: left = `.features__illustrations` (stack of 7 images, absolutely/relatively overlaid, each `opacity: 0` inactive → `opacity: 1` active, `transition: opacity 0.6s`), right = `.features__items-wrap` containing 7 `.features__item` blocks in normal document flow, each ~700-800px tall (the tall block height IS the scroll distance for that feature). Inactive item text is dimmed (`opacity: 0.5`), active is `opacity: 1`, `transition: opacity 0.3s`.
- Implementation approach: render the 7 text items stacked normally (tall padding to control scroll pacing), wrap the image column in `sticky top-24` (offset for the fixed header), and use one `IntersectionObserver` per item with `rootMargin: "-45% 0px -45% 0px"` (roughly centers the trigger in the viewport) to toggle each item's active state and the matching image's opacity. Only one item active at a time.
- Desktop only for the illustration column (`pc-visible` class on source — hide the sticky image column below the `lg` breakpoint, feature text items still stack normally on mobile).

## ProcessPhase stage image placement (exact, verified via DOM order — do not re-derive, use as-is)
Each phase = intro (caption + big title + 1-3 paragraphs) followed by stage blocks; images are interleaved at specific points, not one-per-stage uniformly:

**Research** (5 stages):
1. intro → **[research-1a, research-1b]** (2-up) → Stage 1 "Documentation analysis" → Stage 2 "Competitor analysis" → **[research-2a, research-2b]** (2-up) → Stage 3 "UX audit" → **[research-3]** (1-up) → Stage 4 "Consult (BA)" → Stage 5 "Informational architecture" → **[research-4]** (1-up)

**Design** (4 stages):
1. intro → Stage 1 "Wireframes" → **[design-1]** → Stage 2 "Design direction" → **[design-2]** → Stage 3 "Product UI design" → **[design-3a, design-3b, design-3c]** (3-up) → Stage 4 "Design system" → **[design-4a, design-4b, design-4c]** (3-up, section closes here — Features section follows)

**Development** (3 stages):
1. intro → **[dev-1]** → Stage 1 "APIs & back-end analysis" → **[dev-2a, dev-2b]** (2-up) → Stage 2 "Front-end development" → **[dev-3]** → Stage 3 "Back-end development" → **[dev-4]** (closing image)

Each stage block itself: small uppercase "Stage N" label (color `rgba(8,13,16,.5)`, tracking-wide), then a large heading (title--xl, ~64-107px depending on viewport, word-reveal animated), then below in a 2-col grid (`col-2` desktop / stacks to 1 col mobile): left column empty/decorative on desktop (`pc-visible` spacer — omit, not meaningful content), right column = the description paragraph(s) at `txt--l` size. Images render full-bleed below the stage text, in a row (`gap-34`) when multiple.

## Stat cards (StatCard) — used twice verbatim
3 cards, identical content in Hero and Conclusion sections:
1. "95% satisfaction in progress tracking" — "95% of parents and educators praise the platform for simplifying progress tracking with live class access, automated updates, and quick homework checks, boosting academic engagement by 30%."
2. "2x boost in learning productivity" — "Optimized tools enable students to complete lessons twice as fast, while interactive methods increase engagement by 40%, making learning faster and more enjoyable."
3. "Streamlined communication tools" — "New chat and notifications enhance communication among teachers, students, and parents, ensuring instant updates and 25% faster response times, boosting satisfaction."
Card style: bg `rgba(8,13,16,0.04)`, border `0.8px solid transparent`, radius ~16px, padding ~34px, 3-col grid on desktop, 1-col mobile.

## Responsive (verified breakpoint patterns consistent with homepage clone conventions)
- Desktop (1440px+): multi-column grids as described (`col-2`, `col-3`) at full gaps.
- Tablet (768px): grids generally stay 2-col where content allows, `FeaturesScroll` sticky illustration likely still visible down to `lg` (1024px) then hides.
- Mobile (390px): all grids collapse to 1 column (`col-1-mob` classes throughout source); `FeaturesScroll` illustration column hidden (`pc-visible`), only the stacked text items remain, each still fading/dimming on scroll is optional at this width — acceptable to just show all items at full opacity on mobile for simplicity.
