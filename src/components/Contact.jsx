import React, { useState } from "react";
import { portfolioData } from "../data.jsx";
import { motion } from 'framer-motion';

export const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [focused, setFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:${portfolioData.email}?subject=Portfolio Contact from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0A%0AMessage:%0A${form.message}`;
    };

    return (
        <section id="contact" className="py-32 relative z-10 bg-[#000000] min-h-screen flex items-center justify-center overflow-hidden">
            
            <div className="section-container w-full max-w-6xl mx-auto relative z-10 px-4">
                
                {/* The "Senior UI" Bento Card */}
                <div className="relative w-full rounded-[2.5rem] md:rounded-[4rem] bg-[#030303] border border-white/[0.05] p-2 md:p-4 shadow-2xl overflow-hidden group">
                    
                    {/* Confined Soft Glow inside the card */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3 transition-opacity duration-1000 group-hover:opacity-100" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 bg-black/40 rounded-[2rem] md:rounded-[3.5rem] border border-white/[0.02] p-8 md:p-16 lg:p-20 overflow-hidden backdrop-blur-xl">
                        
                        {/* Left Side: Brand and Info (Spans 2 cols) */}
                        <div className="lg:col-span-2 flex flex-col justify-between relative z-10">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-12 shadow-inner">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                    Let's start a <br/>
                                    <span className="text-gray-500">project together</span>
                                </h2>
                                <p className="text-base text-gray-400 font-light max-w-sm leading-relaxed mb-12">
                                    Fill out the form and I'll get back to you within 24 hours. Let's engineer something remarkable.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <a href={`mailto:${portfolioData.email}`} aria-label="Send email to Mohammed Rasheen" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group/link w-fit">
                                    <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover/link:border-accent/30 group-hover/link:bg-accent/10 transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg>
                                    </div>
                                    <span className="font-light">{portfolioData.email}</span>
                                </a>
                                <div className="flex gap-4">
                                    <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 hover:text-white hover:border-accent/30 hover:bg-accent/10 transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                                    </a>
                                    <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 hover:text-white hover:border-accent/30 hover:bg-accent/10 transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: The Premium Form (Spans 3 cols) */}
                        <div className="lg:col-span-3 mt-16 lg:mt-0 relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500 pl-1">Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            required
                                            placeholder="John Doe"
                                            className={`w-full px-5 py-4 rounded-xl bg-[#0A0A0A] border text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 ${focused === 'name' ? 'border-accent shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/[0.05] hover:border-white/[0.1]'}`}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500 pl-1">Email</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            required
                                            placeholder="john@example.com"
                                            className={`w-full px-5 py-4 rounded-xl bg-[#0A0A0A] border text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 ${focused === 'email' ? 'border-accent shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/[0.05] hover:border-white/[0.1]'}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 pl-1">Message</label>
                                    <textarea
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className={`w-full px-5 py-4 rounded-xl bg-[#0A0A0A] border text-sm text-white placeholder-gray-600 outline-none resize-none transition-all duration-300 ${focused === 'message' ? 'border-accent shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/[0.05] hover:border-white/[0.1]'}`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 mt-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                                
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
