/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
         colors: {
        primary: "#312b2b",
        secondary: "#473e3e",
        accent: "#5a4f4f",
        text: "#f7f6f5",
        background: "#0a0400",
        cardBg: "#1a1a1a",
        hover: "#3d3636",
      }
      },
    },
    plugins: [],
  }

  
  