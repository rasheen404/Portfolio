import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { AnimeMorphBackground } from './AnimeKit';

export const Background = ({ theme }) => {
    const isLight = theme === 'light';
    const mouseX = useSpring(0, { stiffness: 30, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 30, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base color */}
            <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-light-50' : 'bg-dark-950'}`} />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-bg opacity-60" />

            {/* Anime Morphing Backgrounds for Premium Feel */}
            <AnimeMorphBackground 
                className={`absolute top-[5%] left-[10%] w-[50%] h-[50%] filter blur-[120px] opacity-40 mix-blend-screen transition-colors duration-1000 ${
                    isLight ? 'bg-purple-300' : 'bg-purple-900'
                }`}
            />
            <AnimeMorphBackground 
                className={`absolute bottom-[10%] right-[5%] w-[40%] h-[60%] filter blur-[140px] opacity-30 mix-blend-screen transition-colors duration-1000 ${
                    isLight ? 'bg-indigo-300' : 'bg-indigo-900'
                }`}
            />

            {/* Primary ambient glow */}
            <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full filter blur-[150px] transition-all duration-1000 ${
                isLight ? 'bg-accent/[0.06]' : 'bg-accent/[0.04]'
            }`} />
            
            {/* Secondary ambient glow */}
            <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full filter blur-[150px] transition-all duration-1000 ${
                isLight ? 'bg-purple-300/[0.06]' : 'bg-purple-500/[0.03]'
            }`} />

            {/* Interactive mouse glow */}
            <motion.div
                className={`pointer-events-none fixed w-[500px] h-[500px] rounded-full filter blur-[100px] transition-opacity duration-500 ${
                    isLight ? 'bg-accent/[0.04]' : 'bg-accent/[0.06]'
                }`}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Noise texture */}
            <div className="absolute inset-0 noise-overlay pointer-events-none" />
        </div>
    );
};
