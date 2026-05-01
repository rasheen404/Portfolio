import React from 'react';
import { portfolioData } from '../data.jsx';
import { LinkedinIcon, GithubIcon, MailIcon } from './Icons';
import { motion } from 'framer-motion';
import { ScrollReveal, MagneticWrap } from './AnimationKit';

export const Footer = () => (
    <footer className="relative z-10 border-t border-gray-200/50 dark:border-white/[0.04]">
        <div className="section-container py-16">
            {/* Large CTA text */}
            <ScrollReveal direction="up" className="text-center mb-16">
                <p className="text-sm font-mono text-accent mb-6 tracking-wider">HAVE AN IDEA?</p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-8" style={{ letterSpacing: '-0.02em' }}>
                    Let's build <span className="text-gradient">something</span> together.
                </h3>
                <MagneticWrap strength={0.1}>
                    <a 
                        href={`mailto:${portfolioData.email}`}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent text-white font-medium hover:bg-accent-dark transition-all duration-300 shadow-glow-sm hover:shadow-glow text-lg"
                    >
                        <MailIcon />
                        <span>Get in Touch</span>
                    </a>
                </MagneticWrap>
            </ScrollReveal>

            {/* Footer bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-200/50 dark:border-white/[0.04]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent font-mono">R</span>
                    </div>
                    <div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">rasheen</span>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Engineering digital experiences</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    {[
                        { href: portfolioData.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
                        { href: portfolioData.github, icon: <GithubIcon />, label: "GitHub" },
                        { href: `mailto:${portfolioData.email}`, icon: <MailIcon />, label: "Email" },
                    ].map(({ href, icon, label }) => (
                        <MagneticWrap key={label} strength={0.3}>
                            <a 
                                href={href} 
                                target={label !== 'Email' ? '_blank' : undefined}
                                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:text-accent hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-200"
                                aria-label={label}
                            >
                                {icon}
                            </a>
                        </MagneticWrap>
                    ))}
                </div>
                
                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                    &copy; {new Date().getFullYear()} {portfolioData.name}
                </p>
            </div>
        </div>
    </footer>
);
