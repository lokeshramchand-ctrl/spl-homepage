# SPL Homepage

Next.js site built by reverse-engineering [phenomenonstudio.com](https://phenomenonstudio.com) page-by-page, then adapting it into a clean, maintained codebase.

## Tech Stack
- Next.js 16 (App Router, React 19, TypeScript strict)
- shadcn/ui (Radix primitives) + Tailwind CSS v4
- Lucide React icons

## Commands
```bash
npm run dev        # start dev server
npm run build       # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run check         # lint + typecheck + build
```

## Project Structure
```
src/
  app/                    # routes
  components/
    sites/<source>/       # components extracted per source page, grouped by origin
    ui/                    # shadcn/ui primitives
  lib/utils.ts             # cn() utility
public/
  sites/<source>/          # downloaded images/icons/videos per source page
docs/research/              # inspection notes per cloned page (see INSPECTION_GUIDE.md)
scripts/                    # asset download scripts, one per cloned page
```

See `AGENTS.md` for coding conventions and the cloning workflow.
