/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#E3EECD',
        'med-green': '#ACD1B6',
        'dark-green': '#408E61',
        'light-blue': '#71A596',
        'dark-blue': '#40676E'
      },
    },
  },
  plugins: []
}