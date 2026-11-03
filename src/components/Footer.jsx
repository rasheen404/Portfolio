import { profile } from '../data/content';
import { Icon } from './ui/Icon';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Profiles" className="footer__links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
        <a href="#home" className="footer__top">
          Back to top <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}
