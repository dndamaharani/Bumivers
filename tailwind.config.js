/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      typography: {
        green: {
          css: {
            color: '#166534',
            a: { color: '#15803d', '&:hover': { color: '#166534' } },
            strong: { color: '#166534' },
            'blockquote p': {
              color: '#14532d',
              fontStyle: 'italic',
              borderLeftColor: '#22c55e',
            },
            code: {
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '2px 4px',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            hr: {
              borderColor: '#22c55e',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
