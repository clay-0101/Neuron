/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#e8e6e3",
        muted: "#a1a1a1",
        brand: "#e8e6e3",
        canvas: "#121212",
        surface: "#1e1e1e",
      },
      boxShadow: {
        card: "0 24px 80px rgba(28, 32, 54, 0.08)",
      },
    },
  },
  plugins: [],
};
