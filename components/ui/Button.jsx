import { EASE_CSS } from '@/components/animations/easing';

export default function Button({ href = '#', children, variant = 'primary' }) {
  // Opacidad + un desplazamiento minimo al pasar el cursor: nada de rebotes
  // ni escalados. Solo transform y opacity, que no fuerzan recalculo de layout.
  const base =
    'inline-block px-8 py-4 text-sm uppercase tracking-wide transition duration-300 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none motion-reduce:transition-none';
  const variants = {
    primary: 'bg-brand text-background',
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
