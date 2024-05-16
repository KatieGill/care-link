/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lBlack: ["Lato-black", "sans-serif"],
        lBlackItalic: ["Lato-BlackItalic", "sans-serif"],
        lBold: ["Lato-Bold", "sans-serif"],
        lBoldItalic: ["Lato-BoldItalic", "sans-serif"],
        lItalic: ["Lato-Italic", "sans-serif"],
        lLight: ["Lato-Light", "sans-serif"],
        lLightItalic: ["Lato-LightItalic", "sans-serif"],
        lRegular: ["Lato-Regular", "sans-serif"],
        lThin: ["Lato-Thin", "sans-serif"],
        lThinItalic: ["Lato-ThinItalic", "sans-serif"],
      }
    },
  },
  plugins: [],
}

