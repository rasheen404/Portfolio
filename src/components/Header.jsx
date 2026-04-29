import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';

export const Header = ({ scrollY, theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const navLinks = ["about", "skills", "experience", "projects", "contact"];
    const isScrolled = scrollY > 50;

    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);
    });

    const isDark = theme === 'dark';

    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 w-full z-50"
        >
            {/* Scroll progress bar */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-[1px] bg-accent origin-left z-50"
                style={{ scaleX: scrollProgress }}
            />

            <div className={`transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
                <div className={`mx-auto px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled ? 'max-w-3xl' : 'max-w-6xl'
                }`}>
                    <div className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
                        isScrolled 
                            ? 'bg-white/70 dark:bg-dark-800/70 border border-gray-200/50 dark:border-white/[0.04] backdrop-blur-xl shadow-lg shadow-black/[0.03] dark:shadow-black/[0.2]' 
                            : 'bg-transparent'
                    }`}>
                        
                        {/* Logo */}
                        <a href="#about" className="flex items-center gap-3 group" id="header-logo">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-300">
                                <span className="text-sm font-bold text-accent font-mono">R</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide hidden sm:block">
                                rasheen
                            </span>
                        </a>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
                            {navLinks.map((link, i) => (
                                <motion.a 
                                    key={link} 
                                    href={`#${link}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (0.05 * i), duration: 0.5 }}
                                    className="px-3 py-2 text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.04] capitalize"
                                >
                                    {link}
                                </motion.a>
                            ))}
                            
                            <div className="w-px h-5 bg-gray-200 dark:bg-white/10 mx-2" />
                            
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all duration-200"
                                aria-label="Toggle theme"
                                id="theme-toggle-btn"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <MoonIcon />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <SunIcon />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </nav>

                        {/* Mobile controls */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 transition-all"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <MoonIcon /> : <SunIcon />}
                            </button>
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 transition-all"
                                id="mobile-menu-btn"
                            >
                                {isOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-4 right-4 mt-2 p-2 rounded-2xl bg-white/90 dark:bg-dark-800/90 border border-gray-200/80 dark:border-white/[0.06] backdrop-blur-xl shadow-xl"
                    >
                        <nav className="flex flex-col" id="mobile-nav">
                            {navLinks.map((link, i) => (
                                <motion.a 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    key={link} 
                                    href={`#${link}`} 
                                    onClick={() => setIsOpen(false)} 
                                    className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-xl transition-all capitalize"
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
