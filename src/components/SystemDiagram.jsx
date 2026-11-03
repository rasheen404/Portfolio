import { useId } from 'react';
import { diagrams } from '../data/diagrams';

const CHIP_CHAR = 6.7; // mono glyph advance at 11px
const LABEL_CHAR = 6.5; // mono glyph advance at 10.5px

const center = ([x, y, w, h]) => [x + w / 2, y + h / 2];

/** Anchor on the facing sides of two boxes and a smooth cubic between them. */
function route(a, b) {
  const [ax, ay] = center(a);
  const [bx, by] = center(b);
  const horizontal = Math.abs(bx - ax) > Math.abs(by - ay);
  if (horizontal) {
    const dir = Math.sign(bx - ax);
    const x0 = dir > 0 ? a[0] + a[2] : a[0];
    const x1 = dir > 0 ? b[0] : b[0] + b[2];
    const mx = (x0 + x1) / 2;
    return { d: `M${x0} ${ay} C${mx} ${ay} ${mx} ${by} ${x1} ${by}`, mid: [mx, (ay + by) / 2] };
  }
  const dir = Math.sign(by - ay);
  const y0 = dir > 0 ? a[1] + a[3] : a[1];
  const y1 = dir > 0 ? b[1] : b[1] + b[3];
  const my = (y0 + y1) / 2;
  return { d: `M${ax} ${y0} C${ax} ${my} ${bx} ${my} ${bx} ${y1}`, mid: [(ax + bx) / 2, my] };
}

/** Lays chips left-to-right, wrapping inside the node. */
function layoutChips(chips, [x, y, w, h], fs) {
  const pad = 16, gap = 6, ch = 24 * fs;
  const rows = [[]];
  let cx = 0;
  chips.forEach((c) => {
    const cw = c.length * CHIP_CHAR * fs + 20;
    if (cx + cw > w - pad * 2 && rows.at(-1).length) {
      rows.push([]);
      cx = 0;
    }
    rows.at(-1).push({ text: c, x: cx, w: cw });
    cx += cw + gap;
  });
  const top = y + h - pad - rows.length * ch - (rows.length - 1) * gap;
  return rows.flatMap((row, r) => row.map((c) => ({ ...c, x: x + pad + c.x, y: top + r * (ch + gap), h: ch })));
}

/** Crops the canvas to the content so tiles never carry dead space. */
function bounds(spec, layout, pad = 12) {
  const rects = [...Object.values(spec.nodes), ...spec.groups].map((n) => n[layout]);
  const x0 = Math.min(...rects.map((r) => r[0]));
  const y0 = Math.min(...rects.map((r) => r[1]));
  const x1 = Math.max(...rects.map((r) => r[0] + r[2]));
  const y1 = Math.max(...rects.map((r) => r[1] + r[3]));
  return [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2];
}
const ratio = (spec, layout) => {
  const [, , w, h] = bounds(spec, layout);
  return (w / h).toFixed(4);
};

// The tall (small-screen) layout renders smaller on the page, so its type is scaled up.
const TYPE_SCALE = { wide: 1, tall: 1.15 };

function Canvas({ spec, layout, uid }) {
  const marker = `${uid}-${layout}-arrow`;
  const fs = TYPE_SCALE[layout];
  const size = (px) => ({ fontSize: `${px * fs}px` });
  const box = (id) => spec.nodes[id][layout];

  return (
    <svg className={`diagram diagram--${layout}`} viewBox={bounds(spec, layout).join(' ')} role="img" aria-label={spec.description}>
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 9 5 1 9" className="dg-arrow" />
        </marker>
      </defs>

      {spec.groups.map((g) => {
        const [x, y, w, h] = g[layout];
        return (
          <g key={g.label} className="dg-group">
            <rect x={x} y={y} width={w} height={h} rx="22" />
            <text x={x + 18} y={y + 24} className="dg-mono" style={size(11)}>{g.label}</text>
          </g>
        );
      })}

      {spec.edges.map((e, i) => {
        const { d } = route(box(e.from), box(e.to));
        return (
          <g key={i} className={`dg-edge ${e.dashed ? 'is-dashed' : ''}`}>
            <path d={d} className="dg-line" markerEnd={`url(#${marker})`} />
            {!e.dashed && <path d={d} className="dg-flow" style={{ animationDelay: `${i * -0.35}s` }} />}
          </g>
        );
      })}

      {Object.entries(spec.nodes).map(([id, n]) => {
        const [x, y, w, h] = n[layout];
        const label = (layout === 'tall' && n.labelTall) || n.label;
        const sub = (layout === 'tall' && n.subTall) || n.sub;
        return (
          <g key={id} className={`dg-node dg-node--${n.kind}`}>
            <rect x={x} y={y} width={w} height={h} rx="14" className="dg-box" />
            {w >= 150 && <circle cx={x + w - 18} cy={y + 20} r="4" className="dg-kind" />}
            <text x={x + 16} y={y + 28 * fs} className="dg-label" style={size(15)}>{label}</text>
            <text x={x + 16} y={y + 48 * fs} className="dg-mono dg-sub" style={size(11)}>{sub}</text>
            {n.chips &&
              layoutChips(n.chips, n[layout], fs).map((c) => (
                <g key={c.text} className="dg-chip">
                  <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={c.h / 2} />
                  <text x={c.x + 10} y={c.y + c.h * 0.66} className="dg-mono" style={size(11)}>{c.text}</text>
                </g>
              ))}
          </g>
        );
      })}

      {/* Edge labels last so they sit above lines */}
      {spec.edges.map((e, i) => {
        if (!e.label) return null;
        const { mid } = route(box(e.from), box(e.to));
        const w = e.label.length * LABEL_CHAR * fs + 16;
        const h = 20 * fs;
        return (
          <g key={`l${i}`} className="dg-edge-label">
            <rect x={mid[0] - w / 2} y={mid[1] - h / 2} width={w} height={h} rx={h / 2} />
            <text x={mid[0]} y={mid[1] + 3.6 * fs} textAnchor="middle" className="dg-mono" style={size(10.5)}>{e.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Renders a wide diagram, swapped for a tall variant on small screens via CSS. */
export function SystemDiagram({ id }) {
  const spec = diagrams[id];
  const uid = 'dg' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    // Exact aspect ratios let off-screen diagrams skip rendering without shifting layout
    <div className="system-diagram" style={{ '--ar-wide': ratio(spec, 'wide'), '--ar-tall': ratio(spec, 'tall') }}>
      <Canvas spec={spec} layout="wide" uid={uid} />
      <Canvas spec={spec} layout="tall" uid={uid} />
    </div>
  );
}
