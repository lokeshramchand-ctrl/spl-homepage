# Career Page Topology — phenomenonstudio.com/career/

Site key: `phenomenonstudio-com-7df14782` · Page key: `career-92d350b5` · Route: `/career`

## Layout
- Single scroll container, no smooth-scroll library (no `.lenis`), `scroll-behavior: auto`.
- `body` classes: `disable-scrollbar loaded`. No dark/light theme toggle on this page.
- Rounded "clipped" section transitions: dark hero has `border-radius: 0 0 80px 80px` (clipped-bottom). The dark "OUR KEY STRENGTH" section is `clipped-top` + `clipped-bottom` with `border-radius: 80px` (mobile: 32px).
- Reuses site-wide `Header` and `Footer` components from `root-8a5edab2` namespace (confirmed pattern already used by `/projects/*` routes).

## Sections (top to bottom)

1. **Header** (shared, reused as-is from `root-8a5edab2/Header`) — sticky/fixed top nav, unchanged on this page.
2. **Hero** (`section.hero.bg--dark`) — dark hero, caption + word-reveal title + subtitle + orange CTA button linking externally to Hurma job board, plus a 6-stat facts grid. Interaction: scroll-into-view word/line reveal (`RevealWords`/`ScrambleText`), no scroll-driven header changes.
3. **AboutQuotes** (`section.a-bit-more`) — "A bit more about us" heading + intro paragraph, then a 3-column grid of employee quotes with avatar/name/role. Static layout, scroll-reveal only.
4. **ValuesSection** (`section.problems_we_solve.career-view`) — "What guides us" heading, then 7 sticky-stacked rows (num + short label on left, heading + body on right). INTERACTION MODEL: scroll-driven — each row is `position: sticky; top: 0` and cross-fades its `.inner` opacity via a scroll-position-based JS calculation (not IntersectionObserver toggle, continuous 0→1 interpolation as the row approaches/leaves the sticky position). White background section.
5. **GrowthStories** (`section.how_we_do_it_section.bg--dark`, 1st of two `how_we_do_it_section`s) — "We build leaders from within" — dark, clipped-top/bottom rounded section containing 3 sticky-stacked rows (same scroll-driven fade mechanism as ValuesSection but dark theme, and each row's right column also contains a nested quote card with avatar).
6. **BenefitsGrid** (`section.how_we_do_it_section.bg--white`, 2nd of two) — "Extra benefits" — heading then a 3-column grid (10 cards) with asterisk icon, title, body, separated by vertical divider lines (`vertical_line` pattern, same as homepage's services grid).
7. **CareerCTA** (`footer .lets-collaborate`, visually part of footer but distinct content) — dark full-width banner, "Ready to join us?" that hover-swaps to "View openings", links externally to Hurma job board. Career-page-specific text (homepage's footer CTA says "Let's collaborate" and links to `/#contact`).
8. **Footer** (shared, reused as-is from `root-8a5edab2/Footer`) — explore links, socials, offices, badges, bottom bar, all-services accordion. Requires a small prop extension to support a page-specific CTA (see FOUNDATION notes below).

## Responsive breakpoints
Follows the site's existing convention already implemented in `root-8a5edab2` components: 3-column grids collapse to 1 column on mobile (`sm:`/`lg:` Tailwind breakpoints matching `col-3 col-1-mob` source classes), sticky-stack rows go full width and stack normally in flow (no `position:sticky` change observed on the source at narrow width — same sticky mechanism persists). Desktop reference: 1440px. Mobile reference: 390px.

## Foundation notes
- No new fonts/colors — page reuses existing Bricolage Grotesque / Albert Sans design tokens already configured in `globals.css` and `layout.tsx` from the homepage clone.
- `Footer.tsx` (shared) needs optional props (`ctaText`, `ctaHoverText`, `ctaHref`) with defaults matching current behavior, so the career page can swap in "Ready to join us? / View openings" → Hurma link without duplicating the explore-links/offices/badges/accordion markup. This is a small, backward-compatible foundation edit done directly (not delegated).
- No smooth scroll, no dark/light mode toggle, no new icon library needed — reuses `shared/icons.tsx`, `shared/button.tsx`, `shared/reveal.tsx` (`RevealWords`, `ScrambleText`, `FadeUp`).
