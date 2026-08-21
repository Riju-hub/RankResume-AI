/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f19",
        surface: {
          DEFAULT: "#111827",
          hover: "#1e293b",
          border: "rgba(148, 163, 184, 0.12)",
        },
        brand: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};