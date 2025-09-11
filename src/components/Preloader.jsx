import React, { useEffect } from 'react';
import { portfolioData } from '../data.jsx';

export const Preloader = ({ onLoaded }) => {
    useEffect(() => {
        const timer = setTimeout(() => onLoaded(), 2000); // Simulate loading for 2 seconds
        return () => clearTimeout(timer);
    }, [onLoaded]);

    return (
        <div className="fixed inset-0 bg-[var(--dark-bg)] z-[100] flex justify-center items-center transition-opacity duration-500">
            <div className="text-4xl font-bold gradient-text animate-pulse">
                {portfolioData.name.split(' ').map(n => n[0]).join('')}
            </div>
        </div>
    );
};

