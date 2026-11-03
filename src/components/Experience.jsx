import { education, experience } from '../data/content';
import { Chapter } from './ui/Chapter';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <Chapter index="02" label="Experience" id="experience-title" title="Where I’ve been building." />

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.id} className={`timeline__item rail-grid ${job.current ? 'is-current' : ''}`} data-reveal>
              <div className="timeline__aside">
                <time className="timeline__period mono" dateTime={job.start}>{job.period}</time>
                {(job.location || job.type) && <span className="timeline__where">{job.location || job.type}</span>}
              </div>

              <article className="timeline__body">
                <span className="timeline__node" aria-hidden="true" />
                <header className="timeline__head">
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__company">
                    {job.company}
                    {job.current && <span className="badge">Current</span>}
                  </p>
                  <p className="timeline__scope">{job.scope}</p>
                </header>

                {job.impact.length > 0 && (
                  <ul className="impact" aria-label="Impact">
                    {job.impact.map((m) => (
                      <li key={m.label}>
                        <span className="impact__value">{m.value}</span>
                        <span className="impact__label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="timeline__points">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>

                <ul className="tag-list" aria-label={`Technologies used at ${job.company}`}>
                  {job.stack.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        <div className="credentials rail-grid" data-reveal>
          <h3 className="credentials__title mono">Education &amp; certification</h3>
          <ul className="rail-main">
            {education.map((e) => (
              <li key={e.title}>
                <span className="credentials__name">{e.title}</span>
                <span className="credentials__org">{e.org}</span>
                <span className="credentials__period mono">{e.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
