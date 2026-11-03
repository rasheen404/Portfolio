import { coreStrengths, education, experience, profile, projects, skillGroups } from '../data/content';

/**
 * Rule-based answers composed only from the portfolio content.
 * This is not an AI model — it matches keywords and is labelled as such in the UI.
 */

const current = experience.find((e) => e.current);
const list = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0]);

export const intents = [
  {
    id: 'summary',
    prompt: 'Give me the 30-second summary',
    keywords: ['summary', 'summarize', 'summarise', 'tl;dr', 'tldr', 'who', 'about', 'introduce', 'rasheen', 'overview'],
    weight: 0.5, // generic words — any specific topic should win a tie
    answer: () => profile.summary,
  },
  {
    id: 'stack',
    prompt: 'What is his core stack?',
    keywords: ['stack', 'skill', 'tech', 'technolog', 'language', 'framework', 'java', 'spring', 'tool', 'database'],
    answer: () => {
      const backend = skillGroups.find((g) => g.id === 'backend').items.slice(0, 6);
      const data = skillGroups.find((g) => g.id === 'data').items;
      const devops = skillGroups.find((g) => g.id === 'cloud').items;
      return `Core strengths: ${list(coreStrengths.map((s) => s.name))}. Backend work spans ${list(backend)}, with ${list(data)} on the data side and ${list(devops)} for delivery.`;
    },
  },
  {
    id: 'role',
    prompt: 'Where does he work now?',
    keywords: ['work', 'job', 'role', 'current', 'company', 'employ', 'experience', 'career', 'lenok', 'years'],
    answer: () =>
      `${profile.shortName} has been a ${current.role} at ${current.company} since ${profile.currentRole.since}, building web, API and mobile backends for the airline and airport domain. Before that: ${experience[1].role} at ${experience[1].company} (${experience[1].period.replace('—', 'to')}).`,
  },
  {
    id: 'projects',
    prompt: 'Which projects should I look at?',
    keywords: ['project', 'built', 'build', 'portfolio', 'case', 'airport', 'auth', 'tunehub', 'oauth'],
    answer: () =>
      projects.map((p) => `${p.name} — ${p.summary.charAt(0).toLowerCase()}${p.summary.slice(1)}`).join(' '),
  },
  {
    id: 'education',
    prompt: 'What is his education?',
    keywords: ['education', 'degree', 'study', 'college', 'university', 'btech', 'b.tech', 'certif', 'kodnest'],
    answer: () => education.map((e) => `${e.title}, ${e.org} (${e.period}).`).join(' '),
  },
  {
    id: 'contact',
    prompt: 'How can I reach him?',
    keywords: ['contact', 'email', 'reach', 'hire', 'available', 'linkedin', 'github', 'resume', 'cv', 'phone'],
    answer: () =>
      `Email ${profile.email} — that’s the fastest route. He’s also on LinkedIn and GitHub (@rasheen404), and the résumé PDF is downloadable from the Contact section.`,
  },
];

export function answer(query) {
  const q = query.toLowerCase();
  const scored = intents
    .map((intent) => ({
      intent,
      score: intent.keywords.reduce((n, k) => n + (q.includes(k) ? 1 : 0), 0) * (intent.weight ?? 1),
    }))
    .sort((a, b) => b.score - a.score);
  if (scored[0].score > 0) return scored[0].intent.answer();
  return 'I can only answer from what’s on this page — try asking about his stack, current role, projects, education or how to get in touch.';
}
