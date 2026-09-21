# Plan · Landing L'Occitane × Vänster

Fase actual: 6 · Repaso (auditoría hecha, pendiente de prueba en teléfono real)
Listón: la landing actual, que el cliente ya ha felicitado

## 0 · Entrevista
Qué es: propuesta de Vänster a L'Occitane para agendas, calendarios, bidón y merchandising · Para quién: el equipo de L'Occitane que decide · Modo: Persuadir
Aparatos obligatorios: escritorio (Chrome, Safari) y móvil (iOS, Android)
Viene trabajado: contenido sí · marca ficha (L'Occitane: design/guias-marca/RESUMEN.md; Vänster: magenta #C40452 del PDF oficial) · dirección sí, construida · código sí

## 1 · Mensaje
Qué tiene que creer al terminar: que Vänster es un estudio serio con el que se puede trabajar
Quiénes somos · presentar al estudio con sobriedad, sin exhibirse
Lo que no se dice: clientes ("Han confiado en nosotros" retirado), datos no verificados
Expresiones de David, tal cual: «debe ser más discreto», «muy poco profesional» (versión mármol), «es una mierda» (versión título + datos + lista), «no tiene colores ni diseño de Vänster, mierda genérica» (versión Manifiesto)
La sección tiene que ser Vänster: fucsia, mármol, su forma de titular. Sin caer en lo exaltado

## 2 · Bocetos
Reabierta: el Manifiesto construido era genérico, sin identidad de Vänster.
Nueva terna (design/bocetos/quienes-somos/): Bloque (fucsia a sangre, titular en sílabas) · Mármol (entra en la superficie del cierre) · Filo (fondo claro, banda fucsia)
Recursos de vanster.design: bloque fucsia a sangre, ventana de mármol, titular partido en sílabas con guion, lema espaciado
Referencias: Pentagram /about (texto sobrio junto a las personas) · Koto /about (frase en dos tonos) · Studio Dumbar /about (etiqueta, párrafo corto y retratos con nombre y cargo)
Dirección elegida: Bloque · fucsia a sangre, titular en sílabas, ventana de mármol
Lo que chirría, para vigilar: «igual es too much de alto» → bajado de ~1000 a 868 px en escritorio

## 3 · Espina
Heredada de la web: rejilla max-w-6xl, Gambarino para el titular, Gambetta para el texto, Inter para etiquetas
Color: fondo fucsia Vänster #C40452 a sangre, texto Blanc Brûlé (etiquetas al 90 %: 4,8:1)
Movimiento: cada línea del titular tras su máscara (MaskReveal escalonado), mármol, texto y columnas con FadeIn
La espiga de scroll pasa a Blanc Brûlé en esta sección (data-bg-tone="marble")

## 6 · Repaso
Auditoría con impeccable (audit + detector), mobile-native y emil-design-eng. Arreglado: foco visible, contraste de etiquetas y del texto sobre mármol, jerarquía h1 → h2, zona táctil del rótulo, prioridad de la imagen del titular, respuesta al pulsar, hover solo con cursor, sin destello al tocar, theme-color, imagen para compartir.
Excepciones asumidas: etiqueta «Quiénes somos» sobre el titular (mismo sistema que las fichas de producto); lema en mayúsculas (38 caracteres, es una etiqueta); recortes overflow-hidden en las piezas (intencionados, no hay menús que escapen).
Pendiente: prueba en iPhone y Android reales.
