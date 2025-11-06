import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          900: "#0f172a",
        },
        blue: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        purple: {
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        emerald: {
          50: "#ecfdf5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        amber: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        red: {
          50: "#fef2f2",
          700: "#b91c1c",
        },
        green: {
          500: "#22c55e",
        },
        orange: {
          500: "#f97316",
        },
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
