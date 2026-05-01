import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { Scene3D } from './components/Scene3D';
import { AnimeScrollProgress } from './components/AnimeKit';
import { Chatbot } from './components/Chatbot';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Enforce dark mode on the html element
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = '#020202';

        // Intersection Observer for Contact Section
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsContactVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when 10% of contact section is visible
        );

        const contactSection = document.getElementById('contact');
        if (contactSection) observer.observe(contactSection);

        // Initialize Smooth Scroll (Lenis) for best FLOW
        const lenis = new Lenis({
            duration: 0.4,
            easing: (t) => 1 - Math.pow(1 - t, 3), // Faster ease-out cubic
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.5,
            wheelMultiplier: 1.5,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            if (contactSection) observer.unobserve(contactSection);
        };
    }, []);

    return (
        <div className="bg-transparent min-h-screen text-white font-sans selection:bg-accent selection:text-black">
            <CustomCursor />
            <Scene3D />
            {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
            
            <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <AnimeScrollProgress />
                
                {/* Global fixed top brand */}
                <div className="fixed top-0 left-0 w-full p-6 z-[90] mix-blend-difference flex justify-end items-center pointer-events-none">
                    <a href="mailto:mohammedrasheen2001@gmail.com" className="text-sm font-mono tracking-widest hover:text-accent pointer-events-auto transition-colors">AVAILABLE FOR HIRE</a>
                </div>

                <Header />

                {/* Main Content Flow - Removed gaps to allow pure overlap/sticky transitions */}
                <main className="relative z-10 flex flex-col">
                    <Hero />
                    
                    {/* Add a subtle spacer to let Hero breathe before Skills */}
                    <div className="h-[20vh] w-full" />
                    
                    <Skills />
                    
                    {/* Spacer for flow */}
                    <div className="h-[20vh] w-full" />
                    
                    <Projects />
                    
                    {/* Spacer for flow */}
                    <div className="h-[10vh] w-full" />
                    
                    <Experience />
                    
                    <Contact />
                </main>

                <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

                {/* Floating Chatbot Button Placeholder - Visible only near Contact */}
                <AnimatePresence>
                    {isContactVisible && (
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] group flex items-center justify-center w-14 h-14 md:w-auto md:h-auto md:px-6 md:py-4 rounded-full bg-accent text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] cursor-pointer"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:mr-2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                <path d="M8 10h.01M12 10h.01M16 10h.01"/>
                            </svg>
                            <span className="hidden md:block font-bold font-mono text-sm tracking-widest">
                                {isChatOpen ? 'CLOSE' : 'ASK AI'}
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
