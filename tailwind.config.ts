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
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7c1c1c",
          secondary: "#f6d860",
          accent: "#3d84a8",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
} satisfies Config;
