/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main' : '#1B8354'
      }
    },
    container:{
      padding : '8px',
      margin : '20px',
      center : true,
    }
  },
  plugins: [],
  darkMode : 'class'
}