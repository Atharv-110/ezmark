/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#212529",
        "primary-white": "#F5F7F8",
        "gray-light": "#D0D5D9",
        "gray-dark": "#6C757D",
        "gray-darker": "#495057",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
