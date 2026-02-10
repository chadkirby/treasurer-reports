/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can extend with our CSS variables if we want to use utility classes for them
        // But for now, just let standard utilities work for layout
      },
      fontFamily: {
        serif: ['"et-book"', 'Palatino', '"Palatino Linotype"', '"Palatino LT STD"', '"Book Antiqua"', 'Georgia', 'serif'],
        sans: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', 'sans-serif'],
        mono: ['"Consolas"', '"Monaco"', '"Andale Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
