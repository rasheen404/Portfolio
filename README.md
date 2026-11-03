# Mohammed Rasheen K — Portfolio

Personal portfolio for a Java backend developer. React 19 + Vite, deployed on Netlify.
Design language: Liquid Glass–inspired materials on a midnight-navy / pearl-white palette, dark by default.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint
```

## Editing content

All copy lives in **`src/data/content.js`** — profile, experience, projects (case studies), skills.
Architecture diagrams for each case study live in **`src/data/diagrams.js`** (nodes as `[x, y, w, h]`
with a `wide` and a `tall` small-screen layout; the viewBox crops to content automatically).
Every fact is sourced from the résumé; keep it verifiable. Replace the résumé at
`public/resume/Mohammed_Rasheen_K_Resume.pdf` (keep the filename, or update `RESUME_URL`).

## Structure

```
src/
  data/content.js        single source of truth for content
  styles/tokens.css      design tokens (type, spacing, radius, motion, both themes)
  styles/glass.css       Liquid Glass material + button system
  styles/base.css        reset extensions, type primitives, reveal-on-scroll
  components/            one component per section, each with co-located CSS
  components/SystemDiagram.jsx   data-driven SVG architecture diagrams
  components/CommandPalette.jsx  ⌘K / Ctrl+K palette: quick answers, jump-to, actions
  components/ui/         Button (primary / glass / ghost, optional magnetic), Chapter, Icon
  hooks/                 theme, active section, magnetic pull, page-wide effects
  lib/                   motion helpers (spring, capability checks), assistant rules
```

### Design system notes

- **One editorial grid.** Every section aligns to `.rail-grid` — a 3/12 label rail (mono chapter
  index such as `02 Experience`) and a 9/12 content column. Only the hero, the About statement and the
  contact close use display-size type; other sections use the smaller chapter title.
- **Type:** Inter for reading, JetBrains Mono for technical metadata (dates, indices, tags, diagram labels).
- **Glass is reserved** for navigation, controls and temporary overlays (`.glass`). Content sits on
  restrained `.surface` panels. Never nest glass in glass.
- Glass anatomy: tint + sheen background, gradient luminous rim (`::before`), pointer-following
  specular (`::after`, driven by `--mx/--my`), inner highlight and chromatic edge fringe.
- Falls back to solid surfaces under `prefers-reduced-transparency` or without `backdrop-filter`.
- Decorative motion is skipped under `prefers-reduced-motion`, data saver, or low-power devices.
- The hero orb is pure CSS (no WebGL); its inner grid shifts opposite the pointer to read as refraction.

## Deployment (Netlify)

`netlify.toml` configures the build (`npm run build` → `dist`), immutable caching for hashed assets and
security headers. The contact form uses **Netlify Forms** — make sure *Form detection* is enabled under
Site configuration → Forms. If a submission fails, the form offers a pre-filled `mailto:` fallback.

Analytics (GA4) queues events immediately but loads its library on the first interaction (or 6s after
load) to keep it off the critical rendering path.
