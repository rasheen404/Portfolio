import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { portfolioData } from '../data.jsx';

export const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    
    // Parallax effects on scroll
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [downloadState, setDownloadState] = useState('idle');
    const [showSummary, setShowSummary] = useState(false);

    const handleDownload = async (e) => {
        e.preventDefault();
        if (downloadState === 'loading') return;
        
        setDownloadState('loading');
        
        try {
            const response = await fetch(portfolioData.cv_url);
            if (!response.ok) throw new Error("Download failed");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "Mohammed_Rasheen_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            setDownloadState('success');
        } catch (error) {
            console.error(error);
            setDownloadState('error');
        } finally {
            setTimeout(() => setDownloadState('idle'), 3000);
        }
    };

    useEffect(() => {
        // Elite cinematic entrance
        anime.timeline({ easing: 'easeOutExpo' })
        .add({
            targets: '.hero-line',
            scaleX: [0, 1],
            duration: 1500,
            delay: 200
        })
        .add({
            targets: '.hero-char',
            translateY: ['110%', '0%'],
            rotateZ: [5, 0],
            duration: 1200,
            delay: anime.stagger(40),
        }, '-=1000')
        .add({
            targets: '.hero-sub',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
        }, '-=800');
    }, []);

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ transformOrigin: '0 100%' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section ref={heroRef} id="about" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20">
            <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center justify-center w-full px-6">
                
                {/* Ultra Premium Typography */}
                <div className="w-full max-w-7xl relative">
                    <h1 className="sr-only">{portfolioData.name} - Java Full-Stack Engineer</h1>
                    
                    <div className="overflow-hidden mb-[-4vw]">
                        <div className="text-[12vw] font-black uppercase leading-none tracking-tighter text-transparent ml-12 md:ml-24" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
                            {splitText("MOHAMMED")}
                        </div>
                    </div>
                    
                    <div className="hero-line w-full h-px bg-white/20 my-4 origin-left" />
                    
                    <div className="overflow-hidden flex justify-end mt-[-4vw]">
                        <div className="text-[14vw] font-black uppercase leading-none tracking-tighter text-white mr-12 md:mr-24 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                            {splitText("RASHEEN")}
                        </div>
                    </div>
                </div>

                {/* Sub-text and actions */}
                <div className="hero-sub flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mt-24 px-4 gap-8">
                    <p className="text-gray-400 font-light max-w-sm text-center md:text-left text-lg">
                        Crafting elite digital experiences through <span className="text-white font-medium">engineering</span> and <span className="text-accent font-medium">design</span>.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <button 
                            onClick={handleDownload}
                            className={`group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 w-full sm:w-[200px] flex items-center justify-center
                                ${downloadState === 'idle' ? 'border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer' : ''}
                                ${downloadState === 'loading' ? 'bg-white/20 text-white cursor-wait border border-white/40' : ''}
                                ${downloadState === 'success' ? 'bg-green-500 text-white border-transparent shadow-[0_0_30px_rgba(34,197,94,0.4)]' : ''}
                                ${downloadState === 'error' ? 'bg-red-500 text-white border-transparent shadow-[0_0_30px_rgba(239,68,68,0.4)]' : ''}
                            `}
                        >
                            {downloadState === 'idle' && (
                                <>
                                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 font-mono text-sm tracking-widest text-white group-hover:text-black transition-colors duration-500">
                                        DOWNLOAD CV
                                    </span>
                                </>
                            )}
                            {downloadState === 'loading' && (
                                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            )}
                            {downloadState === 'success' && (
                                <span className="font-mono text-sm tracking-widest font-bold flex items-center gap-2">
                                    DOWNLOADED <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                            )}
                            {downloadState === 'error' && (
                                <span className="font-mono text-sm tracking-widest font-bold flex items-center gap-2">
                                    FAILED <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                </span>
                            )}
                        </button>

                        <button 
                            onClick={() => setShowSummary(true)}
                            className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 w-full sm:w-[200px] flex items-center justify-center border border-accent/30 bg-accent/5 backdrop-blur-md hover:bg-accent/20"
                        >
                            <span className="relative z-10 font-mono text-sm tracking-widest text-accent transition-colors duration-500 flex items-center gap-2">
                                SUMMARIZE ME
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Summary Modal */}
            <AnimatePresence>
                {showSummary && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowSummary(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                        >
                            <button 
                                onClick={() => setShowSummary(false)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                            
                            <span className="px-3 py-1 text-xs font-mono tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full">TL;DR</span>
                            <h3 className="text-3xl font-black mt-6 mb-4 text-white">Quick Summary</h3>
                            <div className="text-gray-400 font-light leading-relaxed text-lg">
                                <p>{portfolioData.summary}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
