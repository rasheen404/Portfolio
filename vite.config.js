import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Preload the Latin Inter subset so headline text renders in its final font sooner. */
function preloadPrimaryFont() {
  return {
    name: 'preload-primary-font',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const font = Object.keys(ctx.bundle ?? {}).find((f) => /inter-latin-wght-normal-.*\.woff2$/.test(f));
      if (!font) return html;
      return [{ tag: 'link', attrs: { rel: 'preload', href: `/${font}`, as: 'font', type: 'font/woff2', crossorigin: '' }, injectTo: 'head-prepend' }];
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadPrimaryFont()],
});
