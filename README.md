# MasterFabric Academy — Agentic AI Developer

Bilingual (EN/TR), markdown-driven, A4-format academic curriculum site for the **Agentic AI Developer Training** program.

## Stack

- **Next.js 16** (App Router, React Server Components, TypeScript)
- **Tailwind CSS v4** — strict black & white design system
- **react-markdown + remark-gfm** — curriculum rendering
- **Mermaid** — monochrome flow / sequence / state diagrams from fenced code blocks
- **Framer Motion** — scroll-driven "prism" evolution section and animated metrics

## Architecture

```
content/
  en/*.md          # English curriculum (single source of truth)
  tr/*.md          # Turkish curriculum
src/
  app/
    layout.tsx     # Fonts (Geist, Geist Mono, Lora) + globals
    page.tsx       # Redirects / -> /en
    [locale]/
      layout.tsx   # Locale validation, header, footer
      page.tsx     # Landing: hero, evolution, metrics, curriculum index
      guide/
        page.tsx   # A4 study guide, one sheet per markdown doc
  components/
    a4/            # A4Sheet, PrintButton (print-ready CSS)
    brand/         # MasterFabric logo (currentColor, monochrome)
    charts/        # WeightBars — domain weights from frontmatter
    evolution/     # PrismScene + EvolutionSection (Pink Floyd transition)
    layout/        # SiteHeader, SiteFooter, LocaleSwitcher
    markdown/      # MarkdownArticle + MermaidDiagram
  dictionaries/    # en.json / tr.json UI strings
  lib/
    content.ts     # Reads markdown from disk per request (never static)
    i18n.ts        # Locale + dictionary loading
```

## Content model

Every page that renders curriculum data declares `export const dynamic = "force-dynamic"`,
and `lib/content.ts` reads the markdown files from disk on **every request** — there is no
static generation. Edit any file under `content/` and refresh: the site updates immediately,
in dev and in production.

Frontmatter fields per document:

| Field            | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `order`          | Sort order of the A4 sheet                       |
| `title`          | Document / domain title                          |
| `section`        | Section header shown on the A4 sheet             |
| `weight`         | Exam weight (%) — feeds the analytics bar chart  |
| `badge`          | Optional badge (e.g. `NEW MODULE`)               |
| `infrastructure` | "Infrastructure built in this module" callout    |

Fenced ` ```mermaid ` blocks inside the markdown body render as live, monochrome-themed
diagrams.

## Development

```bash
npm install
npm run dev
```

Routes: `/en`, `/tr`, `/en/guide`, `/tr/guide`. The guide is print-ready: the
"PDF / Print Format" button maps each on-screen A4 sheet onto a physical A4 page
with an inverted (black-on-white) palette.
