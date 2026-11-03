import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** Rendered at build time (scripts/prerender.mjs) so crawlers receive the full page as HTML. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
