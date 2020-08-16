const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      serif: ["Noto Serif", ...defaultTheme.fontFamily.serif],
      mono: ["Inconsolata", ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
