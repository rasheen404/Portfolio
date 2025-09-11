import React from 'react';
import { portfolioData } from '../data.jsx';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { DownloadIcon, LinkedinIcon, GithubIcon, MailIcon, MapPinIcon } from './Icons';
import { ParticleAnimation } from './ParticleAnimation';

export const Hero = () => {
    const typedTitle = useTypingEffect(portfolioData.title);

    return (
        <section id="about" className="relative container mx-auto px-6 min-h-screen flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:gap-12">
            <div className="reveal text-center lg:text-left max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-4"> Hi, I'm <span className="gradient-text">{portfolioData.name}</span></h1>
                <h2 className="text-2xl md:text-3xl text-[var(--text-secondary)] mb-8 h-10">{typedTitle}<span className="typing-cursor"></span></h2>
                <p className="text-lg text-[var(--text-primary)] mb-8">{portfolioData.summary}</p> 
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                    <a href={portfolioData.cv_url} download className="flex items-center gap-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg flex-shrink-0">
                        <DownloadIcon /> Download CV
                    </a>
                    <div className="flex items-center gap-6 text-[var(--text-secondary)]">
                         <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-glow)] transition-colors duration-300 transform hover:-translate-y-1"><LinkedinIcon /></a>
                         <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-glow)] transition-colors duration-300 transform hover:-translate-y-1"><GithubIcon /></a>
                         <a href={`mailto:${portfolioData.email}`} className="hover:text-[var(--accent-glow)] transition-colors duration-300 transform hover:-translate-y-1"><MailIcon /></a>
                         <div className="w-px h-6 bg-[var(--border-color)]"></div>
                         <div className="flex items-center gap-2 text-sm">
                            <MapPinIcon />
                            <span>{portfolioData.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reveal mt-12 lg:mt-0 w-full max-w-sm lg:max-w-md h-96 flex items-center justify-center">
                <div className="relative animate-[float_6s_ease-in-out_infinite] w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full blur-3xl opacity-30"></div>
                    <ParticleAnimation />
                </div>
                <style>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }`}</style>
            </div>
        </section>
    );
};

