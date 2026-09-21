# L'Occitane × Vänster — Landing de propuesta de merchandising

Landing page que presenta la propuesta de Vänster a L'Occitane: agendas,
calendarios y bidones de agua personalizados para tiendas, trabajadores y
clientes (desglose completo en `src/content/loccitane.js`).

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

Abre http://localhost:3001 (el puerto 3000 lo usa otro proyecto).

## Estructura

En la raíz solo queda lo que Next.js y las herramientas necesitan ahí
(`package.json`, configuraciones, `public/` y `skills-lock.json`). Todo lo
demás va en carpetas:

- `src/app/` — rutas, layout, estilos globales e iconos de Next.js
- `src/components/` — UI (`ui/`, `sections/`, `animations/`)
- `src/content/` — textos y datos, separados de los componentes
- `public/` — imágenes, vídeos y tipografías que se publican con la web
- `design/` — material de trabajo que no se publica: guías de marca,
  tokens, bocetos y los archivos para generar imágenes y vídeos
- `docs/` — el plan de diseño (`PLAN.md`) y el paquete original del método
  de diseño (`metodo-diseno/`)
- `.claude/skills/` — las skills de diseño que usa Claude en este proyecto

## Estado actual

Landing construida y auditada (accesibilidad, rendimiento y móvil). El
detalle de lo decidido y lo pendiente está en `docs/PLAN.md`.

- [ ] Validación de los textos de Quiénes somos por Vänster
- [ ] Prueba en iPhone y Android reales de la versión publicada
