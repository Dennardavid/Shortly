import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
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
