import React, { useState } from 'react';
import { MenuIcon, XIcon } from './Icons';
import { ThemeToggleSwitch } from './ThemeToggleSwitch';

export const Header = ({ theme, toggleTheme, scrollY }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = ["about", "skills", "experience", "projects", "contact"];
    const isScrolled = scrollY > 50;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect !rounded-none' : ''}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#about" className="text-2xl font-bold gradient-text tracking-wider">Rasheen</a>
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link}`} className="capitalize text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300">{link}</a>
                        ))}
                    </nav>
                    <ThemeToggleSwitch theme={theme} toggleTheme={toggleTheme} />
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--text-primary)] focus:outline-none">
                            {isOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-[var(--mid-bg)]/90 backdrop-blur-sm">
                    <nav className="flex flex-col items-center py-4 space-y-4">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link}`} onClick={() => setIsOpen(false)} className="capitalize text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 text-lg">{link}</a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

