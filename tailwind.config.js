/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        paper: "#F8F5F0",
        ink: "#2C2824",
        cocoa: "#3A332C",
        clay: "#C36B47",
        clayDark: "#9C5135",
        sage: "#899174"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "Arial", "sans-serif"],
        script: ["Allura", "cursive"]
      },
      boxShadow: {
        soft: "0 22px 60px rgba(58, 51, 44, 0.12)",
        card: "0 12px 30px rgba(58, 51, 44, 0.08)"
      }
    }
  },
  plugins: []
};
