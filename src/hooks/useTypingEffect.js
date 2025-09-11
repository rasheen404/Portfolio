import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 100) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return displayedText;
};

