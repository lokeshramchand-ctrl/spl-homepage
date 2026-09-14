# CareerHero Specification

## Overview
- **Target file:** `src/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/CareerHero.tsx`
- **Screenshot:** `docs/design-references/phenomenonstudio-com-7df14782/career-92d350b5/desktop-1440-full.png` (top section) and `mobile-390-full.png`
- **Interaction model:** scroll-driven reveal only (IntersectionObserver-based, via shared helpers). No click/hover state beyond the CTA button's built-in hover.

## DOM Structure
```
<section> dark bg, rounded bottom corners
  <div container>
    <caption>            -- "CAREERS AT PHENOMENON"
    <h1 title>            -- "Build phenomenal products. Join Phenomenon Studio."
    <p subtitle>          -- intro paragraph
    <a button>            -- "Explore Open Vacancies" (external link, new tab)
    <div stats-block>
      <caption>           -- "Phenomenon in facts and numbers"
      <div grid 3-col>    -- 6 stat cells (value + label)
```

## Computed Styles (exact values from getComputedStyle)

### Section
- backgroundColor: rgb(8, 13, 16)  → use `bg-[#080d10]`
- padding: 204px 0px 150px (top/bottom only; use `pt-[204px] pb-[150px]`, scale down on mobile to roughly `pt-28 pb-20`)
- borderRadius: 0 0 80px 80px (mobile: 0 0 32px 32px)
- color: white

### Container
- maxWidth: 1440px, centered, horizontal padding (match existing `mx-auto max-w-[1440px] px-4` pattern used across other components in this site)

### Caption ("CAREERS AT PHENOMENON")
- fontSize: 14px, fontWeight: 600, lineHeight: 16.1px, letterSpacing: 2.1px
- color: rgba(255,254,253,0.7) → `text-white/70`
- textTransform: uppercase, fontFamily: Bricolage Grotesque
- marginBottom: 24px (16px mobile)
- Use `ScrambleText` from `shared/reveal` — this is the exact "scramble" class behavior.

### Title (h1)
- fontSize: 68px, fontWeight: 440 (use 500/medium), lineHeight: 81.6px (~1.2), letterSpacing: -0.68px
- color: white, maxWidth: 1040px
- Responsive: scale down substantially on mobile (match existing Hero.tsx pattern: `text-[44px] sm:text-[56px] lg:text-[72px]`; here use similar scale e.g. `text-[40px] sm:text-[52px] lg:text-[68px]`)
- Use `RevealWords` from `shared/reveal` for the word-by-word slide-up reveal. Text renders as two visual lines but is one continuous string: "Build phenomenal products. Join Phenomenon Studio."

### Subtitle (p)
- fontSize: 23px, fontWeight: 400, lineHeight: 31.05px (~1.35), letterSpacing: -0.69px
- color: rgba(255,254,253,0.7) → `text-white/70`
- maxWidth: 706px, marginTop: 48px
- fontFamily: Albert Sans (this is the body font already configured in globals — just use default body text styling, no special font-family override needed if Albert Sans is already the base sans in this project's Tailwind config)
- Responsive: `text-lg sm:text-xl lg:text-[23px]`
- Wrap in `FadeUp` for scroll-reveal.

### CTA Button
- Use existing `Button` component from `shared/button.tsx` with `variant="orange"`, `href="https://phenomenonstudio.hurma.work/public-vacancies"`, `target="_blank"`.
- Label: "Explore Open Vacancies"
- marginTop: 24px
- Note: source uses `<b>` bold inner text — Button component already renders bold-weight uppercase labels, no change needed.

### Stats block caption ("Phenomenon in facts and numbers")
- Same styling as hero caption but color: rgba(255,254,253,0.6) → `text-white/60`
- marginTop: 60px, paddingTop: 32px (i.e. `mt-16 pt-8` roughly, or `mt-[60px] pt-8`)
- Use `ScrambleText`.

### Stats grid
- display: grid, 3 columns desktop (459px each), gap ~24px; 2 columns on mobile (source class `col-3 col-2-mob`)
- Tailwind: `grid grid-cols-2 sm:grid-cols-3 gap-6`
- Each cell: centered flex column (`flex flex-col items-center text-center`)

### Stat value
- fontSize: 48px, fontWeight: 440 (medium), lineHeight: 52.8px, letterSpacing: -0.48px, color: white
- Tailwind: `text-4xl sm:text-5xl font-medium text-white`

### Stat label
- fontSize: 16px, fontWeight: 400, lineHeight: 23.2px, letterSpacing: -0.04px
- color: rgba(255,254,253,0.6) → `text-white/60`
- textTransform: lowercase (source renders lowercase visually — apply `lowercase` class or just type the label text in lowercase, matching content below)
- Tailwind: `mt-1 text-sm text-white/60`

## States & Behaviors
### Scroll-reveal (all text)
- **Trigger:** IntersectionObserver, element enters viewport (~20% threshold, matches `useInView` default in `shared/reveal.tsx`)
- **Mechanism:** Use `ScrambleText` for caption, `RevealWords` for the h1, `FadeUp` for subtitle/button/stats block — do not hand-roll new reveal logic, the primitives already exist and match this exact site's animation classes (`scramble`, `isview slidetop new-animate`, `slidetop trd02`).

### Hover (CTA button)
- Already implemented by `Button` `variant="orange"`: `bg-[#ff7a00] text-white hover:bg-white hover:text-[#080d10]`. No extra work needed — just use the component.

## Per-State Content
N/A — no stateful tabs/toggles in this section.

## Assets
- No images/videos in this section — pure text on solid dark background. No downloads needed.

## Text Content (verbatim)
- Caption: `Careers at Phenomenon`
- Title: `Build phenomenal products. Join Phenomenon Studio.`
- Subtitle: `If you have a quality-first mindset and want to build products that matter, bring your expertise and curiosity to our team. Here, you'll have the space and ownership to turn your best ideas into reality!`
- Button: `Explore Open Vacancies` → `https://phenomenonstudio.hurma.work/public-vacancies` (new tab)
- Stats caption: `Phenomenon in facts and numbers`
- Stats (value, label):
  - `5+`, `locations across Europe & North America`
  - `120+`, `launched products`
  - `$500M+`, `raised by our clients`
  - `7+`, `years in the market`
  - `70+`, `professionals on board`
  - `40+`, `industry-recognized awards`

## Responsive Behavior
- **Desktop (1440px):** as described above, 3-col stats grid.
- **Tablet (768px):** title/subtitle scale down proportionally; stats grid likely still 3 columns or transitions to 2 — use 2 columns to be safe below `sm` and 3 at `sm:` and up if it reads better, but source explicitly says 2-col on mobile only, so keep 3 columns down to `sm` breakpoint and switch to 2 below that.
- **Mobile (390px):** stats grid 2 columns (`col-2-mob`), heading wraps naturally, padding reduces to roughly `pt-28 pb-16`.
- **Breakpoint:** ~640px (sm) for stats grid column change; ~1024px (lg) for title font-size max step, matching existing Hero.tsx convention.
