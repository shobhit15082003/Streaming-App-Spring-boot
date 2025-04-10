/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");
const flowbiteReact = require("flowbite-react/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Flowbite and Flowbite React content sources
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite-react/**/*.jsx",
    "./node_modules/flowbite-react/**/*.ts",
    "./node_modules/flowbite-react/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    flowbiteReact
  ],
  darkMode: 'class'
}