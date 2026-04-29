import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsMarquee } from './components/SkillsMarquee';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { Background } from './components/Background';
import { SectionDivider } from './components/AnimationKit';

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (userPrefersDark ? 'dark' : 'light');
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
            
            <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoading ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
                <Background theme={theme} />
                <Header scrollY={scrollY} theme={theme} toggleTheme={toggleTheme} />
                
                <main className="relative z-10">
                    <Hero />
                    <SkillsMarquee />
                    <SectionDivider className="my-8" />
                    <Skills />
                    <SectionDivider className="my-8" />
                    <Experience />
                    <SectionDivider className="my-8" />
                    <Projects />
                    <SectionDivider className="my-8" />
                    <Contact />
                </main>
                
                <Footer />
            </div>
        </>
    );
}

export default App;
