/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {},
      colors: {
         text: "#100113",
         background: "#fcf0fe",
         "primary-button": "#84f86d",
         "secondary-button": "#ffffff",
         accent: "#32f40b",
         black: colors.black,
         white: colors.white,
         gray: colors.gray,
         emerald: colors.emerald,
         indigo: colors.indigo,
         yellow: colors.yellow,
         red: colors.red,
         slate: colors.slate,
      },
   },
   plugins: [],
};
