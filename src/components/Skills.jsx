import React, { useState, useEffect, useRef } from 'react';
import { portfolioData, SkillIcons } from '../data.jsx';
import { CheckCircleIcon, GridIcon, XIcon } from './Icons';

const SkillModal = ({ skills, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.classList.add('modal-open');

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('modal-open');
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="glass-effect w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl p-8 m-4 animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold gradient-text">All Skills</h3>
                    <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                        <XIcon />
                    </button>
                </div>
                
                {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="mb-8">
                        <h4 className="text-xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--border-color)] pb-2 mb-4">{category}</h4>
                        <div className="flex flex-wrap gap-3">
                            {skillList.map(skill => (
                                <span key={skill} className="flex items-center gap-2 bg-[var(--light-bg)] px-4 py-2 rounded-full text-[var(--text-primary)] text-sm font-medium">
                                    {SkillIcons[skill.replace(/\s+/g, '')] && <span className="text-[var(--accent-glow)]">{React.createElement(SkillIcons[skill.replace(/\s+/g, '')])}</span>}
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <style>{`@keyframes fade-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
        </div>
    );
};

export const Skills = () => {
    const containerRef = useRef(null);
    const skillsRef = useRef([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allSkills = [
        ...portfolioData.skills["Tools & Technologies"],
        ...portfolioData.skills["Developer Tools"]
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let radius = container.offsetWidth / 3;
        if (window.innerWidth < 768) radius = container.offsetWidth / 2.2;
        if (window.innerWidth < 480) radius = container.offsetWidth / 1.8;
        
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        };

        container.addEventListener('mousemove', handleMouseMove);

        let angleX = 0.002;
        let angleY = 0.002;

        const updatePositions = () => {
            angleX += mouseX * 0.005;
            angleY += mouseY * 0.005;
            mouseX *= 0.98;
            mouseY *= 0.98;
            
             if (Math.abs(mouseX) < 0.001 && Math.abs(mouseY) < 0.001) {
                angleX += 0.0005; 
                angleY += 0.0005;
            }

            skillsRef.current.forEach((skill, i) => {
                if (!skill) return;
                const phi = Math.acos(-1 + (2 * i) / allSkills.length);
                const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
                const sin_t = Math.sin(theta + angleX);
                const cos_t = Math.cos(theta + angleX);
                const sin_p = Math.sin(phi + angleY);
                const cos_p = Math.cos(phi + angleY);
                const x = radius * cos_t * sin_p;
                const y = radius * sin_t * sin_p;
                const z = radius * cos_p;
                const scale = (z + radius) / (2 * radius);
                
                skill.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
                skill.style.opacity = `${scale * 0.8 + 0.2}`;
                skill.style.zIndex = `${Math.floor(scale * 100)}`;
            });

            animationFrameId = requestAnimationFrame(updatePositions);
        };
        
        updatePositions();

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [allSkills.length]);

    return (
        <section id="skills" className="container mx-auto px-6 py-20">
            <div className="reveal">
                <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Technical Skills</h2>
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center">
                        {allSkills.map((skill, index) => (
                            <div
                                key={skill}
                                ref={el => skillsRef.current[index] = el}
                                className="absolute transition-all duration-100 ease-out flex items-center gap-2 bg-[var(--mid-bg)] px-4 py-2 rounded-full shadow-lg border border-[var(--border-color)] hover:!scale-110 hover:!opacity-100"
                            >
                                <span className="w-6 h-6 flex items-center justify-center text-[var(--accent-glow)]">
                                   {SkillIcons[skill.replace(/\s+/g, '')] ? React.createElement(SkillIcons[skill.replace(/\s+/g, '')]) : null}
                                </span>
                                <span className="font-semibold text-[var(--text-primary)] text-sm">{skill}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg"
                        >
                           <GridIcon /> View All Skills
                        </button>
                    </div>
                    
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-6">Professional Abilities</h3>
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-lg text-[var(--text-secondary)]">
                            {portfolioData.skills["Soft Skills"].map((skill) => (
                                <span key={skill} className="flex items-center gap-2">
                                   <CheckCircleIcon />
                                   {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <SkillModal skills={portfolioData.skills} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

