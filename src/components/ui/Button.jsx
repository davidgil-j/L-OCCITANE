import { EASE_CSS } from '@/components/animations/easing';

export default function Button({ href = '#', children, variant = 'primary' }) {
  // Forma de pildora: los botones cuadrados se leian rigidos. Al pasar el
  // cursor, opacidad y un desplazamiento minimo, sin rebotes ni escalados.
  // Solo transform y opacity, que no fuerzan recalculo de layout. Al pulsar
  // encoge un poco: en tactil no hay hover y el toque necesita respuesta.
  const base =
    'inline-block select-none px-7 py-3.5 text-[13px] tracking-[0.15em] transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97] active:duration-150 motion-reduce:transform-none motion-reduce:transition-none';
  const variants = {
    primary: 'rounded-full bg-vanster uppercase text-white',
    ghost: 'rounded-full border border-brand uppercase text-brand',
    // Para usar sobre fondos oscuros/foto -- boton solido claro, texto oscuro.
    inverted: 'rounded-full bg-background uppercase text-brand',
    // Sobre el marmol: solo el filete, sin relleno, para que no tape la textura.
    // En pildora, como la isla de la cabecera, para que la forma se repita.
    outlineLight: 'rounded-full border border-background px-9 text-[15px] text-background [font-variant-caps:all-small-caps]',
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]}`}
      style={{ transitionTimingFunction: EASE_CSS }}
    >
      {children}
    </a>
  );
}
