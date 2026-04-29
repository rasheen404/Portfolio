import React, { useState } from 'react';
import { portfolioData, SkillIcons } from '../data.jsx';
import { XIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard, TextReveal, Counter } from './AnimationKit';

const categoryMeta = {
    "Tools & Technologies": {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
        color: 'from-indigo-500/10 to-violet-500/10',
        accent: 'text-indigo-500',
    },
    "Developer Tools": {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
        color: 'from-emerald-500/10 to-teal-500/10',
        accent: 'text-emerald-500',
    },
    "Soft Skills": {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        color: 'from-amber-500/10 to-orange-500/10',
        accent: 'text-amber-500',
    },
};

const SkillPill = ({ skill, index }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.04] hover:border-accent/30 hover:bg-accent/5 dark:hover:bg-accent/[0.06] transition-colors duration-300 cursor-default"
    >
        {SkillIcons[skill.replace(/\s+/g, '')] && (
            <span className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-accent transition-colors flex items-center justify-center">
                {React.createElement(SkillIcons[skill.replace(/\s+/g, '')])}
            </span>
        )}
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
            {skill}
        </span>
    </motion.div>
);

const SkillModal = ({ skills, onClose }) => {
    React.useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/60 dark:bg-dark-950/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto glass-card p-8 md:p-10"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Full Stack</h3>
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                        <XIcon />
                    </button>
                </div>
                <StaggerContainer className="space-y-8" stagger={0.05}>
                    {Object.entries(skills).map(([category, skillList]) => (
                        <StaggerItem key={category}>
                            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 flex items-center gap-3">
                                {category}
                                <div className="h-px bg-gray-200 dark:bg-white/[0.06] flex-grow" />
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map((skill, i) => <SkillPill key={skill} skill={skill} index={i} />)}
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </motion.div>
        </div>
    );
};

export const Skills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const skillEntries = Object.entries(portfolioData.skills);
    const totalSkills = Object.values(portfolioData.skills).flat().length;

    return (
        <section id="skills" className="py-32">
            <div className="section-container">
                {/* Section header */}
                <ScrollReveal direction="blur" className="mb-16">
                    <p className="text-sm font-mono text-accent mb-3 tracking-wider">02 / SKILLS</p>
                    <TextReveal as="h2" className="section-heading mb-4">Technical Arsenal</TextReveal>
                    <p className="section-subtitle">
                        <Counter to={totalSkills} suffix="+" className="text-accent font-semibold" /> tools and technologies I wield to engineer solutions.
                    </p>
                </ScrollReveal>

                {/* Skills grid — 3D tilt cards with stagger */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.12}>
                    {skillEntries.map(([category, skillList], index) => {
                        const meta = categoryMeta[category] || categoryMeta["Soft Skills"];
                        return (
                            <StaggerItem key={category}>
                                <TiltCard className="glass-card p-6 group h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-10 h-10 rounded-xl bg-accent/[0.08] dark:bg-accent/10 border border-accent/[0.15] flex items-center justify-center ${meta.accent}`}>
                                            {meta.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
                                    </div>

                                    <StaggerContainer className="flex flex-wrap gap-2" stagger={0.04} delay={0.2}>
                                        {skillList.slice(0, 8).map((skill, i) => (
                                            <SkillPill key={skill} skill={skill} index={i} />
                                        ))}
                                        {skillList.length > 8 && (
                                            <StaggerItem>
                                                <div className="flex items-center px-3 py-1.5 rounded-xl text-xs font-mono text-gray-400 border border-dashed border-gray-300 dark:border-white/[0.06]">
                                                    +{skillList.length - 8}
                                                </div>
                                            </StaggerItem>
                                        )}
                                    </StaggerContainer>
                                </TiltCard>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                {/* View All */}
                <ScrollReveal direction="up" delay={0.3} className="mt-8 flex justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] hover:text-accent hover:border-accent/30 hover:bg-accent/5 dark:hover:bg-accent/[0.06] transition-all duration-300"
                        id="view-all-skills-btn"
                    >
                        <span>View Complete Stack</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </ScrollReveal>
            </div>

            <AnimatePresence>
                {isModalOpen && <SkillModal skills={portfolioData.skills} onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};
