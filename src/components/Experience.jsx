import React from 'react';
import { portfolioData } from '../data.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem, Counter } from './AnimationKit';
import { useRef } from 'react';

const TimelineCard = ({ item, index, isWork }) => {
    const isLeft = index % 2 === 0;
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row items-start ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
            {/* Timeline dot with scroll-linked pulse */}
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10 mt-2">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                    className="relative"
                >
                    <div className={`w-3 h-3 rounded-full ${isWork ? 'bg-accent shadow-glow-sm' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {isWork && <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '3s' }} />}
                </motion.div>
            </div>

            {/* Card */}
            <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                <motion.div 
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    className="glass-card p-6 group hover:border-accent/20 dark:hover:border-accent/10 transition-all duration-500"
                >
                    {/* Header row */}
                    <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                                isWork 
                                    ? 'bg-accent/[0.08] dark:bg-accent/10 border-accent/[0.15] text-accent' 
                                    : 'bg-gray-100 dark:bg-white/[0.04] border-gray-200 dark:border-white/[0.06] text-gray-400'
                            }`}
                        >
                            {item.icon}
                        </motion.div>
                        <div className="flex-grow min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
                            <p className="text-sm text-accent font-medium mt-0.5">{item.institution}</p>
                        </div>
                    </div>

                    {/* Period badge */}
                    <div className="mb-4">
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-white/[0.04]">
                            {item.period}
                        </span>
                    </div>

                    {/* Points — stagger in on view */}
                    {item.points && (
                        <ul className="space-y-2.5">
                            {item.points.map((point, i) => (
                                <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                                >
                                    <span className="flex-shrink-0 w-1 h-1 rounded-full bg-accent/50 mt-2" />
                                    <span>{point}</span>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export const Experience = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],
    });
    // Vertical line grows as you scroll through the section
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section id="experience" className="py-32" ref={sectionRef}>
            <div className="section-container">
                {/* Section header */}
                <ScrollReveal direction="blur" className="mb-16">
                    <p className="text-sm font-mono text-accent mb-3 tracking-wider">03 / JOURNEY</p>
                    <TextReveal as="h2" className="section-heading mb-4">Experience & Education</TextReveal>
                    <p className="section-subtitle">
                        <Counter to={2} suffix="+" className="text-accent font-semibold" /> years of professional growth and academic foundation.
                    </p>
                </ScrollReveal>

                {/* Timeline */}
                <div className="relative">
                    {/* Static vertical line (background track) */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200/50 dark:bg-white/[0.03] md:-translate-x-px" />
                    
                    {/* Animated vertical line (progress fill) */}
                    <motion.div 
                        className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-accent to-accent/20 md:-translate-x-px origin-top"
                        style={{ height: lineHeight }}
                    />

                    <div className="space-y-16">
                        {portfolioData.journey.map((item, index) => (
                            <TimelineCard 
                                key={index}
                                item={item}
                                index={index}
                                isWork={item.type === 'work'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
