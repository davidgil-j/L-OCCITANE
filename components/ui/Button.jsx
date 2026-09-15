export default function Button({ children, href, variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-opacity';
  const variants = {
    primary: 'bg-brand text-background hover:opacity-90',
    secondary: 'border border-brand text-brand hover:bg-brand/5',
    inverse: 'border border-background text-background hover:bg-background/10',
  };

  const className = `${base} ${variants[variant] ?? variants.primary}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
