import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

/**
 * Subtle magnetic pull toward the pointer. Writes --mag-x / --mag-y, which the
 * .btn styles translate with a spring-eased release.
 */
export function useMagnetic(ref, enabled = true, strength = 0.22, max = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !hasFinePointer() || prefersReducedMotion()) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const clamp = (v) => Math.max(-max, Math.min(max, v * strength));
      el.classList.add('is-magnetized');
      el.style.setProperty('--mag-x', `${clamp(dx)}px`);
      el.style.setProperty('--mag-y', `${clamp(dy)}px`);
    };
    const onLeave = () => {
      el.classList.remove('is-magnetized');
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled, strength, max]);
}
