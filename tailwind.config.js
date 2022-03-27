module.exports = {
  theme: {
      extend: {
          colors: {
              'green-campus': '#066664',
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