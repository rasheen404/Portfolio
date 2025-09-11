import React, { useRef, useEffect } from 'react';

export const CustomCursor = () => {
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
            }
        };

        const handleMouseOver = (e) => {
            if (e.target.matches('a, button, input')) {
                cursorOutlineRef.current.classList.add('hovered');
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.matches('a, button, input')) {
                cursorOutlineRef.current.classList.remove('hovered');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 9999 }}>
            <div ref={cursorOutlineRef} className="cursor-outline"></div>
        </div>
    );
};

