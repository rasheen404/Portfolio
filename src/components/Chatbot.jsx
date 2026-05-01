import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data.jsx';
import { Send, X, Bot, User, Sparkles } from 'lucide-react';

export const Chatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'bot', content: `Hi! I'm Rasheen's AI assistant. Ask me anything about his skills, projects, or professional journey!` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const generateResponse = (query) => {
        const q = query.toLowerCase();
        
        if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
            const tools = portfolioData.skills["Tools & Technologies"].join(", ");
            return `Rasheen is an expert in ${tools}. He also works with tools like ${portfolioData.skills["Developer Tools"].join(", ")}.`;
        }
        
        if (q.includes('project') || q.includes('work') || q.includes('build')) {
            const projects = portfolioData.projects.map(p => p.name).join(", ");
            return `He has built several impressive projects including ${projects}. His latest is the ${portfolioData.projects[0].name}.`;
        }
        
        if (q.includes('experience') || q.includes('job') || q.includes('career')) {
            const current = portfolioData.journey.find(j => j.type === 'work');
            return `Rasheen is currently a ${current.title} at ${current.institution}. He started his professional journey around ${portfolioData.journey[portfolioData.journey.length-1].period}.`;
        }

        if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
            return `You can reach Rasheen at ${portfolioData.email} or connect with him on LinkedIn.`;
        }

        if (q.includes('who') || q.includes('about') || q.includes('rasheen')) {
            return portfolioData.summary;
        }

        if (q.includes('education') || q.includes('study') || q.includes('college')) {
            const edu = portfolioData.journey.filter(j => j.type === 'edu')[0];
            return `He completed his ${edu.title} at ${edu.institution}.`;
        }

        return "That's a great question! While I'm still learning, I can tell you that Rasheen is a highly skilled Java Full-Stack Engineer. Feel free to ask about his specific skills, projects, or experience!";
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const botResponse = { role: 'bot', content: generateResponse(input) };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    className="fixed bottom-24 right-6 md:right-8 z-[150] w-[90vw] md:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white tracking-tight uppercase">Rasheen AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Active Assistant</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar overscroll-contain"
                    >
                        {messages.map((msg, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i} 
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-accent text-black font-medium rounded-tr-none' 
                                    : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                                } shadow-xl`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <div className="relative flex items-center gap-2 bg-[#111111] border border-white/10 rounded-full px-4 py-2 focus-within:border-accent/50 transition-all">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about Rasheen..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2 placeholder:text-gray-600"
                            />
                            <button 
                                onClick={handleSend}
                                className={`p-2 rounded-full transition-all ${input.trim() ? 'bg-accent text-black scale-100' : 'bg-white/5 text-gray-700 scale-90'}`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
