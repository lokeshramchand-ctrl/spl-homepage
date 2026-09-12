# Page Topology — Qurtuba Project Case Study

Source: https://phenomenonstudio.com/projects/qurtuba-online-school-platform
Site-key: `phenomenonstudio-com-7df14782` | Page-key: `projects-qurtuba-online-school-platform-2b91b2e4`
Route: `/projects/qurtuba-online-school-platform`

Fonts/colors/Button/Reveal utilities are 100% shared with the homepage clone — no foundation changes needed.
`--color-ink:#080d10`, `--color-orange:#ff7a00`, font `Bricolage Grotesque` (headings) already configured.

## Sections, top to bottom

1. **Header** — shared, reuse `root-8a5edab2/Header.tsx` verbatim (identical nav site-wide).
2. **ProjectHero** — breadcrumb (Home / Projects / Qurtuba – online school platform), tags (Education, Web app), H1 "Qurtuba – online school platform", orange "VIEW WEBSITE" button (external link, diagonal arrow icon, target=_blank to https://qurtuba... — actual href is the tag `a.btn.btn--view`, use `https://www.qurtubaonline.com/` style placeholder — see spec), large rounded hero image, 3 stat/result cards.
3. **HeroGallery** — 2-up image gallery (two device screenshots side by side, dark diagonal-striped background).
4. **ComparisonSlider** — draggable before/after image slider (client-only interaction).
5. **ProblemsSolutions** — "Project" caption / "Problems & solutions" title, 4 rows of Problem (white bg) + Solution (gray bg) card pairs.
6. **ProcessPhase (Research)** — caption "Research", title "From complexity to clarity", 2 intro paragraphs, 5 stages (Documentation analysis, Competitor analysis, UX audit, Consult (BA), Informational architecture) with images interleaved irregularly (see BEHAVIORS.md image map).
7. **ProcessPhase (Design)** — caption "Design", title "Transforming analysis into...", intro paragraphs, 4 stages (Wireframes, Design direction, Product UI design, Design system).
8. **FeaturesScroll** — scroll-driven sticky showcase, 7 features (Lesson builder, Assessments, Interactive tasks, Calendar, Fees module, Enrolment module, Messenger), each with problem paragraph + "What we've done" bullets + crossfading image.
9. **ProcessPhase (Development)** — caption "Development", title "Seamless frontend–backend...", intro paragraphs, 3 stages (APIs & back-end analysis, Front-end development, Back-end development) plus a tech-stack rundown (React/Vite/MUI/Redux/etc for frontend, NestJS/TypeORM/etc for backend).
10. **Conclusion** — "Conclusion / Results" heading, reuses the same 3 stat cards from the hero, summary paragraph, "Key improvements include" bullet list, View Website button.
11. **FutureChanges** — "Future changes / What happened next?" — 2-col text grid: "Adapting to new needs" / "Adapting for inclusive users".
12. **MoreCases** — "Our cases / More cases" — 3 simple case cards (Milk & Honey / Lucas Keller, Veridian, MedAxis Group), each: image, tags, title, client badge + country flag, Results list, Explore button.
13. **Footer** — shared, reuse `root-8a5edab2/Footer.tsx` verbatim (includes the "Let's collaborate" dark CTA — this IS the CTA, not a separate section).

## Reused components (no rebuild needed)
- `Header`, `Footer` — import directly from `../root-8a5edab2/Header` and `../root-8a5edab2/Footer`.
- `Button`, `ArrowRightIcon`, `RevealWords`, `ScrambleText`, `FadeUp` — from `../shared/button` and `../shared/reveal`.

## New components to build
`src/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/`:
- `ProjectHero.tsx`
- `HeroGallery.tsx`
- `ComparisonSlider.tsx`
- `ProblemsSolutions.tsx`
- `ProcessPhase.tsx` (generic, reused 3x with different props/data)
- `FeaturesScroll.tsx`
- `Conclusion.tsx`
- `FutureChanges.tsx`
- `MoreCases.tsx`
- `StatCard.tsx` (small shared piece used by both ProjectHero and Conclusion — 3 identical result cards)

## Assets
Downloaded to `public/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images/` (43 files — see download script `scripts/download-assets-phenomenonstudio-com-7df14782-projects-qurtuba-online-school-platform-2b91b2e4.mjs` for the full filename map).
