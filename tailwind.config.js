/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#421C54',
        search: ''
      },
      fontFamily: {
        cursive: ['Cursive'],
        roboto: ['Roboto']
      }
    },
  },
  plugins: [],
}

