import { EASE_CSS } from '@/components/animations/easing';

export default function Button({ href = '#', children, variant = 'primary' }) {
  // Forma de pildora: los botones cuadrados se leian rigidos. Al pasar el
  // cursor, opacidad y un desplazamiento minimo, sin rebotes ni escalados.
  // Solo transform y opacity, que no fuerzan recalculo de layout.
  const base =
    'inline-block rounded-full px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none motion-reduce:transition-none';
  const variants = {
    primary: 'bg-vanster text-white',
    ghost: 'border border-brand text-brand',
    // Para usar sobre fondos oscuros/foto -- boton solido claro, texto oscuro.
    inverted: 'bg-background text-brand',
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
