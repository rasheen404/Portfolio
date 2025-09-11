import React from 'react';
import { portfolioData, ProjectIcons } from '../data.jsx';
import { Section } from './Section';
import { CheckmarkCircleIcon } from './Icons';

export const Projects = () => (
    <Section id="projects" title="Featured Projects">
        <div className="space-y-12">
            {portfolioData.projects.map((project, index) => (
                <div key={index} className="glass-effect rounded-xl overflow-hidden reveal">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                        <div className="w-full md:w-5/12 p-8 flex justify-center items-center text-[var(--accent-glow)] bg-[var(--mid-bg)]/50">
                            <div className="opacity-80 relative z-10 transition-transform duration-300 group-hover:scale-105">
                                {ProjectIcons[project.name] ? ProjectIcons[project.name]() : null}
                            </div>
                        </div>
                        <div className="w-full md:w-7/12 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{project.name}</h3>
                            <p className="text-sm text-[var(--text-secondary)]/80 mb-4">{project.period}</p>
                            <ul className="space-y-3 text-[var(--text-secondary)]">
                                {project.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckmarkCircleIcon />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

