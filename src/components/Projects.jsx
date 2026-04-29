import React, { useRef } from 'react';
import { portfolioData, ProjectIcons } from '../data.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal, TextReveal, TiltCard, StaggerContainer, StaggerItem } from './AnimationKit';

const ProjectCard = ({ project, index, isLarge }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    // Subtle parallax on the visual panel
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const accentColors = [
        { bg: 'from-accent/10 to-purple-500/10', border: 'group-hover:border-accent/20', dot: 'bg-accent', glow: 'rgba(99,102,241,0.1)' },
        { bg: 'from-emerald-500/10 to-teal-500/10', border: 'group-hover:border-emerald-500/20', dot: 'bg-emerald-500', glow: 'rgba(16,185,129,0.1)' },
        { bg: 'from-amber-500/10 to-orange-500/10', border: 'group-hover:border-amber-500/20', dot: 'bg-amber-500', glow: 'rgba(245,158,11,0.1)' },
    ];
    const color = accentColors[index % accentColors.length];
    const techStacks = ['Spring Boot · REST API · Mobile', 'Spring Boot · Razorpay', 'Spring Security · OAuth 2.0 · JWT'];

    return (
        <div ref={cardRef}>
            <TiltCard
                tiltAmount={isLarge ? 4 : 6}
                className={`glass-card group overflow-hidden ${color.border} transition-all duration-500 h-full ${
                    isLarge ? 'md:col-span-2' : ''
                }`}
            >
                <div className={`flex flex-col ${isLarge ? 'md:flex-row' : ''} h-full`}>
                    {/* Project visual — parallax inner scroll */}
                    <div className={`relative overflow-hidden ${isLarge ? 'md:w-2/5' : 'w-full'}`}>
                        <motion.div 
                            style={{ y: imageY }}
                            className={`w-full h-48 ${isLarge ? 'md:h-full md:min-h-[300px]' : ''} bg-gradient-to-br ${color.bg} flex items-center justify-center relative`}
                        >
                            <div className="absolute inset-0 grid-bg opacity-40" />
                            
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="relative text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-700"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                >
                                    {ProjectIcons[project.name] ? ProjectIcons[project.name]() : (
                                        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                                            <path d="M3 9h18"/><path d="M9 21V9"/>
                                        </svg>
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* Shine sweep */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        </motion.div>
                    </div>

                    {/* Project content */}
                    <div className={`p-6 flex flex-col flex-grow ${isLarge ? 'md:w-3/5' : ''}`}>
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors duration-300">
                                {project.name}
                            </h3>
                            <span className="flex-shrink-0 ml-3 text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-white/[0.04]">
                                {project.period}
                            </span>
                        </div>

                        <ul className="space-y-2.5 flex-grow">
                            {project.points.map((point, i) => (
                                <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                                    className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                                >
                                    <span className={`flex-shrink-0 w-1 h-1 rounded-full ${color.dot} opacity-50 mt-2`} />
                                    <span>{point}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-5 pt-4 border-t border-gray-200/50 dark:border-white/[0.04] flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                            <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                                {techStacks[index] || 'Java · Spring Boot'}
                            </span>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </div>
    );
};

export const Projects = () => (
    <section id="projects" className="py-32">
        <div className="section-container">
            <ScrollReveal direction="blur" className="mb-16">
                <p className="text-sm font-mono text-accent mb-3 tracking-wider">04 / WORK</p>
                <TextReveal as="h2" className="section-heading mb-4">Featured Projects</TextReveal>
                <p className="section-subtitle">A curated selection of enterprise applications I've built.</p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
                {portfolioData.projects.map((project, index) => (
                    <StaggerItem key={index} className={index === 0 ? 'md:col-span-2' : ''}>
                        <ProjectCard
                            project={project}
                            index={index}
                            isLarge={index === 0}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
    </section>
);
