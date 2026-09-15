# components/

Piezas de interfaz, divididas por responsabilidad:

- `ui/` — átomos genéricos sin conocimiento del negocio (botones, badges, tarjetas)
- `sections/` — bloques grandes de la landing (Hero, ProductShowcase, CTA, Footer)
- `animations/` — wrappers de Framer Motion reutilizables por las secciones

Un componente de `sections/` puede importar de `ui/` y `animations/`, pero
no al revés.
