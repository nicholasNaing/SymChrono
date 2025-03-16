/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "top-right-inset": "inset -2px 2px 10px rgba(0, 0, 0, 0.5)",
        "bottom-left-inset": "inset 2px -2px 10px rgba(0, 0, 0, 0.5)",
        inbox: "inset 0px 1px 5px",
      },

      textShadow: {
        custom: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Custom text shadow
      },
      fontFamily: {
        patrick: ['"Patrick Hand"', "cursive"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-custom": {
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
