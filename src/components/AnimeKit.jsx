import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export const Anime3DReveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    
                    anime({
                        targets: ref.current,
                        translateY: [150, 0],
                        translateZ: [-200, 0],
                        rotateX: [30, 0],
                        opacity: [0, 1],
                        duration: 1600,
                        delay: delay,
                        easing: 'easeOutElastic(1, .8)',
                    });
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={className} style={{ opacity: 0, perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

export const AnimeStaggerList = ({ children, className = '', staggerDelay = 100 }) => {
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    
                    const childrenNodes = ref.current.children;
                    anime({
                        targets: childrenNodes,
                        translateY: [50, 0],
                        translateZ: [-50, 0],
                        opacity: [0, 1],
                        duration: 1200,
                        delay: anime.stagger(staggerDelay),
                        easing: 'easeOutExpo',
                    });
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [staggerDelay]);

    return (
        <div ref={ref} className={className} style={{ perspective: '1000px' }}>
            {React.Children.map(children, child => 
                React.cloneElement(child, { style: { ...child.props.style, opacity: 0 } })
            )}
        </div>
    );
};

export const AnimeScrollProgress = () => {
    const progressRef = useRef(null);

    useEffect(() => {
        const updateProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            
            if (progressRef.current) {
                progressRef.current.style.height = `${scrolled}%`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed left-0 top-0 w-1 h-full bg-white/[0.02] z-[999] pointer-events-none hidden md:block">
            <div 
                ref={progressRef} 
                className="w-full bg-accent/50 shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-all duration-75"
                style={{ height: '0%' }}
            />
        </div>
    );
};
