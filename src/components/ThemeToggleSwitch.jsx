import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

export const ThemeToggleSwitch = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[var(--light-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-glow)] focus:ring-offset-[var(--dark-bg)] transition-all overflow-hidden"
        aria-label="Toggle theme"
    >
        <SunIcon style={{ 
            opacity: theme === 'light' ? 1 : 0, 
            transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)' 
        }} />
        <MoonIcon style={{ 
            opacity: theme === 'dark' ? 1 : 0, 
            transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)' 
        }}/>
    </button>
);

