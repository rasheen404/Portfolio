import { useCallback, useState } from 'react';
import { profile, projects } from '../data/content';
import { CaseStudyDialog } from './CaseStudyDialog';
import { SystemDiagram } from './SystemDiagram';
import { Button } from './ui/Button';
import { Chapter } from './ui/Chapter';
import { Icon } from './ui/Icon';
import './Projects.css';

export function Projects() {
  const [openId, setOpenId] = useState(null);

  const open = useCallback((id) => setOpenId(id), []);
  const close = useCallback((lastId) => {
    setOpenId(null);
    // Return focus to the "Read case study" button of the last-viewed project
    requestAnimationFrame(() => document.querySelector(`[data-trigger="${lastId}"]`)?.focus({ preventScroll: true }));
  }, []);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <Chapter
          index="03"
          label="Selected work"
          id="projects-title"
          title="Case studies, drawn as systems."
          lead="Each project shown as its architecture — what it needed to solve, how the pieces connect, and what changed."
        />

        <div className="cases">
          {projects.map((p, i) => (
            <article key={p.id} className="case" data-reveal aria-labelledby={`case-${p.id}`}>
              <div className="case__media" data-spotlight onClick={() => open(p.id)} role="presentation">
                <SystemDiagram id={p.diagram} />
                <span className="case__caption mono" aria-hidden="true">Simplified architecture</span>
                <span className="case__hint" aria-hidden="true">
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </div>

              <div className="case__body">
                <div className="case__id">
                  <p className="case__meta mono">
                    <span className="case__num">{`3.${i + 1}`}</span>
                    <span>{p.period}</span>
                  </p>
                  <h3 id={`case-${p.id}`} className="case__title">{p.name}</h3>
                  <p className="case__category">{p.category}</p>
                  <ul className="tag-list" aria-label="Key technologies">
                    {p.stack.slice(0, 4).map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                </div>

                <div className="case__story">
                  <p className="case__summary">{p.summary}</p>
                  <p className="case__problem">
                    <span className="mono">Problem</span>
                    {p.problem}
                  </p>
                </div>

                <div className="case__result">
                  <ul className="case__highlights" aria-label="Highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={16} strokeWidth={2} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Button variant="glass" size="sm" onClick={() => open(p.id)} aria-haspopup="dialog" data-trigger={p.id}>
                    Read case study <Icon name="arrowRight" size={16} className="icon-nudge-x" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="projects__more" data-reveal>
          More experiments and learning projects live on{' '}
          <a className="link" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>

      <CaseStudyDialog
        project={projects.find((p) => p.id === openId) ?? null}
        onClose={close}
        onNavigate={setOpenId}
      />
    </section>
  );
}
