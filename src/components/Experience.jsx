import React, { useRef } from 'react';
import { portfolioData } from '../data.jsx';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const EditorialNode = ({ item, index, scrollYProgress, totalNodes }) => {
    // Precise calculation for scroll-linked fades
    const step = 1 / totalNodes;
    const startFade = index * step;
    const endFade = startFade + (step * 0.5);
    
    // Physics-based opacity and transform
    const opacity = useTransform(scrollYProgress, [startFade, endFade], [0.3, 1]);
    const xOffset = useTransform(scrollYProgress, [startFade, endFade], [30, 0]);
    const glow = useTransform(scrollYProgress, [startFade, endFade], ["rgba(255,255,255,0.1)", "rgba(0,229,255,1)"]);
    
    // Extract year for typography
    const year = item.period.split(' ')[0];

    return (
        <div className="relative w-full flex mb-32 last:mb-0 group">
            
            {/* Massive Sticky-ish Typography on the left */}
            <div className="hidden md:flex w-1/3 flex-col items-end pr-16 relative">
                <motion.div style={{ opacity }} className="sticky top-[40vh] flex flex-col items-end text-right">
                    <span className="text-sm font-mono tracking-widest text-accent uppercase mb-2">
                        {item.period}
                    </span>
                    <h3 className="text-6xl lg:text-7xl font-black text-white/20 tracking-tighter leading-none group-hover:text-white transition-colors duration-700">
                        {year}
                    </h3>
                </motion.div>
            </div>

            {/* Mobile Date (Visible only on mobile) */}
            <div className="md:hidden absolute -top-8 left-12 text-sm font-mono tracking-widest text-accent uppercase">
                {item.period}
            </div>

            {/* Center Timeline Axis */}
            <div className="absolute left-4 md:left-1/3 flex flex-col items-center h-full -translate-x-1/2">
                {/* The Node Dot */}
                <motion.div 
                    style={{ borderColor: glow }} 
                    className="w-5 h-5 rounded-full border-[4px] bg-[#000000] z-20 mt-2 transition-colors duration-300"
                />
            </div>

            {/* Right Content Area */}
            <motion.div 
                style={{ opacity, x: xOffset }} 
                className="w-full md:w-2/3 pl-12 md:pl-16 pb-12"
            >
                <div className="flex flex-col">
                    <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                        {item.title}
                    </h4>
                    
                    <p className="text-lg md:text-xl font-light text-gray-400 mb-8 flex items-center gap-4">
                        <span className="w-8 h-px bg-white/20" />
                        {item.institution}
                    </p>
                    
                    {item.points && (
                        <div className="space-y-5">
                            {item.points.map((point, i) => (
                                <div key={i} className="flex items-start gap-4 group/point">
                                    <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white/10 group-hover/point:bg-accent transition-colors duration-300 shrink-0" />
                                    <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

        </div>
    );
};

export const Experience = () => {
    const containerRef = useRef(null);
    
    // Smooth scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const journey = portfolioData.journey;

    return (
        <section ref={containerRef} id="experience" className="py-32 bg-[#000000] relative z-10 min-h-screen">
            <div className="section-container relative z-10">
                
                {/* Clean, Editorial Header */}
                <div className="w-full max-w-7xl mx-auto px-6 mb-32 md:mb-48 border-b border-white/10 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="text-xs font-mono tracking-widest text-accent mb-4 block uppercase">
                                CAREER PATH
                            </span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                                The <span className="text-gray-600">Journey.</span>
                            </h2>
                        </div>
                        <p className="text-xl text-gray-500 font-light max-w-md">
                            A reverse chronological timeline tracing my evolution from standard education to elite software engineering.
                        </p>
                    </div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-6">
                    
                    {/* The Unfilled Axis Line */}
                    <div className="absolute left-10 md:left-[calc(33.333333%+1.5rem)] top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
                    
                    {/* The Animated Filling Axis Line */}
                    <motion.div 
                        className="absolute left-10 md:left-[calc(33.333333%+1.5rem)] top-0 bottom-0 w-px bg-accent -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(0,229,255,0.5)] z-10"
                        style={{ scaleY: springProgress }}
                    />
                    
                    <div className="flex flex-col relative pt-4">
                        {journey.map((item, index) => (
                            <EditorialNode 
                                key={index} 
                                item={item} 
                                index={index} 
                                scrollYProgress={springProgress}
                                totalNodes={journey.length}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
