/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aproximado, estimado visualmente de es.loccitane.com — ver
        // design/tokens/colors.json para el detalle y la salvedad.
        background: '#F7F3EA',
        surface: '#EFE6D5',
        brand: '#3B2B23',
        text: '#2E2620',
        textMuted: '#6B625A',
      },
      fontFamily: {
        // Aproximado (near-equivalentes) — ver design/tokens/typography.json
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};
