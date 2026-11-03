import './Nav.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navItems, profile, RESUME_URL } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { prefersReducedMotion } from '../lib/motion';
import { isMac, openPalette } from '../lib/palette';
import { Icon } from './ui/Icon';

const ids = navItems.map((n) => n.id);

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="dock-btn theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
      title={isDark ? 'Light appearance' : 'Dark appearance'}
    >
      <span className={`theme-toggle__icon ${isDark ? 'is-on' : ''}`}><Icon name="moon" size={18} /></span>
      <span className={`theme-toggle__icon ${!isDark ? 'is-on' : ''}`}><Icon name="sun" size={18} /></span>
    </button>
  );
}

/**
 * Liquid lens: stretches across the gap between the old and new link, then settles —
 * the way a drop of liquid moves, rather than a rigid slide.
 */
function useLiquidLens(lensRef, linkRefs, target) {
  const prev = useRef(null);

  useLayoutEffect(() => {
    const place = (animate) => {
      const lens = lensRef.current;
      const el = linkRefs.current[target];
      if (!lens || !el || !el.offsetWidth) return;
      const next = { x: el.offsetLeft, w: el.offsetWidth };
      const from = prev.current;
      lens.style.transform = `translateX(${next.x}px)`;
      lens.style.width = `${next.w}px`;
      lens.style.opacity = '1';

      if (animate && from && (from.x !== next.x || from.w !== next.w) && !prefersReducedMotion()) {
        const left = Math.min(from.x, next.x);
        const right = Math.max(from.x + from.w, next.x + next.w);
        // Per-keyframe easing: ease into the stretch, spring out of it
        lens.animate(
          [
            { transform: `translateX(${from.x}px) scaleY(1)`, width: `${from.w}px`, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
            { transform: `translateX(${left + (right - left) * 0.06}px) scaleY(0.84)`, width: `${(right - left) * 0.88}px`, offset: 0.4, easing: 'cubic-bezier(0.3, 1.3, 0.5, 1)' },
            { transform: `translateX(${next.x}px) scaleY(1)`, width: `${next.w}px` },
          ],
          { duration: 620 }
        );
      }
      prev.current = next;
    };

    place(true);
    const onResize = () => place(false);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [lensRef, linkRefs, target]);
}

export function Nav() {
  const active = useActiveSection(ids);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const wrapRef = useRef(null);
  const lensRef = useRef(null);
  const linkRefs = useRef({});
  const menuBtnRef = useRef(null);

  useLiquidLens(lensRef, linkRefs, hovered ?? active);

  // Tighten the dock once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile sheet: close on Escape, outside press, or widening past the breakpoint
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 900px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const wrapClass = ['dock', scrolled && 'is-scrolled', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <header ref={wrapRef} className={wrapClass}>
      <div className="dock__row">
        {/* Identity capsule */}
        <a href="#home" className="dock__capsule dock__brand glass" onClick={() => setOpen(false)}>
          <span className="dock__status" aria-hidden="true" />
          <span className="dock__name dock__name--full">{profile.name}</span>
          <span className="dock__name dock__name--short">{profile.shortName}</span>
          <span className="sr-only">, back to top</span>
        </a>

        {/* Section capsule */}
        <nav className="dock__capsule dock__nav glass" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          <span ref={lensRef} className="dock__lens" aria-hidden="true" />
          <ul className="dock__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  className={`dock__link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tools capsule */}
        <div className="dock__capsule dock__tools glass">
          <button
            type="button"
            className="dock-btn"
            onClick={() => {
              setOpen(false);
              openPalette();
            }}
            aria-label="Search and quick answers"
            aria-keyshortcuts={isMac() ? 'Meta+K' : 'Control+K'}
            title={`Search  ${isMac() ? '⌘K' : 'Ctrl K'}`}
          >
            <Icon name="search" size={18} />
          </button>
          <ThemeToggle />
          <a href="#contact" className="dock__cta" onClick={() => setOpen(false)}>
            Let’s talk
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            className="dock-btn dock__menu-btn"
            aria-expanded={open}
            aria-controls="dock-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="dock__burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet — its own glass panel, grown from the tools capsule */}
      <div id="dock-sheet" className="dock__sheet glass glass--strong" inert={!open}>
        <nav aria-label="Primary (mobile)">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  className={`dock__sheet-link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="dock__sheet-index mono">{String(i).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="dock__sheet-actions">
          <a className="btn btn--primary btn--sm" href="#contact" onClick={() => setOpen(false)}>
            Let’s talk <Icon name="arrowRight" size={16} />
          </a>
          <a className="btn btn--ghost btn--sm" href={RESUME_URL} download="Mohammed_Rasheen_K_Resume.pdf">
            <Icon name="download" size={16} /> Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
