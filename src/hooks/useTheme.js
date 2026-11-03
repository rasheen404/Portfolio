import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#060a14', light: '#f6f5f2' };
const root = () => document.documentElement;

const getTheme = () => (root().dataset.theme === 'light' ? 'light' : 'dark');

/** The <html data-theme> attribute is the store; any toggle anywhere re-renders subscribers. */
const subscribe = (cb) => {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
};

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  root().dataset.theme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
}

/** Theme is applied pre-paint by an inline script in index.html; this keeps React in sync. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark');
  return { theme, toggle: toggleTheme };
}
