/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // <- esto hace que detecte tus componentes en src
  ],
 theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────────────────────────
      fontFamily: {
        sans:  ["var(--font-inter)",          "Inter",          "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk",  "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
 
      // ── Design tokens ──────────────────────────────────────────────────────
      colors: {
        obd: {
          // Backgrounds
          base:   "#F8F8F6",   // page background
          white:  "#FFFFFF",   // card background
          subtle: "#F0F0EE",   // dividers / subtle bg
 
          // Text
          ink:    "#0F0F0F",   // primary text
          muted:  "#6B6B6B",   // secondary text
          ghost:  "#9B9B96",   // placeholder / labels
          faint:  "#C4C4BE",   // disabled / decorative
 
          // Borders
          line:   "#E4E4E0",   // default border
 
          // Accent — check engine orange
          fire:   "#FF3B00",
          "fire-hover": "#E03000",
          "fire-bg":    "#FFF1EE",
          "fire-border":"#FFD5CC",
 
          // Severity
          warn:   "#F59E0B",
          "warn-bg":    "#FFFBEB",
          "warn-border":"#FDE68A",
          "warn-deep":  "#78350F",
 
          ok:     "#10B981",
          "ok-bg":"#ECFDF5",
        },
      },
 
      // ── Letter spacing ─────────────────────────────────────────────────────
      letterSpacing: {
        "mono-sm": "0.5px",
        "mono-md": "1px",
        "mono-lg": "1.5px",
        "mono-xl": "2px",
      },
 
      // ── Border radius ──────────────────────────────────────────────────────
      borderRadius: {
        card: "10px",
        chip: "8px",
      },
    },
  },
  plugins: [],
};
 
