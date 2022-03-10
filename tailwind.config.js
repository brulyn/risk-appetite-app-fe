module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          "cvl-50": "#e6ebf0",
          "cvl-100": "#cdd7e0",
          "cvl-200": "#b4c2d1",
          "cvl-300": "#9baec2",
          "cvl-400": "#829ab3",
          "cvl-500": "#6986a3",
          "cvl-600": "#507294",
          "cvl-700": "#375d85",
          "cvl-800": "#1e4975",
          "cvl-900": "#053566",
        },
      },
      fontFamily: {
        body: ["Work Sans", "Raleway"],
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ["hover", "focus"],
    },
  },
  plugins: [],
};
