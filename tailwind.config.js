module.exports = {
  theme: {
      extend: {
          colors: {
              'green-campus': '#066664',
              'grey-text' : '#8D8D8D',
          },
      }
  },
  plugins: [],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ]
}