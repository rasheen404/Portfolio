import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data.jsx';
import { Home, Code2, Briefcase, Layers, Mail, Download } from 'lucide-react';

export const Header = () => {
    const navLinks = [
        { id: "about", label: "about", icon: Home },
        { id: "skills", label: "skills", icon: Code2 },
        { id: "projects", label: "projects", icon: Layers },
        { id: "experience", label: "experience", icon: Briefcase },
        { id: "contact", label: "contact", icon: Mail },
    ];
    const [hovered, setHovered] = useState(null);
    const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

    const handleDownload = async (e) => {
        e.preventDefault();
        if (downloadState === 'loading') return;
        
        setDownloadState('loading');
        
        try {
            const response = await fetch(portfolioData.cv_url);
            if (!response.ok) throw new Error("Download failed");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "Mohammed_Rasheen_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            setDownloadState('success');
        } catch (error) {
            console.error(error);
            setDownloadState('error');
        } finally {
            setTimeout(() => setDownloadState('idle'), 3000);
        }
    };

    return (
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto w-[90%] md:w-auto"
        >
            <div className="flex items-center justify-between md:justify-center gap-1 md:gap-2 px-2 py-2 rounded-full bg-[#050505]/80 border border-white/10 backdrop-blur-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]">
                
                {/* Desktop & Mobile Combined Nav */}
                <nav className="flex items-center gap-1 md:gap-1" onMouseLeave={() => setHovered(null)}>
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a 
                                key={link.id} 
                                href={`#${link.id}`}
                                onMouseEnter={() => setHovered(link.id)}
                                aria-label={`Navigate to ${link.label} section`}
                                className="relative p-3 md:px-5 md:py-2.5 text-gray-400 hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center group"
                            >
                                <span className="relative z-10 hidden md:block text-xs font-mono font-medium uppercase tracking-widest">{link.label}</span>
                                <span className="relative z-10 md:hidden"><Icon size={18} /></span>
                                
                                {hovered === link.id && (
                                    <motion.div
                                        layoutId="navHover"
                                        className="absolute inset-0 bg-white/10 rounded-full z-0 hidden md:block"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                    
                    <div className="w-px h-6 bg-white/20 mx-1 md:mx-2" />
                    
                    <button 
                        onClick={handleDownload}
                        className={`flex items-center justify-center gap-2 p-3 md:px-6 md:py-2.5 ml-1 rounded-full transition-all duration-500 overflow-hidden relative
                            ${downloadState === 'idle' ? 'bg-accent text-black hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}
                            ${downloadState === 'loading' ? 'bg-white/20 text-white cursor-wait w-[42px] md:w-[150px]' : ''}
                            ${downloadState === 'success' ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]' : ''}
                            ${downloadState === 'error' ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' : ''}
                        `}
                    >
                        {downloadState === 'idle' && (
                            <>
                                <span className="hidden md:block text-xs font-bold font-mono tracking-widest">DOWNLOAD CV</span>
                                <Download size={18} className="md:hidden" />
                                <svg className="hidden md:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </>
                        )}
                        {downloadState === 'loading' && (
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        )}
                        {downloadState === 'success' && (
                            <>
                                <span className="hidden md:block text-xs font-bold font-mono tracking-widest">DOWNLOADED</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                            </>
                        )}
                        {downloadState === 'error' && (
                            <>
                                <span className="hidden md:block text-xs font-bold font-mono tracking-widest">FAILED</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </>
                        )}
                    </button>
                </nav>
            </div>
        </motion.div>
    );
};
