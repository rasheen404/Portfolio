const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)');

/** True on devices with a precise hovering pointer (mouse / trackpad). */
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)');

/**
 * Decorative, continuously-running effects are skipped on constrained devices:
 * reduced motion, data saver, or low core / memory counts.
 */
export const allowsRichMotion = () => {
  if (typeof navigator === 'undefined' || prefersReducedMotion()) return false;
  const conn = navigator.connection;
  if (conn && conn.saveData) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return false;
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return false;
  return true;
};

/**
 * Tiny critically-damped spring integrator. Calls `onUpdate(x, y)` each frame
 * until settled, so nothing runs while idle.
 */
export function createSpring2D(onUpdate, { stiffness = 140, damping = 18 } = {}) {
  let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0;
  let raf = 0, last = 0;

  const step = (now) => {
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    vx += ((tx - x) * stiffness - vx * damping) * dt;
    vy += ((ty - y) * stiffness - vy * damping) * dt;
    x += vx * dt;
    y += vy * dt;
    onUpdate(x, y);
    const settled = Math.abs(tx - x) < 0.0005 && Math.abs(ty - y) < 0.0005 && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001;
    raf = settled ? 0 : requestAnimationFrame(step);
  };

  return {
    set(nx, ny) {
      tx = nx;
      ty = ny;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
