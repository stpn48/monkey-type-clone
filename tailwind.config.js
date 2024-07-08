/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "satoshi": ["Sathoshi Variable", "Arial"],
        "roboto-mono": ["Roboto Mono", "Arial"],
        "SF-pro": ["SF pro", "Arial"]
      },
      spacing: {
        '26': '6.5rem', // Example value, adjust as needed
      },
    },
  },
  plugins: [],
}