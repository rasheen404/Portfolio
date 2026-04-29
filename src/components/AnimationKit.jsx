import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

// ──────────────────────────────────────────────
// 1. TEXT REVEAL — word-by-word mask reveal on scroll
// ──────────────────────────────────────────────
export const TextReveal = ({ children, className = '', as: Tag = 'p', once = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-10%" });
    const words = typeof children === 'string' ? children.split(' ') : [children];

    return (
        <Tag ref={ref} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden mr-[0.3em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.04,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

// ──────────────────────────────────────────────
// 2. CHARACTER REVEAL — letter-by-letter stagger
// ──────────────────────────────────────────────
export const CharReveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });
    const chars = typeof children === 'string' ? children.split('') : [];

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.025,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                    style={{ transformOrigin: 'bottom' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

// ──────────────────────────────────────────────
// 3. MAGNETIC WRAP — element attracted toward cursor
// ──────────────────────────────────────────────
export const MagneticWrap = ({ children, strength = 0.3, className = '' }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// 4. TILT CARD — 3D perspective tilt on hover
// ──────────────────────────────────────────────
export const TiltCard = ({ children, className = '', tiltAmount = 8 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setPosition({ x, y });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setPosition({ x: 0, y: 0 }); }}
            animate={{
                rotateX: isHovered ? position.y * -tiltAmount : 0,
                rotateY: isHovered ? position.x * tiltAmount : 0,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
            className={className}
        >
            {/* Spotlight glow following cursor */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 z-10"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${(position.x + 0.5) * 100}% ${(position.y + 0.5) * 100}%, rgba(99,102,241,0.06), transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// 5. SCROLL REVEAL — cinematic entrance with variants
// ──────────────────────────────────────────────
const revealVariants = {
    up: { hidden: { opacity: 0, y: 80 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -80 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
    rotate: { hidden: { opacity: 0, rotate: -5, y: 40 }, visible: { opacity: 1, rotate: 0, y: 0 } },
    blur: { hidden: { opacity: 0, filter: 'blur(10px)', y: 30 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
};

export const ScrollReveal = ({ 
    children, 
    direction = 'up', 
    delay = 0, 
    duration = 0.8, 
    className = '', 
    once = true,
    amount = 0.2 
}) => {
    const variant = revealVariants[direction] || revealVariants.up;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={{
                hidden: variant.hidden,
                visible: {
                    ...variant.visible,
                    transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// 6. STAGGER CONTAINER — orchestrated children reveals
// ──────────────────────────────────────────────
export const StaggerContainer = ({ children, className = '', stagger = 0.08, delay = 0 }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = '', direction = 'up' }) => {
    const variant = revealVariants[direction] || revealVariants.up;
    return (
        <motion.div
            variants={{
                hidden: variant.hidden,
                visible: { ...variant.visible, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// 7. PARALLAX TEXT MARQUEE — scroll-velocity text
// ──────────────────────────────────────────────
const wrap = (min, max, v) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

export const ParallaxMarquee = ({ children, baseVelocity = 5, className = '' }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) directionFactor.current = -1;
        else if (velocityFactor.get() > 0) directionFactor.current = 1;
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div className="inline-flex gap-8" style={{ x }}>
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="inline-block">{children}</span>
                ))}
            </motion.div>
        </div>
    );
};

// ──────────────────────────────────────────────
// 8. PARALLAX SECTION — depth-based scroll offset
// ──────────────────────────────────────────────
export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y: smoothY }}>
                {children}
            </motion.div>
        </div>
    );
};

// ──────────────────────────────────────────────
// 9. SECTION DIVIDER — animated line between sections
// ──────────────────────────────────────────────
export const SectionDivider = ({ className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <div ref={ref} className={`section-container ${className}`}>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/[0.06] to-transparent origin-left"
            />
        </div>
    );
};

// ──────────────────────────────────────────────
// 10. COUNTER — animated number count-up
// ──────────────────────────────────────────────
export const Counter = ({ from = 0, to, duration = 2, suffix = '', className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(from);

    useEffect(() => {
        if (!isInView) return;
        let start = from;
        const end = to;
        const range = end - start;
        const startTime = performance.now();
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + range * eased));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, from, to, duration]);

    return <span ref={ref} className={className}>{count}{suffix}</span>;
};

// ──────────────────────────────────────────────
// 11. SCROLL PROGRESS — section-level scroll track
// ──────────────────────────────────────────────
export const ScrollProgress = ({ className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    return (
        <div ref={ref} className={`absolute left-0 top-0 bottom-0 ${className}`}>
            <motion.div
                className="w-[2px] bg-accent origin-top"
                style={{ scaleY: scrollYProgress, height: '100%' }}
            />
        </div>
    );
};
