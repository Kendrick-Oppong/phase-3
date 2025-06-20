/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4ff",
          100: "#d9e5ff",
          200: "#bcd2ff",
          300: "#8eb6ff",
          400: "#598eff",
          500: "#3366ff",
          600: "#1b43f5",
          700: "#142fe1",
          800: "#1727b6",
          900: "#19288f",
          950: "#141a57",
        },
        green: {
          50: "#f3faf3",
          100: "#e3f5e3",
          200: "#c8eac9",
          300: "#9dd89f",
          400: "#66bb6a",
          500: "#46a14b",
          600: "#358439",
          700: "#2d6830",
          800: "#28532a",
          900: "#224525",
          950: "#0e2511",
        },
        red: {
          50: "#fef2f2",
          100: "#fee3e2",
          200: "#fecbca",
          300: "#fba8a6",
          400: "#f77572",
          500: "#ef5350",
          600: "#db2a27",
          700: "#b8201d",
          800: "#981e1c",
          900: "#7e201e",
          950: "#450b0a",
        },
        amber: {
          50: "#fffbeb",
          100: "#fff4c6",
          200: "#ffe688",
          300: "#ffd54f",
          400: "#ffc020",
          500: "#f99e07",
          600: "#dd7602",
          700: "#b75206",
          800: "#943e0c",
          900: "#7a350d",
          950: "#461a02",
        },
        grey: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#424242",
          900: "#3d3d3d",
          950: "#262626",
        },
        "base-white": {
          50: "#f6fbff",
          100: "#e0f1fe",
          200: "#bae3fd",
          300: "#7dcdfc",
          400: "#38b4f8",
          500: "#0e9be9",
          600: "#027bc7",
          700: "#0362a1",
          800: "#075385",
          900: "#0c466e",
          950: "#082c49",
        },
        "base-dark": {
          50: "#f6f7f9",
          100: "#edeef1",
          200: "#d6dae1",
          300: "#b2bac7",
          400: "#8895a8",
          500: "#6a798d",
          600: "#546175",
          700: "#454f5f",
          800: "#3c4450",
          900: "#353b45",
          950: "#282c34",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
