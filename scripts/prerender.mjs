/**
 * Build step 3 of 3 (see "build" in package.json):
 *   1. vite build                     → dist/          (client bundle + index.html)
 *   2. vite build --ssr …             → dist-ssr/      (server render function)
 *   3. node scripts/prerender.mjs     → injects the rendered page, JSON-LD and sitemap
 *
 * Result: dist/index.html contains the whole portfolio as real HTML, so search engines and
 * link previews see every heading, paragraph and link without running JavaScript.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const content = await import(pathToFileURL(path.join(root, 'src/data/content.js')).href);
const { SITE_URL, RESUME_URL, profile, projects, education, coreStrengths, skillGroups } = content;

const today = new Date().toISOString().slice(0, 10);
const abs = (p) => new URL(p, SITE_URL).href;

// ---- 1. Prerendered markup ---------------------------------------------------
const indexPath = path.join(dist, 'index.html');
let html = await fs.readFile(indexPath, 'utf8');
const appHtml = render();
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// ---- 2. Structured data (schema.org), generated from the same content -----------
const personId = `${SITE_URL}#person`;
const university = education.find((e) => e.kind === 'Education');
const certification = education.find((e) => e.kind === 'Certification');
const knowsAbout = [...new Set([...coreStrengths.map((s) => s.name), ...skillGroups.flatMap((g) => g.items)])];

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: `${profile.name} — Portfolio`,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}#profile`,
      url: SITE_URL,
      name: `${profile.name} — ${profile.role}`,
      isPartOf: { '@id': `${SITE_URL}#website` },
      mainEntity: { '@id': personId },
      dateModified: today,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      alternateName: profile.shortName,
      jobTitle: profile.role,
      description: profile.summary,
      url: SITE_URL,
      image: abs('/og-image.png'),
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Kozhikode', addressRegion: 'Kerala', addressCountry: 'IN' },
      worksFor: { '@type': 'Organization', name: profile.currentRole.company },
      hasOccupation: {
        '@type': 'Occupation',
        name: profile.currentRole.title,
        occupationLocation: { '@type': 'City', name: 'Kozhikode' },
        skills: knowsAbout.slice(0, 20).join(', '),
      },
      alumniOf: { '@type': 'CollegeOrUniversity', name: university.org.replace(/, Kerala$/, ''), address: 'Kerala, India' },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: university.title,
          credentialCategory: 'degree',
          recognizedBy: { '@type': 'CollegeOrUniversity', name: university.org.replace(/, Kerala$/, '') },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: certification.title,
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: certification.org },
        },
      ],
      knowsAbout,
      sameAs: [profile.linkedin, profile.github],
      subjectOf: { '@type': 'DigitalDocument', name: `${profile.name} — Résumé`, encodingFormat: 'application/pdf', url: abs(RESUME_URL) },
    },
    {
      '@type': 'ItemList',
      name: 'Selected projects',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: p.summary,
          keywords: p.stack.join(', '),
          creator: { '@id': personId },
          url: `${SITE_URL}#projects`,
        },
      })),
    },
  ],
};
// Escape "<" so no string in the data can close the <script> element.
const jsonLd = JSON.stringify(graph).replace(/</g, '\\u003c');
html = html.replace('</head>', `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`);

await fs.writeFile(indexPath, html);

// ---- 3. Sitemap with a real last-modified date --------------------------------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} kB of HTML, JSON-LD and sitemap (${today}) written`);
