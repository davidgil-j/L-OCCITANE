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

const title = "L'Occitane × Vänster — Propuesta de merchandising corporativo";
const description =
  "Propuesta de Vänster para L'Occitane: agendas, calendarios, bidón de agua premium y merchandising personalizados para tiendas, trabajadores y clientes.";

export const metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    images: ['/images/brand/loccitane-logo-black.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/brand/loccitane-logo-black.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
