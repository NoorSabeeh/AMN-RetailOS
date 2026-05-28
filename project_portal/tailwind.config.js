/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060a12",
          900: "#0b1220",
          850: "#101827",
          800: "#172033",
          700: "#243047"
        },
        amn: {
          cyan: "#20d6c7",
          blue: "#5da8ff",
          gold: "#f2c94c"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};
