import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#D4764E",
          "orange-light": "#E08B66",
          "orange-dark": "#B8603A",
          teal: "#82C0C7",
          "teal-light": "#9DD1D7",
          "teal-dark": "#5FA8B0",
        },
        surface: {
          warm: "#FAF7F4",
          white: "#FFFFFF",
          cream: "#F5F0EB",
          dark: "#2A2520",
        },
        text: {
          primary: "#333333",
          body: "#666666",
          muted: "#999999",
          light: "#BBBBBB",
        },
      },
      fontFamily: {
        serif: ["var(--font-castoro)", "Georgia", "serif"],
        sans: ["var(--font-open-sans)", "Arial", "sans-serif"],
      },
      animation: {
        scan: "scan 2.8s ease-in-out infinite",
        "scan-fast": "scan 1.4s linear infinite",
        "pulse-ring": "pulseRing 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(900%)", opacity: "0" },
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,118,78,0)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212,118,78,0.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
