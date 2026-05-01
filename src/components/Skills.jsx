import React, { useState } from 'react';
import { portfolioData, SkillIcons } from '../data.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export const Skills = () => {
    const allSkills = Object.values(portfolioData.skills).flat();
    const [showAllSkills, setShowAllSkills] = useState(false);
    
    // Duplicate skills for infinite marquee effect
    const marqueeSkills = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section id="skills" className="py-32 bg-[#020202] overflow-hidden border-t border-b border-white/5 relative z-10">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10 pointer-events-none" />
            
            <div className="flex flex-col items-center mb-16 relative z-20">
                <span className="text-xs font-mono tracking-widest text-accent mb-4">ARSENAL</span>
                <h2 className="sr-only">Technical Arsenal and Skills</h2>
                <button 
                    onClick={() => setShowAllSkills(true)}
                    className="px-6 py-2 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-xs font-mono tracking-widest uppercase text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    View All Skills
                </button>
            </div>

            {/* Massive Hollow Typography Marquee */}
            <div className="relative w-full flex overflow-hidden whitespace-nowrap opacity-10 pointer-events-none mix-blend-difference z-0">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="flex"
                >
                    <span className="text-[20vw] md:text-[15vw] font-black tracking-tighter uppercase mr-12" style={{ WebkitTextStroke: '1px rgba(255,255,255,1)', color: 'transparent' }}>
                        TECH STACK &nbsp;&mdash;&nbsp; ENGINEERING &nbsp;&mdash;&nbsp;
                    </span>
                    <span className="text-[20vw] md:text-[15vw] font-black tracking-tighter uppercase mr-12" style={{ WebkitTextStroke: '1px rgba(255,255,255,1)', color: 'transparent' }}>
                        TECH STACK &nbsp;&mdash;&nbsp; ENGINEERING &nbsp;&mdash;&nbsp;
                    </span>
                </motion.div>
            </div>

            {/* Interactive Pill Marquee */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex overflow-hidden z-20 mt-12">
                <motion.div 
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    className="flex gap-6"
                >
                    {marqueeSkills.map((skill, index) => (
                        <div 
                            key={index}
                            className="flex items-center gap-4 px-8 py-4 rounded-full bg-[#050505]/90 backdrop-blur-md border border-white/10 hover:border-accent hover:bg-white/5 transition-all duration-300 group cursor-default shrink-0"
                        >
                            {SkillIcons[skill.replace(/\s+/g, '')] && (
                                <span className="w-6 h-6 text-gray-500 group-hover:text-accent transition-colors flex items-center justify-center">
                                    {React.createElement(SkillIcons[skill.replace(/\s+/g, '')])}
                                </span>
                            )}
                            <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                                {skill}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* View All Skills Modal */}
            <AnimatePresence>
                {showAllSkills && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowAllSkills(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] custom-scrollbar"
                        >
                            <button 
                                onClick={() => setShowAllSkills(false)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                            
                            <span className="px-3 py-1 text-xs font-mono tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full">FULL ARSENAL</span>
                            <h3 className="text-4xl font-black mt-6 mb-12 text-white uppercase tracking-tighter">Technical Stack</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                                    <div key={category} className="space-y-4">
                                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2">{category}</h4>
                                        <div className="flex flex-col gap-3">
                                            {skills.map(skill => (
                                                <div key={skill} className="flex items-center gap-3">
                                                    {SkillIcons[skill.replace(/\s+/g, '')] && (
                                                        <span className="w-4 h-4 text-accent flex items-center justify-center">
                                                            {React.createElement(SkillIcons[skill.replace(/\s+/g, '')])}
                                                        </span>
                                                    )}
                                                    <span className="text-gray-300 font-light">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
