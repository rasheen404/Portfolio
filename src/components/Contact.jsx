import React from 'react';
import { portfolioData } from '../data.jsx';
import { Section } from './Section';
import { SendIcon } from './Icons';

export const Contact = () => (
    <Section id="contact" title="Get In Touch">
        <div className="max-w-2xl mx-auto glass-effect rounded-xl p-8">
            <p className="text-[var(--text-secondary)] text-center mb-8"> I'm currently seeking new opportunities. If you have a project or a role that you think would be a good fit, please feel free to reach out. </p>
            <form action={`mailto:${portfolioData.email}`} method="post" encType="text/plain" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name</label>
                    <input type="text" name="name" id="name" required className="w-full bg-[var(--light-bg)] border border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-glow)] focus:outline-none transition" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                    <input type="email" name="email" id="email" required className="w-full bg-[var(--light-bg)] border border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-glow)] focus:outline-none transition" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
                    <textarea name="message" id="message" rows="4" required className="w-full bg-[var(--light-bg)] border border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-glow)] focus:outline-none transition"></textarea>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg"> Send Message <SendIcon/> </button>
            </form>
        </div>
    </Section>
);

