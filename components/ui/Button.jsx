export default function Button({ children, href, variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors';
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'border border-brand text-brand hover:bg-brand/5',
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
