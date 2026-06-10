"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "6%", top: "10%", size: 6, duration: 8, delay: 0 },
  { left: "14%", top: "28%", size: 4, duration: 9, delay: 0.4 },
  { left: "24%", top: "12%", size: 5, duration: 11, delay: 0.8 },
  { left: "39%", top: "18%", size: 7, duration: 8.5, delay: 0.2 },
  { left: "53%", top: "12%", size: 4, duration: 10.5, delay: 0.6 },
  { left: "66%", top: "24%", size: 6, duration: 12, delay: 0.5 },
  { left: "76%", top: "8%", size: 5, duration: 10, delay: 0.9 },
  { left: "90%", top: "18%", size: 7, duration: 8.8, delay: 0.7 },
  { left: "10%", top: "58%", size: 5, duration: 12, delay: 0.3 },
  { left: "21%", top: "73%", size: 6, duration: 10.2, delay: 0.4 },
  { left: "37%", top: "61%", size: 4, duration: 9.2, delay: 0.7 },
  { left: "48%", top: "81%", size: 6, duration: 11.5, delay: 0.6 },
  { left: "59%", top: "70%", size: 5, duration: 8.3, delay: 0.2 },
  { left: "69%", top: "63%", size: 7, duration: 10.6, delay: 0.8 },
  { left: "84%", top: "76%", size: 4, duration: 11.8, delay: 0.5 },
  { left: "94%", top: "58%", size: 6, duration: 9.4, delay: 0.1 },
];

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-white/50 shadow-[0_0_24px_rgba(6,182,212,0.35)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

