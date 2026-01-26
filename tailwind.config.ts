import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoomInOut: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(1.25)",
            opacity: "1",
          },
        },
      },
      animation: {
        "zoom-slow": "zoomInOut 6s ease-in-out infinite",
        "zoom-slower": "zoomInOut 9s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
