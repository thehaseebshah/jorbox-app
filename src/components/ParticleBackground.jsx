import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', resizeCanvas);

        // Track mouse position
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.x;
            mouseRef.current.y = e.y;
        };
        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Slightly larger
                this.speedX = (Math.random() * 1 - 0.5) * 0.5; // Slower base speed
                this.speedY = (Math.random() * 1 - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            update(mouse) {
                // Standard movement
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction (Physics-like repulsion/attraction)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;

                    // Max distance to interact
                    const maxDistance = 150;
                    let force = (maxDistance - distance) / maxDistance;

                    // If close to mouse, move away (repulsion)
                    if (distance < maxDistance) {
                        this.speedX -= forceDirectionX * force * 0.5; // Push away force
                        this.speedY -= forceDirectionY * force * 0.5;
                    }
                }

                // Friction to return to normal speed so they don't accelerate forever
                // Actually, let's just damp the speed if it gets too high, or let them drift.
                // Simple physics: Wrap around screen
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000); // More particles
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = dx * dx + dy * dy;

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.2})`; // Cyan lines
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear interaction trail

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouseRef.current);
                particles[i].draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.8
            }}
        />
    );
};

export default ParticleBackground;
