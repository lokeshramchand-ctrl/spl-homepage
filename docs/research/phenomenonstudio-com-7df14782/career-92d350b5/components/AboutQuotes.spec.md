# AboutQuotes Specification

## Overview
- **Target file:** `src/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/AboutQuotes.tsx`
- **Screenshot:** `docs/design-references/phenomenonstudio-com-7df14782/career-92d350b5/desktop-1440-full.png` (section below hero, "A bit more about us")
- **Interaction model:** static, scroll-reveal only (same IntersectionObserver primitives as CareerHero).

## DOM Structure
```
<section> white bg, pt-200 (pt-100 mobile)
  <div container>
    <caption>          -- "A BIT MORE ABOUT US"
    <h2 title>          -- "Started by designers who sweat every pixel"
    <p intro>           -- two paragraphs about company founding/team
  <div row mt-100>
    <div grid col-3>    -- 3 quote columns, separated by vertical divider lines
      <div column> x3
        <p quote>
        <div person>    -- avatar (icon--xxs, ~40px square) + name + role
```

## Computed Styles (exact values from getComputedStyle)

### Section
- padding: 200px top (100px mobile), no explicit bottom padding in this section alone (next section starts immediately after)
- backgroundColor: white (default page background)

### Container
- Same `mx-auto max-w-[1440px] px-4` convention as other sections.

### Caption ("A BIT MORE ABOUT US")
- Same styling family as CareerHero caption but dark-mode color: `color--dark-light` → approx `text-[#080d10]/50` (matches homepage's `ScrambleText` usage in `ProblemsWeSolve.tsx` which uses `text-[#080d10]/50` for its dark eyebrow caption — reuse that exact class).
- fontSize 14px, fontWeight 600, uppercase, letterSpacing 2.1px.

### Title (h2)
- fontSize: 40px desktop scaling family (source uses the same `.title--xl` class as CareerHero's h1, so use the same responsive scale as CareerHero: `text-[40px] sm:text-[52px] lg:text-[68px] font-medium leading-[1.2] tracking-tight`), color dark (`text-[#080d10]`).
- maxWidth: 1040px, marginTop: 24px (16px mobile) relative to caption.
- Use `RevealWords`.

### Intro paragraph
- fontSize: 23px family (`.txt--l`) — but note body copy in this block wraps two `<p>` tags inside one text container.
- color: `color--dark-secondary` → approx `text-[#080d10]/70`
- maxWidth: 674px, marginTop: 48px (32px mobile)
- Wrap in `FadeUp`.

### Quotes row
- marginTop: 100px (64px mobile)
- Grid: 3 columns desktop, 1 column mobile (source `col-3 col-1-mob`) → Tailwind `grid grid-cols-1 sm:grid-cols-3 gap-8` with vertical divider borders between columns on desktop (`sm:divide-x sm:divide-[#080d10]/10`, or simple left-border on non-first columns) and horizontal dividers on mobile (`divide-y` for stacked). Keep this simple: use `divide-x divide-[#080d10]/10` in a `sm:grid-flow-col` context, or simplest robust approach — apply `border-t border-[#080d10]/10 pt-8 sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0` per column except the first.

### Quote text
- fontSize: 23px (`.txt--l`), fontWeight 400, lineHeight ~1.35, color dark (`text-[#080d10]`)
- marginBottom: 32px before the person row.

### Person row
- flex row, items centered, gap 16px
- Avatar: small square image, `icon--xxs` ≈ 40px, rounded full (avatar images are circular headshots) — use `rounded-full object-cover`, size ~40px (`size-10`).
- Name: fontSize ~14px (`.txt--s`), color dark.
- Role: same size, `text-[#080d10]/70` (color--dark-secondary).
- Person row sits at the bottom of the column (`mt-auto` if column is a flex column with the quote taking available space) — use `flex flex-col h-full` on column with quote `flex-1` and person block `mt-auto pt-8`.

## States & Behaviors
- Scroll-reveal only: caption via `ScrambleText`, h2 via `RevealWords`, intro paragraph and each quote column via `FadeUp` (stagger each column's `delayMs` by index × ~100ms for a nicer cascade, matching the general site feel — this is a reasonable enhancement consistent with the site's stagger patterns elsewhere).
- No hover states documented on this section (static testimonial cards, not links).

## Per-State Content
N/A.

## Assets
Download these 3 avatar images into `public/sites/phenomenonstudio-com-7df14782/career-92d350b5/images/`:
- `av-5.png.webp` ← `https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-5.png.webp` (126×126)
- `av-1-1.png.webp` ← `https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-1-1.png.webp` (126×126)
- `av-2-1.png.webp` ← `https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-2-1.png.webp` (126×126)

Reference them via Next `Image` with `src="/sites/phenomenonstudio-com-7df14782/career-92d350b5/images/<file>"`.

## Text Content (verbatim)
- Caption: `A BIT MORE ABOUT US`
- Title: `Started by designers who sweat every pixel`
- Intro paragraph 1: `Phenomenon Studio was founded in 2019 as a small group of designers obsessed with grounding exquisite design in clear logic while infusing high-end aesthetics into every pixel.`
- Intro paragraph 2: `Today, we're an award-winning product design and development agency of 70+ incredibly talented people collaborating with global startups and SMEs that demand excellence in work, quality in execution, and maturity in operations – the same qualities we look for when we hire.`
- Quote 1: `We have a very close-knit team. There's no judgment here - you can always ask for help, and that's something I truly value.` — **Valeria Varlamova**, Project Manager, avatar `av-5.png.webp`
- Quote 2: `You can feel inspiration and support from everyone on the team. My biggest source of motivation comes from the team as a whole - like one living, breathing organism.` — **Serhii Feshchyk**, UI/UX Designer, avatar `av-1-1.png.webp`
- Quote 3: `Almost everyone I work closely with inspires me in their own way. Everyone values their work, and what unites us is openness. Each person adds something unique that helps our processes grow and the team stay supported.` — **Olga Apanasenko**, Sales Operations, avatar `av-2-1.png.webp`

## Responsive Behavior
- **Desktop (1440px):** 3-column quote grid with vertical dividers.
- **Tablet (768px):** likely still 3 columns or transitions early to 1 — to be safe, keep 3 columns down to `sm` (640px) and stack to 1 column below that, consistent with the source's `col-3 col-1-mob` naming (mobile-only stack).
- **Mobile (390px):** single column, horizontal divider between quotes, all font sizes reduce (title especially, matching the same scale as CareerHero's h1).
- **Breakpoint:** ~640px (sm).
