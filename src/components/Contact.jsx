import React, { useState } from "react";
import { portfolioData } from "../data.jsx";
import { SendIcon, MailIcon, LinkedinIcon, GithubIcon, MapPinIcon } from "./Icons";
import { motion } from 'framer-motion';
import { ScrollReveal, TextReveal, MagneticWrap, StaggerContainer, StaggerItem } from './AnimationKit';

export const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [focused, setFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:${portfolioData.email}?subject=Portfolio Contact from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0A%0AMessage:%0A${form.message}`;
    };

    const contactLinks = [
        { href: `mailto:${portfolioData.email}`, icon: <MailIcon />, label: "Email", value: portfolioData.email },
        { href: portfolioData.linkedin, icon: <LinkedinIcon />, label: "LinkedIn", value: "Connect on LinkedIn", external: true },
        { href: portfolioData.github, icon: <GithubIcon />, label: "GitHub", value: "View repositories", external: true },
    ];

    return (
        <section id="contact" className="py-32">
            <div className="section-container">
                {/* Section header */}
                <ScrollReveal direction="blur" className="mb-16">
                    <p className="text-sm font-mono text-accent mb-3 tracking-wider">05 / CONTACT</p>
                    <TextReveal as="h2" className="section-heading mb-4">Let's Connect</TextReveal>
                    <p className="section-subtitle">Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact info — stagger from left */}
                    <StaggerContainer className="lg:col-span-2 space-y-4" stagger={0.1} delay={0.1}>
                        {contactLinks.map(({ href, icon, label, value, external }) => (
                            <StaggerItem key={label} direction="left">
                                <a
                                    href={href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    className="group glass-card p-4 flex items-center gap-4 hover:border-accent/20 dark:hover:border-accent/10 transition-all duration-300"
                                    id={`contact-${label.toLowerCase()}`}
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                        className="w-10 h-10 rounded-xl bg-accent/[0.08] dark:bg-accent/10 border border-accent/[0.15] flex items-center justify-center text-accent"
                                    >
                                        {icon}
                                    </motion.div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">{value}</p>
                                    </div>
                                    <motion.svg 
                                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                        className="text-gray-300 dark:text-gray-600 group-hover:text-accent transition-colors"
                                        whileHover={{ x: 4 }}
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </motion.svg>
                                </a>
                            </StaggerItem>
                        ))}

                        <StaggerItem direction="left">
                            <div className="glass-card p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] flex items-center justify-center text-gray-400">
                                    <MapPinIcon />
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{portfolioData.location}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>

                    {/* Contact form — reveal from right */}
                    <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
                        <div className="glass-card p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                                        { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                                    ].map(({ key, label, type, placeholder }) => (
                                        <div key={key} className="relative">
                                            <label className="block text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{label}</label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                                type={type}
                                                value={form[key]}
                                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                                onFocus={() => setFocused(key)}
                                                onBlur={() => setFocused(null)}
                                                placeholder={placeholder}
                                                required
                                                className={`w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-white/[0.03] border transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 ${
                                                    focused === key 
                                                        ? 'border-accent/50 ring-2 ring-accent/10 bg-white dark:bg-white/[0.05]' 
                                                        : 'border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.1]'
                                                }`}
                                                id={`contact-input-${key}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="relative">
                                    <label className="block text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.01 }}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Tell me about your project..."
                                        required
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-white/[0.03] border transition-all duration-300 outline-none resize-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 ${
                                            focused === 'message' 
                                                ? 'border-accent/50 ring-2 ring-accent/10 bg-white dark:bg-white/[0.05]' 
                                                : 'border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.1]'
                                        }`}
                                        id="contact-input-message"
                                    />
                                </div>

                                <MagneticWrap strength={0.1}>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-all duration-300 shadow-glow-sm hover:shadow-glow"
                                        id="contact-submit-btn"
                                    >
                                        <span>Send Message</span>
                                        <SendIcon />
                                    </button>
                                </MagneticWrap>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
