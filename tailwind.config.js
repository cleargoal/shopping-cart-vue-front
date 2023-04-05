/** @type {import('tailwindcss').Config} */
module.exports = {

  content:
      [
        "../public/**/*.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/typography"),
    // require("tailwindcss-children"),
  ],
};
