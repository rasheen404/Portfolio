import { about, RESUME_URL } from '../data/content';
import { Icon } from './ui/Icon';
import './About.css';

export function About() {
  const [intro, ...rest] = about.paragraphs;

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container rail-grid about__grid">
        <p className="chapter__index mono" data-reveal>
          <span>01</span>
          <span>Profile</span>
        </p>

        <div className="rail-main">
          <h2 id="about-title" className="about__statement" data-reveal>{about.heading}</h2>
          <p className="about__intro" data-reveal>{intro}</p>
          <div className="about__cols">
            {rest.map((p, i) => (
              <p key={i} data-reveal style={{ '--reveal-delay': i * 90 }}>{p}</p>
            ))}
          </div>
        </div>

        <h3 className="about__glance-label mono" data-reveal>At a glance</h3>
        <div className="rail-main" data-reveal>
          <dl className="glance">
            {about.glance.map((g) => (
              <div key={g.label} className="glance__row">
                <dt>{g.label}</dt>
                <dd>
                  {g.status && <span className="glance__dot" aria-hidden="true" />}
                  {g.value}
                </dd>
              </div>
            ))}
            <div className="glance__row">
              <dt>Résumé</dt>
              <dd>
                <a className="link glance__link" href={RESUME_URL} download="Mohammed_Rasheen_K_Resume.pdf">
                  Download PDF <Icon name="download" size={16} />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
