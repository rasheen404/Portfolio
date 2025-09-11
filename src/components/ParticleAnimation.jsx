import React, { useRef, useEffect } from 'react';

export const ParticleAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        let particlesArray = [];
        const numberOfParticles = 80;

        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                const accentColor = getComputedStyle(canvas).getPropertyValue('--accent-glow').trim();
                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 1.5 + 0.5;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let speedX = (Math.random() * 0.4) - 0.2;
                let speedY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, size, speedX, speedY));
            }
        }

        function connect() {
            let opacityValue = 1;
            const accentColor = getComputedStyle(canvas).getPropertyValue('--accent-glow').trim();
            // Helper to parse color, works for hex and rgb
            const parseColor = (color) => {
                if (color.startsWith('#')) {
                    return `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`;
                }
                return color.replace(/[^\d,]/g, '');
            };
            const rgb = parseColor(accentColor);


            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                 ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(${rgb}, ${opacityValue})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        }
        
        init();
        animate();
        
        const handleResize = () => {
             canvas.width = canvas.offsetWidth;
             canvas.height = canvas.offsetHeight;
             init();
        }
        
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50"></canvas>;
};

