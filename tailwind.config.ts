import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    /*   screens: {
        sm: { max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
        "2xl": { min: "1536px" },
      }, */
      colors: {
        cyan: "hsl(180, 66%, 49%)",
        Cyanhover: "hsl(180, 75%, 60%)",
        DarkViolet: "hsl(257, 27%, 26%)",
        LightViolet: "hsl(256, 26%, 33%)",
        Red: "hsl(0, 87%, 67%)",
        Gray: "hsl(0, 0%, 95%)",
        GrayishViolet: "hsl(257, 7%, 63%)",
        VeryDarkBlue: "hsl(255, 11%, 22%)",
        VeryDarkViolet: "hsl(260, 8%, 14%)",
      },
    },
  },
  plugins: [],
};
export default config;
