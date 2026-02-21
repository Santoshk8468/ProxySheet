import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#f8fafc",
          alt: "#f1f5f9",
        },
        card: {
          DEFAULT: "#ffffff",
          alt: "#f8fafc",
        },
        accent: {
          DEFAULT: "#4f46e5",
          soft: "rgba(79, 70, 229, 0.1)",
          strong: "#4338ca",
        },
        "text-main": "#1e293b",
        "text-muted": "#475569",
        "text-soft": "#64748b",
        danger: "#dc2626",
        success: "#16a34a",
        border: {
          subtle: "rgba(148, 163, 184, 0.4)",
          accent: "rgba(79, 70, 229, 0.5)",
        },
      },
      borderRadius: {
        lg: "18px",
        md: "12px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        subtle: "0 2px 12px rgba(0, 0, 0, 0.06)",
        card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 40px rgba(0, 0, 0, 0.12)",
        "btn-primary": "0 4px 14px rgba(79, 70, 229, 0.4)",
        "btn-primary-hover": "0 6px 20px rgba(79, 70, 229, 0.5)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "Menlo",
          "Monaco",
          "SF Mono",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-down": "slideDown 0.25s ease-out",
        spin: "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      maxWidth: {
        container: "1120px",
      },
    },
  },
  plugins: [],
} satisfies Config;
