/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{astro,html,js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        backgroundImage: {
          'ancestral': "url('/v.jpg')",
        },
      },
    },
    plugins: [],
  };
  