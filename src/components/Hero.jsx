import React, { useRef } from 'react';
import { portfolioData } from '../data.jsx';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { DownloadIcon, LinkedinIcon, GithubIcon, MailIcon, MapPinIcon } from './Icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CharReveal, MagneticWrap, ScrollReveal, ParallaxSection } from './AnimationKit';

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.4 }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { 
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
};

export const Hero = () => {
    const typedTitle = useTypingEffect(portfolioData.title);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    
    // Parallax effects as user scrolls past hero
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            <motion.div 
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
                className="section-container w-full"
            >
                <motion.div 
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl"
                >
                    {/* Status badge */}
                    <motion.div variants={fadeUp} className="mb-8">
                        <div className="accent-badge">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                            </span>
                            Open to opportunities
                        </div>
                    </motion.div>

                    {/* Name — character-by-character reveal */}
                    <motion.div variants={fadeUp}>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.95] mb-6" style={{ letterSpacing: '-0.03em' }}>
                            <CharReveal delay={0.5}>Mohammed</CharReveal>
                            <br />
                            <span className="text-gradient">
                                <CharReveal delay={0.8}>Rasheen</CharReveal>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Typed role */}
                    <motion.div variants={fadeUp} className="mb-8">
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-500 dark:text-gray-400 font-light flex items-center">
                            <span className="text-accent font-mono text-lg mr-3">{'>'}</span>
                            {typedTitle}
                            <motion.span 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }} 
                                className="inline-block w-[3px] h-7 md:h-8 ml-1 bg-accent"
                            />
                        </p>
                    </motion.div>

                    {/* Bio */}
                    <motion.p 
                        variants={fadeUp}
                        className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-12"
                    >
                        {portfolioData.summary}
                    </motion.p>

                    {/* Action row — with magnetic buttons */}
                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                        <MagneticWrap strength={0.15}>
                            <a 
                                href={portfolioData.cv_url} 
                                download="Mohammed_Rasheen_K_Java_Developer.pdf"
                                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-all duration-300 shadow-glow-sm hover:shadow-glow"
                                id="resume-download-btn"
                            >
                                <DownloadIcon />
                                <span>Download Resume</span>
                            </a>
                        </MagneticWrap>

                        <div className="flex items-center gap-2">
                            {[
                                { href: portfolioData.linkedin, icon: <LinkedinIcon />, label: "LinkedIn", id: "social-linkedin" },
                                { href: portfolioData.github, icon: <GithubIcon />, label: "GitHub", id: "social-github" },
                                { href: `mailto:${portfolioData.email}`, icon: <MailIcon />, label: "Email", id: "social-email" },
                            ].map(({ href, icon, label, id }) => (
                                <MagneticWrap key={label} strength={0.25}>
                                    <a 
                                        href={href}
                                        target={label !== 'Email' ? '_blank' : undefined}
                                        rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-300"
                                        aria-label={label}
                                        id={id}
                                    >
                                        {icon}
                                    </a>
                                </MagneticWrap>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400 text-sm">
                            <MapPinIcon />
                            <span>{portfolioData.location}</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Decorative orbital element — with parallax */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ y: orbY }}
                    className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
                >
                    <div className="relative w-80 h-80">
                        <div className="absolute inset-0 rounded-full border border-gray-200/30 dark:border-white/[0.03] animate-spin-slow" />
                        <div className="absolute inset-8 rounded-full border border-gray-200/20 dark:border-white/[0.04] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                        <div className="absolute inset-16 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: '25s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-accent/40 animate-pulse-glow" />
                        </div>
                        <div className="absolute top-4 left-1/2 w-2 h-2 rounded-full bg-accent/60 animate-float" />
                        <div className="absolute bottom-12 right-8 w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-float-delayed" />
                        <div className="absolute top-1/3 right-4 w-1 h-1 rounded-full bg-accent/30 animate-float-slow" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
