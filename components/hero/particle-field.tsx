"use client";

import { useEffect, useRef } from "react";

/**
 * Hero particle field per /docs/mirror-website-build-brief.md §4.2.3.
 *
 * Desktop: 80 to 120 particles, 30fps cap, cursor repulsion within 120px.
 * Mobile: 40 particles, 24fps cap, no cursor interaction.
 * prefers-reduced-motion: static field, no movement, no cursor interaction.
 *
 * Particles are 2px Signal dots drifting at 0.2 to 0.4 px/frame. Particles
 * within 80px are connected by 1px Signal lines, opacity scaled inverse to
 * distance, capped at 30%. Cursor (when present) acts as an invisible
 * repelling particle within a 120px radius using a soft easing.
 *
 * The 60% Void overlay sits between this canvas and the typography in
 * HeroSection, so the canvas does not need to manage type legibility.
 */

const SIGNAL = "#00FF9D";
const CONNECT_DISTANCE = 80;
const CONNECT_DISTANCE_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE;
const REPEL_RADIUS = 120;
const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
const REPEL_STRENGTH = 0.6;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = rand(0.2, 0.4);
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };
  });
}

interface HeroParticleFieldProps {
  /** Particle count overrides. Defaults: 100 desktop, 40 mobile. */
  count?: { desktop: number; mobile: number };
  /** Whether the cursor repels nearby particles. Defaults to true. */
  cursor?: boolean;
}

export function HeroParticleField({
  count = { desktop: 100, mobile: 40 },
  cursor = true,
}: HeroParticleFieldProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = coarse || window.innerWidth < 640;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const targetCount = isMobile ? count.mobile : count.desktop;
    const particles = makeParticles(targetCount, width, height);

    // Cursor tracked in module ref to avoid re-renders. Bind to window so
    // events pass through any pointer-events-none layers above the canvas;
    // the canvas-local bounds check determines whether the cursor is active.
    const cursor = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        cursor.active = false;
        cursor.x = -9999;
        cursor.y = -9999;
        return;
      }
      cursor.x = x;
      cursor.y = y;
      cursor.active = true;
    };
    if (cursor && !reduced && !coarse) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let lastFrame = 0;
    const targetFps = isMobile ? 24 : 30;
    const frameInterval = 1000 / targetFps;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connections.
      ctx.strokeStyle = SIGNAL;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DISTANCE_SQ) {
            const opacity =
              0.3 * (1 - Math.sqrt(distSq) / CONNECT_DISTANCE);
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles.
      ctx.globalAlpha = 1;
      ctx.fillStyle = SIGNAL;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges.
          if (p.x < -2) p.x = width + 2;
          else if (p.x > width + 2) p.x = -2;
          if (p.y < -2) p.y = height + 2;
          else if (p.y > height + 2) p.y = -2;

          // Cursor repulsion.
          if (cursor.active) {
            const dx = p.x - cursor.x;
            const dy = p.y - cursor.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < REPEL_RADIUS_SQ && distSq > 0.1) {
              const dist = Math.sqrt(distSq);
              const t = 1 - dist / REPEL_RADIUS;
              const ease = t * t;
              p.x += (dx / dist) * ease * REPEL_STRENGTH;
              p.y += (dy / dist) * ease * REPEL_STRENGTH;
            }
          }
        }
      }

      draw();
    };

    if (reduced) {
      // Single static frame.
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
    // Props are captured by reference at mount; consumers (HeroSection,
    // not-found) pass static config so re-running on prop change is not
    // needed for v1.
  }, [count.desktop, count.mobile, cursor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full pointer-events-none"
    />
  );
}
