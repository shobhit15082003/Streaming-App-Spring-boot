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
      colors: {
        'deep-blue': '#081c3b', // A nice dark blue background
        'electric-blue': '#0abde3',  // Bright neon blue for buttons and accents
        'neon-green': '#00e676',   // Neon green for action highlights
        'charcoal': '#333333',     // Dark gray for a modern look
        'light-pink': '#f8a5c2',   // Soft contrasting pink
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #081c3b 0%, #0abde3 100%)', // New gradient background
      },
      boxShadow: {
        "electric-glow": "0 0 15px rgba(10, 189, 227, 0.7), 0 0 30px rgba(10, 189, 227, 0.4)", // Glow effect
      },
      animation: {
        pop: "pop 0.4s ease-out",
        pulse: "pulse 2s infinite",
        fade: "fade 1.2s ease-in-out",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [flowbite, flowbiteReact],
  darkMode: "class",
};
