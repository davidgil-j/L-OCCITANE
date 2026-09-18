import Image from 'next/image';
import { vanster } from '@/content/vanster';

/** Trazados de los iconos; las URL viven en content/vanster.js. */
const ICONS = [
  {
    name: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.73.37-1.05.69-.32.32-.52.62-.69 1.05-.12.32-.27.8-.31 1.7C3.44 8.85 3.43 9.2 3.43 12s0 3.15.08 4.38c.4.9.19 1.38.31 1.7.17.43.37.73.69 1.05.32.32.62.52 1.05.69.32.12.8.27 1.7.31 1.24.06 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.73-.37 1.05-.69.32-.32.52-.62.69-1.05.12-.32.27-.8.31-1.7.06-1.23.07-1.58.07-4.38s0-3.15-.07-4.38c-.04-.9-.19-1.38-.31-1.7a2.8 2.8 0 0 0-.69-1.05 2.8 2.8 0 0 0-1.05-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.14 4 12 4Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z',
  },
  {
    name: 'Facebook',
    path: 'M13.5 21v-8.2h2.76l.41-3.2H13.5V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.13c-.3-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.5-4.13 4.25V9.6H7.41v3.2h2.77V21h3.32Z',
  },
  {
    name: 'LinkedIn',
    path: 'M6.94 8.4V21H3.1V8.4h3.84Zm.25-3.9c0 1.1-.83 2-2.17 2h-.02C3.7 6.5 2.9 5.6 2.9 4.5c0-1.13.86-2 2.15-2 1.3 0 2.1.87 2.14 2ZM21 21h-3.84v-6.74c0-1.7-.6-2.85-2.12-2.85-1.16 0-1.85.78-2.15 1.53-.11.27-.14.65-.14 1.03V21H8.9s.05-11.42 0-12.6h3.85v1.78a3.8 3.8 0 0 1 3.45-1.9C18.72 8.28 21 9.93 21 13.5V21Z',
  },
];

/**
 * Pie de la propuesta: cierra sobre el mismo marmol que el contacto, sin una
 * franja aparte que partiera el final en dos. Los dos logotipos van en Blanc
 * Brule, con la silueta exacta de cada PNG: la guia de L'Occitane admite su
 * logo en claro sobre foto, y Vanster usa el suyo en blanco sobre este mismo
 * marmol en sus tarjetas. Entre ellos, la equis del rotulo del hero, y a cada
 * lado del de L'Occitane mas del espacio de respeto que pide su guia.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 border-t border-background/25 py-8 md:flex-row md:justify-between md:gap-10">
        <div className="flex items-center gap-5">
          <Image
            src="/images/brand/loccitane-logo-blanc.png"
            alt="L'Occitane en Provence"
            width={2048}
            height={512}
            unoptimized
            className="h-auto w-[132px]"
          />
          <svg aria-hidden="true" viewBox="0 0 10 10" className="h-[6px] w-[6px] text-background/70">
            <path d="M1 1 9 9M9 1 1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </svg>
          <Image
            src="/images/brand/vanster-logo-blanc.png"
            alt="Vänster"
            width={800}
            height={170}
            unoptimized
            className="h-auto w-[76px]"
          />
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-xs tracking-[0.02em] text-background/85">© 2010-{year} Vänster</p>
          <ul className="flex items-center gap-4">
            {vanster.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Vänster en ${s.name}`}
                  className="block text-background transition-opacity duration-300 hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                    <path d={ICONS.find((i) => i.name === s.name).path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
