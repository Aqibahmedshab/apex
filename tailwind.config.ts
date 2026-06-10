import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1340px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255,255,255,0.12)",
        background: "#050816",
        surface: "#0B1220",
        primary: "#7C3AED",
        secondary: "#06B6D4",
        accent: "#10B981",
        muted: "#94A3B8",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,58,237,0.2), 0 20px 60px rgba(5,8,22,0.45)",
        panel: "0 24px 80px rgba(3, 7, 18, 0.45)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
        aurora:
          "radial-gradient(circle at top left, rgba(124,58,237,0.35), transparent 42%), radial-gradient(circle at top right, rgba(6,182,212,0.22), transparent 38%), radial-gradient(circle at bottom, rgba(16,185,129,0.16), transparent 30%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(8px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(8px) rotate(-360deg)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
        orbit: "orbit 10s linear infinite",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

