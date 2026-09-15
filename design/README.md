# design/

Todo lo relativo a identidad visual, separado del código de componentes:

- `tokens/` — colores y tipografía en JSON, consumidos por `tailwind.config.js`
- `references/` — capturas/inspiración (p. ej. salida de SkillUI sobre
  loccitane.es), solo como referencia — nunca assets finales para producción

## Principio de diseño: monocromo + fotografía

La interfaz debe mantenerse casi monocroma (crema + marrón oscuro, ver
`tokens/colors.json`) y dejar que el color venga de las fotografías de
producto, no de bloques de color en la UI. No introducir paletas de color
adicionales en componentes — si una sección necesita color, que venga de una
imagen, no de un fondo o acento nuevo.
