import React from 'react';
import { portfolioData } from '../data.jsx';
import { LinkedinIcon, GithubIcon, MailIcon } from './Icons';

export const Footer = () => (
    <footer className="bg-transparent mt-12">
        <div className="container mx-auto px-6 py-8 text-center text-[var(--text-secondary)]">
            <div className="flex justify-center items-center gap-6 mb-4">
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors"><LinkedinIcon /></a>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors"><GithubIcon /></a>
                <a href={`mailto:${portfolioData.email}`} className="hover:text-[var(--text-primary)] transition-colors"><MailIcon /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
    </footer>
);

