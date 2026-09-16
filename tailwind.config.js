/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Valores OFICIALES de la guia de marca de L'Occitane
        // (2024 Fundamentals & Basics Brand Guidelines).
        // Mismos nombres de clave que antes para no romper las clases
        // ya usadas en los componentes (bg-background, text-brand, etc.)
        background: '#FBF9F6',   // Blanc Brule
        backgroundAlt: '#F9F5F0', // Blanc Brule Moyen (fondos de fotos de producto)
        surface: '#F2E9DB',      // Beige Travertin
        brand: '#3F2B2E',        // Noir des Terres
        text: '#3F2B2E',         // Noir des Terres
        textMuted: '#A58671',    // Pierre de Fontaine (complementario oficial)
        accent: '#FFC700',       // Soleil Jaune Iconique -- USO MUY RESTRINGIDO:
                                  // solo toques pequenos, o elementos que deban ir
                                  // enteramente en amarillo (cajas/bolsas/regalo).
                                  // No usar como fondo de UI ni de botones.
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};
