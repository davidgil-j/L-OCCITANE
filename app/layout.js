import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: "L'Occitane × Vänster — Propuesta de merchandising corporativo",
  description:
    "Propuesta de Vänster para L'Occitane: agendas, calendarios y bidones de agua personalizados para tiendas, trabajadores y clientes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
