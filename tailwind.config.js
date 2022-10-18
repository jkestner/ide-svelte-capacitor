/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/global.css","./index.html","./src/**/*.{html,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
