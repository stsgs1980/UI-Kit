import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind v4 — most config now lives in CSS via @theme inline.
 * This file is minimal: only what can't be expressed in CSS.
 *
 * IMPORTANT: Do NOT wrap CSS var references in hsl().
 * Theme CSS files (champagne.css etc.) set hex values directly,
 * and @theme inline in globals.css maps them via var().
 * Using hsl() here would conflict with the v4 CSS pipeline.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
