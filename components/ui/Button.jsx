export default function Button({ href = '#', children, variant = 'primary' }) {
  const base = 'inline-block px-8 py-4 text-sm uppercase tracking-wide transition-opacity hover:opacity-90';
  const variants = {
    primary: 'bg-brand text-background',
    ghost: 'border border-brand text-brand',
    // Para usar sobre fondos oscuros/foto -- boton solido claro, texto oscuro.
    inverted: 'bg-background text-brand',
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
