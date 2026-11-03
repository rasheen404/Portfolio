export const OPEN_PALETTE = 'palette:open';

/** Opens the ⌘K palette from anywhere (nav button, mobile menu). */
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE));

export const isMac = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
