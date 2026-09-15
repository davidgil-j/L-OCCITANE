# L'Occitane × Vänster — Landing de propuesta de merchandising

Landing page que presenta la propuesta de Vänster a L'Occitane: agendas,
calendarios y bidones de agua personalizados para tiendas, trabajadores y
clientes (desglose completo en `content/loccitane.js`).

## Stack
- Next.js (App Router) + React
- Tailwind CSS
- Framer Motion (animaciones)
- Despliegue: Vercel · Repositorio: GitHub (`davidgil-j/L-OCCITANE`)

## Cómo arrancar en local

```
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

Cada carpeta tiene su propio `README.md` explicando qué contiene y qué no
debe entrar en ella, para que el proyecto no se desordene a medida que
crece.

- `app/` — rutas y layout de Next.js
- `components/` — UI reutilizable (`ui/`, `sections/`, `animations/`)
- `content/` — textos y datos de producto, separados de los componentes
- `design/` — tokens de marca (colores, tipografía) y referencias visuales
- `public/images/` — assets finales por categoría de producto

## Estado actual

Esqueleto técnico funcional con contenido placeholder (todo a `null` en
`content/loccitane.js`). Pendiente antes de dar la landing por acabada:

- [ ] Materiales de branding reales de Vänster (Yasmina)
- [ ] Tokens de color/tipografía definitivos — extracción con SkillUI
      sobre `loccitane.es` (`skillui --url https://www.loccitane.es`)
- [ ] Imágenes de producto finales (Axel)
- [ ] Copy definitivo de cada sección
