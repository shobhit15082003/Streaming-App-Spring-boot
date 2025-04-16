/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");
const flowbiteReact = require("flowbite-react/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite-react/**/*.jsx",
    "./node_modules/flowbite-react/**/*.ts",
    "./node_modules/flowbite-react/**/*.tsx",
  ],
  theme: {
    extend: {
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(34,211,238,0.5)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.5)",
      },
      animation: {
        blob: "blob 7s infinite",
        fade: "fade 2s ease-in-out",
        slide: "slide 1s ease-in-out",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slide: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [flowbite, flowbiteReact],
  darkMode: "class",
};
