import React from 'react';

export const GlobalStyles = () => (
    <style>{`
        [data-theme='light'] {
            --dark-bg: #f9fafb;
            --mid-bg: #ffffff;
            --light-bg: #f3f4f6;
            --border-color: #e5e7eb;
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --accent-glow: #0ea5e9;
            --glass-bg: rgba(255, 255, 255, 0.6);
            --glass-border: #e5e7eb;
            --gradient-start: #0ea5e9;
            --gradient-end: #22d3ee;
            --cursor-color: #0ea5e9;
            --blob-color-1: rgba(14, 165, 233, 0.3);
            --blob-color-2: rgba(34, 211, 238, 0.3);
            --blob-color-3: rgba(59, 130, 246, 0.3);
            --bg-pattern-color: rgba(0, 0, 0, 0.04);
        }

        [data-theme='dark'] {
            --dark-bg: #0d1117; /* GitHub Dark */
            --mid-bg: #161b22;
            --light-bg: #21262d;
            --border-color: #30363d;
            --text-primary: #c9d1d9;
            --text-secondary: #8b949e;
            --accent-glow: #a78bfa;
            --glass-bg: rgba(22, 27, 34, 0.5);
            --glass-border: #30363d;
            --gradient-start: #a78bfa;
            --gradient-end: #f472b6;
            --cursor-color: #a78bfa;
            --blob-color-1: rgba(167, 139, 250, 0.2);
            --blob-color-2: rgba(244, 114, 182, 0.2);
            --blob-color-3: rgba(192, 132, 252, 0.2);
            --bg-pattern-color: rgba(255, 255, 255, 0.03);
        }

        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            transition: background-color 0.5s ease, color 0.5s ease;
            cursor: none;
            background-image: radial-gradient(var(--bg-pattern-color) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        body.modal-open {
            overflow: hidden;
        }

        html[data-theme='light'] body {
            background-color: var(--dark-bg);
            color: var(--text-primary);
        }
        
        html[data-theme='dark'] body {
            background-color: var(--dark-bg);
            color: var(--text-primary);
        }
        
        a, button, input {
            cursor: none;
        }
        
        .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--glass-border);
            transition: all 0.3s ease;
            transform-style: preserve-3d;
            transform: perspective(1000px);
        }

        .glass-effect:hover {
            border-color: var(--accent-glow);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transform: perspective(1000px) translateY(-5px) rotateX(5deg) scale(1.02);
        }
        
        .gradient-text {
            background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end), var(--gradient-start));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradient-shine 5s linear infinite;
        }

        @keyframes gradient-shine {
            to {
                background-position: 200% center;
            }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
            transition: opacity 1s cubic-bezier(0.645, 0.045, 0.355, 1), transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .reveal.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        .typing-cursor {
            display: inline-block;
            width: 8px;
            height: 1.7rem;
            background-color: var(--accent-glow);
            animation: blink 1s infinite;
            margin-left: 4px;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid var(--cursor-color);
            border-radius: 50%;
            transform: translate(-16px, -16px);
            opacity: 0.5;
            transition: all 0.2s ease;
        }
        
        .cursor-outline.hovered {
            width: 60px;
            height: 60px;
            transform: translate(-26px, -26px);
            opacity: 0.2;
        }

        .theme-toggle-icon {
            transition: transform 0.5s cubic-bezier(0.45, 0, 0.55, 1), opacity 0.5s ease;
            position: absolute;
        }
        
        .timeline-marker.visible {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(167, 139, 250, 0); }
            100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0); }
        }
    `}</style>
);

