import { useEffect, useRef } from 'react';
import { allowsRichMotion, createSpring2D, hasFinePointer } from '../lib/motion';
import './HeroStack.css';

/* The layers behind a seamless experience — each maps to documented work. */
const layers = [
  { id: 'interface', index: '01', name: 'Interface', meta: 'Web · Mobile' },
  { id: 'services', index: '02', name: 'Services', meta: 'Spring Boot · REST' },
  { id: 'data', index: '03', name: 'Data', meta: 'Oracle · Redis' },
];

function InterfaceArt() {
  return (
    <svg viewBox="0 0 100 100" className="slab__art" aria-hidden="true">
      <rect x="14" y="16" width="72" height="68" rx="9" className="sa-frame" />
      <circle cx="26" cy="28" r="4" className="sa-accent" />
      <rect x="34" y="25.5" width="26" height="5" rx="2.5" className="sa-line" />
      <rect x="22" y="42" width="56" height="6" rx="3" className="sa-line" />
      <rect x="22" y="53" width="40" height="6" rx="3" className="sa-line sa-line--soft" />
      <rect x="22" y="68" width="22" height="8" rx="4" className="sa-accent" />
    </svg>
  );
}
function ServicesArt() {
  return (
    <svg viewBox="0 0 100 100" className="slab__art" aria-hidden="true">
      <path d="M30 30 L70 30 L50 70 Z" className="sa-link" />
      {[[30, 30], [70, 30], [50, 70]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 9} y={y - 9} width="18" height="18" rx="5" className="sa-node" />
      ))}
    </svg>
  );
}
function DataArt() {
  return (
    <svg viewBox="0 0 100 100" className="slab__art" aria-hidden="true">
      {[30, 46, 62].map((y) => (
        <g key={y}>
          <ellipse cx="50" cy={y} rx="22" ry="7" className="sa-disk" />
        </g>
      ))}
      <path d="M28 30 V62 M72 30 V62" className="sa-link" />
    </svg>
  );
}
const arts = { interface: InterfaceArt, services: ServicesArt, data: DataArt };

/**
 * Signature hero visual: an exploded, refractive glass stack — the systems that sit
 * behind an interface. Tilts toward the pointer, separates as the page scrolls.
 * Transform-only motion; static on reduced motion or constrained devices.
 */
export function HeroStack() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !allowsRichMotion()) {
      stage?.classList.add('is-static');
      return;
    }

    const spring = createSpring2D((x, y) => {
      stage.style.setProperty('--px', x.toFixed(4));
      stage.style.setProperty('--py', y.toFixed(4));
    });
    const onPointer = (e) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      spring.set(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => spring.set(0, 0);

    // Exploded view: layers separate over the first ~60% of the hero's scroll
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const t = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
        stage.style.setProperty('--explode', t.toFixed(3));
      });
    };

    const io = new IntersectionObserver(([e]) => stage.classList.toggle('is-paused', !e.isIntersecting));
    io.observe(stage);

    if (hasFinePointer()) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      spring.stop();
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={stageRef} className="stack-stage" aria-hidden="true">
      <div className="stack-float">
        <div className="stack-plane">
          <div className="stack-shadow" />
          {[...layers].reverse().map((l, i) => {
            const Art = arts[l.id];
            return (
              <div key={l.id} className={`slab slab--${l.id}`} style={{ '--z': i }}>
                <div className="slab__edge" />
                <div className="slab__edge slab__edge--2" />
                <div className="slab__face">
                  <Art />
                  <span className="slab__port" />
                  <span className="slab__sheen" />
                </div>
              </div>
            );
          })}
          <div className="stack-beam" />
        </div>
      </div>

      <ol className="stack-callouts">
        {layers.map((l, i) => (
          <li key={l.id} className="stack-callout" style={{ '--i': i }}>
            <span className="stack-callout__index">{l.index}</span>
            <span className="stack-callout__name">{l.name}</span>
            <span className="stack-callout__meta">{l.meta}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
