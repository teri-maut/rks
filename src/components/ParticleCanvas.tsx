"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
  pulsePhase: number;
  hue: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize 45 subtle particles
    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        baseAlpha: Math.random() * 0.4 + 0.15,
        alpha: 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15, // gently drift upwards
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.3 ? 43 : 38, // Warm gold hues
      });
    }

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Track scroll velocity
      const currentScrollY = window.scrollY;
      const rawVelocity = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = scrollVelocity * 0.9 + rawVelocity * 0.1;
      lastScrollY = currentScrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

        // Apply scroll-influenced drift
        p.x += p.speedX;
        p.y += p.speedY - scrollVelocity * 0.08;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 2.5
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${Math.max(0, p.alpha)})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 85%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        opacity: 0.75,
      }}
    />
  );
}
