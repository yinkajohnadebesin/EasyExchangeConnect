const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      perspective: {
        1000: '1000px',
      },
      transformOrigin: {
        'center': 'center',
      },
      transformStyle: {
        preserve: 'preserve-3d',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
