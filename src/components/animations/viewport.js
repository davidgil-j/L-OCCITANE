/**
 * Cuando empiezan las entradas al hacer scroll. Arrancan en cuanto el
 * elemento esta a punto de entrar (hasta un 10 % de pantalla por debajo del
 * borde), no cuando ya se ve un trozo: con el scroll rapido del movil, el
 * hueco vacio y la aparicion tardia se leian como una carga a trompicones.
 */
export const REVEAL_VIEWPORT = { once: true, amount: 0, margin: '0px 0px 10% 0px' };
