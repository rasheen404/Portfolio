import { coreStrengths, skillGroups, workingStyle } from '../data/content';
import { Chapter } from './ui/Chapter';
import { Icon } from './ui/Icon';
import './Skills.css';

/** A spec sheet: category in the rail, capabilities in the content column. */
export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <Chapter index="04" label="Capabilities" id="skills-title" title="A backend toolkit, centred on Java." />

        <div className="specs">
          <section className="spec spec--core rail-grid" aria-labelledby="spec-core" data-reveal>
            <h3 id="spec-core" className="spec__name">
              <span className="spec__icon spec__icon--core" aria-hidden="true"><Icon name="sparkle" size={16} /></span>
              Core strengths
            </h3>
            <ul className="core">
              {coreStrengths.map((s) => (
                <li key={s.name}>
                  <span className="core__name">{s.name}</span>
                  <span className="core__note">{s.note}</span>
                </li>
              ))}
            </ul>
          </section>

          {skillGroups.map((g) => (
            <section key={g.id} className="spec rail-grid" aria-labelledby={`spec-${g.id}`} data-reveal>
              <h3 id={`spec-${g.id}`} className="spec__name">
                <span className="spec__icon" aria-hidden="true"><Icon name={g.icon} size={16} /></span>
                {g.title}
              </h3>
              <ul className="spec__items">
                {g.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}

          <section className="spec rail-grid" aria-labelledby="spec-style" data-reveal>
            <h3 id="spec-style" className="spec__name">
              <span className="spec__icon" aria-hidden="true"><Icon name="check" size={16} /></span>
              How I work
            </h3>
            <ul className="spec__items spec__items--quiet">
              {workingStyle.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
