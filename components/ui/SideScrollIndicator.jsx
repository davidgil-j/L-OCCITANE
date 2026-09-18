'use client';

import { useEffect, useState } from 'react';
import useHasScrolled from '@/components/animations/useHasScrolled';
import { EASE_CSS } from '@/components/animations/easing';

/**
 * Navegacion lateral que sustituye a la barra de scroll nativa (oculta en
 * globals.css): un punto por seccion, unidos por un filete de 1px.
 *
 * - Aparece con el primer scroll. Si alguien llega con el teclado antes de
 *   desplazarse, se muestra igualmente (focus-within), para que nunca haya
 *   enlaces enfocables invisibles.
 * - Son enlaces a anclas, no botones: es navegacion dentro de la pagina, y
 *   asi el desplazamiento suave lo hace el Lenis que ya envuelve la web.
 * - El color sigue al fondo de la seccion activa. Cada seccion declara el
 *   suyo con data-bg-tone; la activa es la que cruza el centro vertical del
 *   viewport, que es justo donde esta el indicador, asi que es exactamente
 *   la que tiene detras.
 * - En movil se oculta: el contenido tiene prioridad y no hay hover.
 * - A 24px del borde hasta 1280px y a 40px a partir de ahi. Por debajo, la
 *   columna de texto de las fichas llega a 48px del borde y un indicador mas
 *   separado la pisaria al pasar por el centro.
 */
export default function SideScrollIndicator({ sections }) {
  const hasScrolled = useHasScrolled();
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [bgTone, setBgTone] = useState('dark');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target.id);
          setBgTone(entry.target.dataset.bgTone === 'dark' ? 'dark' : 'light');
        });
      },
      // Reduce la zona observada a una linea en el centro del viewport.
      { rootMargin: '-50% 0px -50% 0px' },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sections]);

  const visibility = hasScrolled
    ? 'opacity-100'
    : 'pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100';
  const color = bgTone === 'dark' ? 'text-background' : 'text-brand';
  const ease = { transitionTimingFunction: EASE_CSS };

  return (
    <nav
      aria-label="Secciones de la propuesta"
      className={`fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 transition-[opacity,color] duration-700 motion-reduce:transition-none md:block xl:right-10 ${visibility} ${color}`}
      style={ease}
    >
      <ol className="flex flex-col items-center">
        {sections.map(({ id, label }, i) => {
          const isActive = id === activeId;

          return (
            <li key={id} className="flex flex-col items-center">
              {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-current opacity-25 lg:h-4" />}
              <a
                href={`#${id}`}
                aria-label={`Ir a ${label}`}
                aria-current={isActive ? 'true' : undefined}
                className="group relative grid h-6 w-6 place-items-center rounded-full outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <span
                  aria-hidden="true"
                  className={`block h-[7px] w-[7px] rounded-full border border-current transition duration-700 motion-reduce:transition-none ${
                    isActive
                      ? 'scale-125 bg-current opacity-100'
                      : 'scale-90 bg-transparent opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }`}
                  style={ease}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.14em] opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  style={ease}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
