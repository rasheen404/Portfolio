import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

/**
 * Page-wide, delegated effects (one listener each, no per-element handlers):
 *  1. Scroll reveals for every [data-reveal] element.
 *  2. Pointer-following specular light on glass surfaces and primary buttons.
 */
export function usePageEffects() {
  // 1 — Reveal on scroll
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const nodes = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // 2 — Specular highlight that follows the pointer across glass
  useEffect(() => {
    if (!hasFinePointer()) return;
    let frame = 0;
    let evt = null;

    const apply = () => {
      frame = 0;
      const el = evt.target instanceof Element ? evt.target.closest('.glass, .btn--primary, [data-spotlight]') : null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${evt.clientX - r.left}px`);
      el.style.setProperty('--my', `${evt.clientY - r.top}px`);
    };

    const onMove = (e) => {
      evt = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
