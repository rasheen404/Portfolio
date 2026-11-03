import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { navItems, profile, RESUME_URL } from '../data/content';
import { toggleTheme } from '../hooks/useTheme';
import { answer, intents } from '../lib/assistant';
import { prefersReducedMotion } from '../lib/motion';
import { OPEN_PALETTE } from '../lib/palette';
import { Icon } from './ui/Icon';
import './CommandPalette.css';

const download = () => {
  const a = document.createElement('a');
  a.href = RESUME_URL;
  a.download = 'Mohammed_Rasheen_K_Resume.pdf';
  a.click();
};

/**
 * Spotlight-style palette: ask quick questions (answered from this portfolio's
 * content — not an AI model), jump to a section, or run an action.
 */
export function CommandPalette() {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [result, setResult] = useState(null); // { title, text, tone? }

  const close = useCallback(() => {
    const d = dialogRef.current;
    if (!d?.open || d.classList.contains('is-closing')) return;
    const finish = () => {
      d.classList.remove('is-closing');
      d.close();
    };
    if (prefersReducedMotion()) return finish();
    d.classList.add('is-closing');
    setTimeout(finish, 180);
  }, []);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery('');
    setActive(0);
    setResult(null);
    d.showModal();
    inputRef.current?.focus();
  }, []);

  // Global triggers: custom event and ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dialogRef.current?.open ? close() : open();
      }
    };
    window.addEventListener(OPEN_PALETTE, open);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(OPEN_PALETTE, open);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const goTo = useCallback(
    (id) => {
      close();
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }), 200);
    },
    [close]
  );

  // Items are plain data; `run` (an event handler) performs them.
  const allItems = useMemo(
    () => [
      ...intents.map((i) => ({ id: `ask-${i.id}`, group: 'Ask', label: i.prompt, icon: 'sparkle', keywords: i.keywords.join(' '), action: 'ask', arg: i.id })),
      ...navItems.map((n) => ({ id: `go-${n.id}`, group: 'Jump to', label: n.label, icon: 'arrowRight', action: 'go', arg: n.id })),
      { id: 'copy-email', group: 'Actions', label: 'Copy email address', hint: profile.email, icon: 'copy', action: 'copy' },
      { id: 'email', group: 'Actions', label: 'Send an email', icon: 'mail', action: 'email' },
      { id: 'resume', group: 'Actions', label: 'Download résumé (PDF)', icon: 'download', action: 'resume' },
      { id: 'theme', group: 'Actions', label: 'Switch appearance', keywords: 'theme dark light mode', icon: 'sun', action: 'theme' },
      { id: 'linkedin', group: 'Actions', label: 'Open LinkedIn', icon: 'linkedin', action: 'link', arg: profile.linkedin },
      { id: 'github', group: 'Actions', label: 'Open GitHub', icon: 'github', action: 'link', arg: profile.github },
    ],
    []
  );

  const items = useMemo(() => {
    const q = query.trim();
    if (!q) return allItems;
    const words = q.toLowerCase().split(/\s+/);
    const matches = allItems.filter((it) => {
      const hay = `${it.label} ${it.keywords ?? ''} ${it.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    // A free-text question is always offered first
    return [{ id: 'ask-free', group: 'Ask', label: `Ask “${q}”`, icon: 'sparkle', action: 'ask-free', arg: q }, ...matches];
  }, [allItems, query]);

  const run = async (item) => {
    switch (item.action) {
      case 'ask': {
        const intent = intents.find((i) => i.id === item.arg);
        return setResult({ title: intent.prompt, text: intent.answer() });
      }
      case 'ask-free':
        return setResult({ title: item.arg, text: answer(item.arg) });
      case 'go':
        return goTo(item.arg);
      case 'copy':
        try {
          await navigator.clipboard.writeText(profile.email);
          return setResult({ title: 'Copied', text: `${profile.email} is on your clipboard.`, tone: 'success' });
        } catch {
          return setResult({ title: 'Email', text: profile.email });
        }
      case 'email':
        window.location.href = `mailto:${profile.email}`;
        return close();
      case 'resume':
        download();
        return close();
      case 'theme':
        return toggleTheme();
      case 'link':
        window.open(item.arg, '_blank', 'noopener');
        return close();
    }
  };

  const safeActive = Math.min(active, Math.max(0, items.length - 1));

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [safeActive]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((safeActive + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((safeActive - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[safeActive]) run(items[safeActive]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="palette glass glass--strong"
      aria-label="Search and quick answers"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      <div className="palette__inner">
        <div className="palette__search">
          <Icon name="search" size={20} />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={items[safeActive] ? `pi-${items[safeActive].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search the portfolio or ask a question"
            placeholder="Search or ask about Rasheen…"
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
          <kbd className="palette__kbd">esc</kbd>
        </div>

        {result && (
          <div className={`palette__result ${result.tone === 'success' ? 'is-success' : ''}`} role="status" aria-live="polite">
            <p className="palette__result-title mono">{result.title}</p>
            <p>{result.text}</p>
          </div>
        )}

        <ul ref={listRef} id="palette-list" className="palette__list" role="listbox" aria-label="Results">
          {items.map((it, i) => {
            const header = i === 0 || items[i - 1].group !== it.group ? it.group : null;
            return (
              <li key={it.id} role="presentation">
                {header && <p className="palette__group mono" aria-hidden="true">{header}</p>}
                <div
                  id={`pi-${it.id}`}
                  role="option"
                  aria-selected={i === safeActive}
                  className="palette__item"
                  onPointerMove={() => i !== safeActive && setActive(i)}
                  onClick={() => run(it)}
                >
                  <span className="palette__icon" aria-hidden="true"><Icon name={it.icon} size={16} /></span>
                  <span className="palette__label">{it.label}</span>
                  {it.hint && <span className="palette__hint mono">{it.hint}</span>}
                  <Icon name="arrowRight" size={14} className="palette__enter" />
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="palette__footer mono">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span className="palette__note">Answers come from this page — not an AI model</span>
        </footer>
      </div>
    </dialog>
  );
}
