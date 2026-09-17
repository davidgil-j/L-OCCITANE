/**
 * Curva de easing unica de toda la pagina. Cualquier transicion nueva la
 * importa de aqui en lugar de redeclararla, para que el movimiento se sienta
 * como una sola familia.
 */
export const EASE = [0.22, 1, 0.36, 1];

/** Equivalente en CSS, para transiciones que no pasan por Framer Motion. */
export const EASE_CSS = 'cubic-bezier(0.22,1,0.36,1)';
