import React, { useRef, useEffect } from 'react';
import { portfolioData } from '../data.jsx';
import { Section } from './Section';

export const Experience = () => {
    const timelineRef = useRef(null);
    const lineRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });
        
        const elements = document.querySelectorAll('.timeline-item, .timeline-marker');
        elements.forEach(el => observer.observe(el));
        
        const handleScroll = () => {
            const timeline = timelineRef.current;
            const line = lineRef.current;
            if(!timeline || !line) return;

            const { top, height } = timeline.getBoundingClientRect();
            const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight + height)));
            
            line.style.height = `${scrollPercent * 100}%`;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            elements.forEach(el => observer.unobserve(el));
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
    <Section id="experience" title="My Journey">
        <div ref={timelineRef} className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="absolute left-1/2 -ml-px w-1 h-full bg-[var(--border-color)]">
                    <div ref={lineRef} className="absolute top-0 left-0 w-full bg-[var(--accent-glow)]" style={{height: '0%'}}></div>
                </div>
                
                {portfolioData.journey.map((item, index) => (
                    <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-[var(--dark-bg)] shadow-xl w-12 h-12 rounded-full timeline-marker border-4 border-[var(--accent-glow)]">
                            <div className="mx-auto text-white text-[var(--accent-glow)]">{item.icon}</div>
                        </div>
                        <div className={`order-1 glass-effect rounded-lg shadow-xl w-5/12 px-6 py-4 reveal ${index % 2 !== 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                            <h3 className="mb-2 font-bold text-[var(--text-primary)] text-xl">{item.title}</h3>
                            <p className="text-md leading-snug tracking-wide text-[var(--text-secondary)] mb-2">{item.institution}</p>
                            <p className="text-sm text-[var(--text-secondary)]/80 mb-4">{item.period}</p>
                            {item.points && (
                                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] text-sm">
                                    {item.points.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                .slide-in-left { transform: translateX(-50px); opacity: 0; }
                .slide-in-right { transform: translateX(50px); opacity: 0; }
                .reveal.visible .slide-in-left, .reveal.visible .slide-in-right { transform: translateX(0); opacity: 1; }
            `}</style>
        </div>
    </Section>
)};

