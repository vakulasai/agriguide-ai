/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0f7f3',
          100: '#e1efe7',
          200: '#c5dfd1',
          300: '#9bc6b2',
          400: '#6ba88f',
          500: '#468b71',
          600: '#32705a',
          700: '#265948',
          800: '#1e483b',
          900: '#173b31',
          950: '#0c221c',
          sidebar: '#154734',
          sidebarHover: '#1c5a43',
          sidebarActive: '#22694f',
          accent: '#2ebd6e',
          bg: '#f4f8f5'
        }
      }
    },
  },
  plugins: [],
};
