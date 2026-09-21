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
  src: '../../public/fonts/gambarino/Gambarino-Regular.woff2',
  variable: '--font-heading',
  display: 'swap',
});

const body = localFont({
  src: [
    { path: '../../public/fonts/gambetta/Gambetta-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/gambetta/Gambetta-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/gambetta/Gambetta-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/gambetta/Gambetta-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const title = "Propuesta de merchandising corporativo para L'Occitane | Vänster";
const description =
  "Propuesta de Vänster para L'Occitane: agendas, calendarios, bidón de agua premium y merchandising personalizados para tiendas, equipos y clientes.";

// Las imagenes para compartir necesitan URL absoluta. En Vercel se toma el
// dominio de produccion; en local, el servidor de desarrollo.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3001';

// Vista previa al compartir el enlace (WhatsApp, correo, LinkedIn): el hero.
const shareImage = { url: '/og.jpg', width: 1200, height: 630, alt: "Una propuesta a medida para L'Occitane" };

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [shareImage],
  },
};

// Barra del navegador en movil del color de lo alto del hero (el cielo
// oscurecido con Noir des Terres).
// Solo tema claro: sin esto, algunos navegadores de Android (modo oscuro
// automatico) oscurecen la pagina a su manera.
export const viewport = {
  themeColor: '#3F2B2E',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${heading.variable} ${body.variable}`}>
      <body>
        {/* Sin JavaScript (bloqueado o fallido): las entradas animadas se
            muestran ya en su sitio, el titular del hero sale como texto y el
            rotulo aparece. Asi el HTML dice lo que tiene que decir. */}
        <noscript>
          <style>{`
            [data-reveal] { opacity: 1 !important; transform: none !important; }
            [data-noscript-show] { opacity: 1 !important; transform: none !important; margin-top: 2.5rem; }
            [data-noscript-hide] { display: none !important; }
            [data-noscript-title] { position: static !important; width: auto !important; height: auto !important; margin: 0 !important; overflow: visible !important; clip: auto !important; white-space: normal !important; display: block; text-align: center; font-family: var(--font-heading), serif; font-size: clamp(2.25rem, 5.6vw, 4.5rem); line-height: 0.95; text-transform: uppercase; color: #fbf9f6; }
          `}</style>
        </noscript>
        {/* reducedMotion="user" respeta prefers-reduced-motion del SO para
            todas las animaciones tween/spring de Framer Motion en la app,
            sin tener que comprobarlo componente a componente. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
