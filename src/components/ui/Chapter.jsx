/** Section header aligned to the page rail: "01 — Profile" in the rail, statement beside it. */
export function Chapter({ index, label, id, title, lead }) {
  return (
    <header className="chapter rail-grid" data-reveal>
      <p className="chapter__index mono">
        <span>{index}</span>
        <span>{label}</span>
      </p>
      <div>
        <h2 id={id} className="chapter__title">{title}</h2>
        {lead && <p className="chapter__lead">{lead}</p>}
      </div>
    </header>
  );
}
