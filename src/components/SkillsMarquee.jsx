import React from 'react';
import { ParallaxMarquee } from './AnimationKit';

const techStack = "Java · Spring Boot · Hibernate · REST APIs · Docker · Git · Microservices · AWS · JPA · SQL · OAuth 2.0 · JWT ·";

export const SkillsMarquee = () => (
    <div className="py-16 relative overflow-hidden select-none">
        {/* Forward marquee */}
        <ParallaxMarquee baseVelocity={-2} className="mb-4">
            <span className="text-6xl md:text-8xl font-bold tracking-tight text-gray-200/50 dark:text-white/[0.03]" style={{ letterSpacing: '-0.03em' }}>
                {techStack}
            </span>
        </ParallaxMarquee>

        {/* Reverse marquee */}
        <ParallaxMarquee baseVelocity={2}>
            <span className="text-6xl md:text-8xl font-bold tracking-tight text-gray-200/50 dark:text-white/[0.03]" style={{ letterSpacing: '-0.03em' }}>
                {techStack}
            </span>
        </ParallaxMarquee>

        {/* Side fade overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-light-50 dark:from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-light-50 dark:from-dark-950 to-transparent z-10 pointer-events-none" />
    </div>
);
