/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder — sustituir por los tokens reales de L'Occitane
        // extraídos con SkillUI en design/tokens/colors.json
        brand: {
          DEFAULT: '#2F4F3F',
          light: '#5C7A6A',
          dark: '#1A2E24',
        },
      },
      fontFamily: {
        // Placeholder — sustituir por la tipografía real de marca
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};
