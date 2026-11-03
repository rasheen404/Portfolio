# Mohammed Rasheen K — Portfolio

Personal portfolio for a Java backend developer. React 19 + Vite, deployed on Netlify.
Design language: Liquid Glass–inspired materials on a midnight-navy / pearl-white palette, dark by default.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/ (client build + prerender, see below)
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
- **Navigation dock:** three glass capsules (identity · sections · tools + CTA). The active-section lens
  is animated with the Web Animations API so it stretches between links like a liquid drop.
- **Hero stack** (`HeroStack.jsx`): an exploded, isometric glass stack — Interface → Services → Data —
  in pure CSS 3D (no WebGL). It tilts toward the pointer and separates on scroll. Callout positions are
  projected from the same rotations as the plane; see the comment in `HeroStack.css` if you change them.

## SEO

`npm run build` runs three steps: the client build, an SSR build of `src/entry-server.jsx`, and
`scripts/prerender.mjs`, which renders the whole page into `dist/index.html` (the browser then
hydrates it). Crawlers and link previews receive every heading, paragraph and link as plain HTML.

The prerender script also generates, from `src/data/content.js`:
- **JSON-LD** — `WebSite`, `ProfilePage`, `Person` (role, employer, education, credentials, skills,
  profiles, résumé) and an `ItemList` of projects, so structured data can never drift from the page;
- **`sitemap.xml`** with the build date as `lastmod`.

Static head tags (title, description, canonical, robots, Open Graph / Twitter, `rel="me"`) live in
`index.html`. After deploying, submit `https://rasheen.netlify.app/sitemap.xml` in Google Search Console.

Rendering rule: components must not read `window`/`document` during render — only in effects or
event handlers — or the prerendered HTML will not match the first client render.

## Deployment (Netlify)

`netlify.toml` configures the build (`npm run build` → `dist`), immutable caching for hashed assets and
security headers. The contact form uses **Netlify Forms** — make sure *Form detection* is enabled under
Site configuration → Forms. If a submission fails, the form offers a pre-filled `mailto:` fallback.

Analytics (GA4) queues events immediately but loads its library on the first interaction (or 6s after
load) to keep it off the critical rendering path.
