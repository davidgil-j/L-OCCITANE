'use client';

import { useEffect, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Lockup from '@/components/ui/Lockup';
import { EASE_CSS } from '@/components/animations/easing';

const THRESHOLD = 64; // px de scroll a partir de los que el rotulo pasa a isla

/**
 * Cabecera con el rotulo L'OCCITANE × VÄNSTER.
 *
 * Arriba del todo es el rotulo suelto sobre la foto, como hasta ahora. En
 * cuanto se hace scroll se recoge en una isla flotante: una capsula en Blanc
 * Brule con un filete fino, separada del borde y algo mas pequena, que queda
 * fija mientras se recorre la pagina. Al volver arriba se deshace.
 *
 * La capsula es una capa aparte que aparece con opacidad y escala, y el
 * rotulo sube y se reduce con transform: nada cambia de tamano en el flujo,
 * asi que no hay saltos de maquetacion. El unico cambio que no es transform
 * ni opacidad es el color del texto (claro sobre la foto, oscuro en la isla).
 * Sin sombras difusas ni desenfoques, como pide la guia de marca: el borde lo
 * marca el filete.
 */
export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [island, setIsland] = useState(false);

  useEffect(() => setIsland(window.scrollY > THRESHOLD), []);
  useMotionValueEvent(scrollY, 'change', (y) => setIsland(y > THRESHOLD));

  const ease = { transitionTimingFunction: EASE_CSS };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center">
      <div
        className={`relative mt-8 transition-transform duration-700 motion-reduce:transition-none md:mt-10 ${
          island ? '-translate-y-1 scale-[0.88] md:-translate-y-3' : ''
        }`}
        style={ease}
      >
        <span
          aria-hidden="true"
          className={`absolute -inset-x-7 -inset-y-[14px] rounded-full border border-brand/10 bg-background/95 transition duration-700 motion-reduce:transition-none ${
            island ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={ease}
        />
        <a
          href="#inicio"
          aria-label="L'Occitane y Vänster: volver al inicio"
          className={`pointer-events-auto relative block transition-colors duration-700 motion-reduce:transition-none ${
            island ? 'text-brand' : 'text-background'
          }`}
          style={ease}
        >
          <Lockup />
        </a>
      </div>
    </header>
  );
}
