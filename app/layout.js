import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { MotionConfig } from 'framer-motion';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const heading = localFont({
  src: '../public/fonts/gambarino/Gambarino-Regular.woff2',
  variable: '--font-heading',
  display: 'swap',
});

const body = localFont({
  src: [
    { path: '../public/fonts/gambetta/Gambetta-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/gambetta/Gambetta-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/gambetta/Gambetta-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/gambetta/Gambetta-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const title = "Propuesta de merchandising corporativo para L'Occitane | Vänster";
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
    <html lang="es" className={`${sans.variable} ${heading.variable} ${body.variable}`}>
      <body>
        {/* reducedMotion="user" respeta prefers-reduced-motion del SO para
            todas las animaciones tween/spring de Framer Motion en la app,
            sin tener que comprobarlo componente a componente. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
