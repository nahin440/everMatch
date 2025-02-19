/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
,
theme: {
  extend: {
    animation: {
      zoom: "zoom 10s infinite linear", // Slow zoom effect
    },
    keyframes: {
      zoom: {
        "0%, 100%": { transform: "scale(1)" }, // Initial and final state
        "50%": { transform: "scale(1.1)" }, // Slight zoom in the middle
      },
    },
  },
},
  plugins: [],
}

