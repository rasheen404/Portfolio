import React, { useState } from 'react';
import { portfolioData } from '../data.jsx';
import { motion } from 'framer-motion';

const mod = (n, m) => ((n % m) + m) % m;

export const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const projects = portfolioData.projects;
    const N = projects.length;

    const handleNext = () => setCurrentIndex(prev => prev + 1);
    const handlePrev = () => setCurrentIndex(prev => prev - 1);

    const activeIndex = mod(currentIndex, N);

    return (
        <section id="projects" className="py-24 md:py-32 bg-[#000000] relative z-10 overflow-hidden perspective-[2000px] min-h-screen flex flex-col justify-center items-center">
            
            {/* Elegant Header Area */}
            <div className="w-full max-w-7xl mx-auto px-6 mb-16 text-center z-50">
                <span className="text-xs md:text-sm font-mono tracking-widest text-accent mb-4 block uppercase">
                    Selected Archives
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                    Featured Works
                </h2>
            </div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-7xl mx-auto h-[450px] md:h-[600px] flex items-center justify-center">
                {projects.map((project, i) => {
                    const diff = mod(i - activeIndex + Math.floor(N / 2), N) - Math.floor(N / 2);

                    const isActive = diff === 0;
                    const isVisible = Math.abs(diff) <= 1;

                    // Responsive transform: smaller offset on mobile
                    const xOffset = typeof window !== 'undefined' && window.innerWidth < 768 ? 45 : 60;
                    const xTransform = `${diff * xOffset}%`;
                    const scaleTransform = isActive ? 1 : 0.8;
                    const rotateYTransform = isActive ? 0 : diff > 0 ? -30 : 30;
                    const zTransform = isActive ? 100 : 0;
                    const opacityTransform = isVisible ? (isActive ? 1 : 0.3) : 0;
                    const zIndexTransform = 50 - Math.abs(diff);

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                x: xTransform,
                                scale: scaleTransform,
                                rotateY: rotateYTransform,
                                z: zTransform,
                                opacity: opacityTransform,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{
                                zIndex: zIndexTransform,
                                transformStyle: "preserve-3d"
                            }}
                            className={`absolute w-[85%] md:w-[60%] h-full rounded-[2.5rem] bg-[#050505] border overflow-hidden shadow-2xl ${isActive ? 'border-accent/40' : 'border-white/10'}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />
                            
                            <div className={`absolute inset-0 opacity-30 ${isActive ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent' : 'bg-transparent'} transition-all duration-1000 pointer-events-none`} />

                            <div className="relative z-20 h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md bg-white/5 text-xs font-mono tracking-widest text-accent uppercase">
                                        {project.period}
                                    </span>
                                    <span className="text-7xl md:text-8xl font-black text-white/5 tracking-tighter pointer-events-none">
                                        0{i + 1}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                                        {project.name}
                                    </h3>
                                    
                                    <div className="space-y-4 max-w-lg">
                                        {project.points.slice(0, 2).map((point, idx) => (
                                            <p key={idx} className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
                                                {point}
                                            </p>
                                        ))}
                                    </div>
                                    
                                    {isActive && (
                                        <motion.button 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="mt-10 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-accent hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center gap-3"
                                        >
                                            View Project
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {!isActive && (
                                <div 
                                    className="absolute inset-0 z-50 cursor-pointer" 
                                    onClick={() => setCurrentIndex(currentIndex + diff)}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Premium Navigation Controls */}
            <div className="mt-16 z-50 flex items-center gap-8 px-8 py-3 rounded-full bg-[#050505]/80 border border-white/10 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <button 
                    onClick={handlePrev}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-accent transition-colors duration-300 group"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                
                <span className="font-mono text-sm tracking-widest text-gray-400">
                    <span className="text-white">0{activeIndex + 1}</span> <span className="mx-2 opacity-50">/</span> 0{N}
                </span>

                <button 
                    onClick={handleNext}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-accent transition-colors duration-300 group"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>

        </section>
    );
};
