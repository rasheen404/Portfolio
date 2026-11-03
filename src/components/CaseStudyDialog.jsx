import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import { SystemDiagram } from './SystemDiagram';
import { Icon } from './ui/Icon';

/**
 * Full case study in a native modal <dialog> (focus trap, Esc and top-layer
 * for free). Content stays mounted through the closing animation.
 */
export function CaseStudyDialog({ project, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const [shown, setShown] = useState(project);

  // Keep the last project rendered while the dialog animates out
  if (project && project !== shown) setShown(project);

  useEffect(() => {
    const d = dialogRef.current;
    if (!project || !d) return;
    if (!d.open) d.showModal();
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project]);

  const requestClose = useCallback(() => {
    const d = dialogRef.current;
    if (!d?.open || d.classList.contains('is-closing')) return;
    const finish = () => {
      d.classList.remove('is-closing');
      d.close();
    };
    if (prefersReducedMotion()) return finish();
    d.classList.add('is-closing');
    setTimeout(finish, 240);
  }, []);

  const onCancel = (e) => {
    e.preventDefault();
    requestClose();
  };

  const onBackdropClick = (e) => {
    if (e.target !== dialogRef.current) return;
    const r = e.target.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) requestClose();
  };

  const index = shown ? projects.findIndex((p) => p.id === shown.id) : -1;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-dialog-title"
      onCancel={onCancel}
      onClose={() => shown && onClose(shown.id)}
      onClick={onBackdropClick}
    >
      {shown && (
        <div ref={scrollRef} className="case-dialog__scroll">
          <button type="button" className="icon-btn glass case-dialog__close" onClick={requestClose} aria-label="Close case study">
            <Icon name="close" size={18} />
          </button>

          <div className="case-dialog__media">
            <SystemDiagram key={shown.id} id={shown.diagram} />
          </div>

          <div key={shown.id} className="case-dialog__content">
            <p className="case__meta">
              <span>{shown.category}</span>
              <span aria-hidden="true">·</span>
              <span>{shown.period}</span>
              <span aria-hidden="true">·</span>
              <span>{shown.context}</span>
            </p>
            <h2 id="case-dialog-title" className="case-dialog__title">{shown.name}</h2>
            <p className="lead">{shown.summary}</p>

            <div className="case-dialog__grid">
              <section>
                <h3>The problem</h3>
                <p>{shown.problem}</p>
              </section>

              <section>
                <h3>My contribution</h3>
                <ul className="case-dialog__list">
                  {shown.contribution.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </section>

              <section>
                <h3>Technical challenges</h3>
                <ul className="case-dialog__list">
                  {shown.challenges.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </section>

              {shown.highlights.length > 0 && (
                <section>
                  <h3>Highlights</h3>
                  <ul className="case__highlights">
                    {shown.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={16} strokeWidth={2} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="case-dialog__stack">
                <h3>Stack</h3>
                <ul className="tag-list">
                  {shown.stack.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              </section>
            </div>

            <footer className="case-dialog__footer">
              {shown.linkNote ? (
                <p className="case-dialog__note">
                  <Icon name="lock" size={16} /> {shown.linkNote}
                </p>
              ) : <span />}
              {next && next.id !== shown.id && (
                <button type="button" className="btn btn--ghost case-dialog__next" onClick={() => onNavigate(next.id)}>
                  Next: {next.name} <Icon name="arrowRight" size={18} className="icon-nudge-x" />
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </dialog>
  );
}
