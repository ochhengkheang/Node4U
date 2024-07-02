/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.pug", // Scan all Pug files in the views directory
    "./src/**/*.js", // Scan all JavaScript files in the src directory
    "./public/**/*.html", // If you have any HTML files in the public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
