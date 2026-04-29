import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Ease toward 100 with variable speed
                const remaining = 100 - prev;
                const step = Math.max(1, remaining * 0.08);
                return Math.min(100, prev + step);
            });
        }, 30);

        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onLoaded(), 800);
        }, 1800);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [onLoaded]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 bg-dark-950 z-[200] flex flex-col items-center justify-center"
                >
                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-accent font-mono">R</span>
                        </div>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-px bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    {/* Progress text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-xs font-mono text-gray-500 tracking-widest uppercase"
                    >
                        Loading
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
