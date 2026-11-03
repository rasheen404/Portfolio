import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './index.css';
import App from './App.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs) — hydrate it. In dev the root is empty.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
