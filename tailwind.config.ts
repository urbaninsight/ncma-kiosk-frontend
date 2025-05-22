import type { Config } from "tailwindcss";

import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-case)", "sans-serif"],
      },
      screens: {
        cloverSm: "768px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ncmaOrange: "rgb(224, 89, 42)",
        ncmaDarkOrange: "rgb(61, 17, 13)",
      },
    },
  },
  plugins: [tailwindScrollbar],
} satisfies Config;
