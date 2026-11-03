import './Hero.css';
import { Fragment } from 'react';
import { hero, profile, RESUME_URL } from '../data/content';
import { HeroStack } from './HeroStack';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

/** Splits a phrase into masked words for the entrance animation. */
function Words({ text, start = 0, className = '' }) {
  return text.split(' ').map((word, i, all) => (
    <Fragment key={`${word}-${i}`}>
      <span className="word">
        <span className={className} style={{ '--d': start + i }}>{word}</span>
      </span>
      {i < all.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

export function Hero() {
  const { plain, accent } = hero.headline;
  const plainCount = plain.split(' ').length;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker enter" style={{ '--d': 0 }}>
            <span className="hero__status" aria-hidden="true" />
            <span className="hero__name">{profile.name}</span>
            <span className="hero__role">{profile.role}</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            <Words text={plain} start={1} />{' '}
            <Words text={accent} start={1 + plainCount} className="text-gradient" />
          </h1>

          <p className="hero__lead lead enter" style={{ '--d': 7 }}>{hero.lead}</p>

          <div className="hero__actions enter" style={{ '--d': 8 }}>
            <Button href="#projects" magnetic>
              Explore my work <Icon name="arrowRight" size={18} className="icon-nudge-x" />
            </Button>
            <Button href="#contact" variant="glass" magnetic>
              Get in touch
            </Button>
            <Button href={RESUME_URL} variant="ghost" download="Mohammed_Rasheen_K_Resume.pdf">
              <Icon name="download" size={18} className="icon-nudge-y" /> Résumé <span className="sr-only">(PDF)</span>
            </Button>
          </div>
        </div>

        <div className="hero__visual enter enter--visual" style={{ '--d': 3 }}>
          <HeroStack />
        </div>
      </div>

      <div className="container">
        <dl className="hero__meta enter" style={{ '--d': 9 }}>
          {hero.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>
                {m.status && <span className="hero__live" aria-hidden="true" />}
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
