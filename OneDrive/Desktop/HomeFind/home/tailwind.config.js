/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navColor:'#2F4F4F',
        logoColor:'#FF7F50',
        logoColors:'#FFFFF0',
      }
    },
  },
  plugins: [],
}

