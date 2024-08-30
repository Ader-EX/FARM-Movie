/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-black": "#121212",
        "secondary-black": "#1E1E1E",
        "border-black": "#2B2B2B",
        "primary-blue": "#17A4C0",
      },
    },
  },
  plugins: [],
};
