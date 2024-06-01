/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monofett: ['Monofett', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },

      colors:{
        primary: "#2885FF",
        secondary: "#EF863E",
      },
    },
  },
  plugins: [],
}
