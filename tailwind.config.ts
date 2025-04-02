import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "yellow2025": "#edbc5c",
        "orange2025": "#ea5d51",
        "paleyellow2025" : "#fff1ae",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#edbc5c",
          secondary: "#2191DE",
          accent: "#3d84a8",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      // "dark",
      "cupcake",
    ],
  },
} satisfies Config;
