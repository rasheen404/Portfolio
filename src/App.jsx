import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { GlobalStyles } from './components/GlobalStyles';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (userPrefersDark ? 'dark' : 'light');
    });
    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useScrollAnimation();
    
    return (
        <React.Fragment>
            <GlobalStyles />
            <CustomCursor />
            {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
            <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="relative z-10">
                    <Header theme={theme} toggleTheme={toggleTheme} scrollY={scrollY} />
                    <main>
                        <Hero />
                        <Skills />
                        <Experience />
                        <Projects />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;

