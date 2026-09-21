/**
 * Datos de contacto de Vanster, la agencia que firma la propuesta.
 * Los usan el CTA y el pie: se mantienen aqui para que no se desincronicen.
 */
export const vanster = {
  // "Quienes somos": bloque fucsia con el titular partido en silabas, como en
  // vanster.design. Datos tomados de su web; pendiente de que Vanster valide la
  // redaccion.
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Del diseño a la producción.',
    titleLines: ['Del di -', 'seño a la', 'produc -', 'ción.'],
    text: 'Somos Vänster, un estudio de diseño de Barcelona. Desde 2010 creamos identidades, publicaciones y las piezas físicas que llevan una marca a las manos de las personas.',
    claim: 'Your online & offline creative partner',
    columns: [
      { title: 'Estudio', text: 'Barcelona, desde 2010. Un equipo de diseñadores y creativos de distintas disciplinas.' },
      { title: 'Diseño', text: 'Identidad de marca, publicaciones, web, ilustración y animación.' },
      { title: 'Producción', text: 'Merchandising, regalo corporativo, impresos y elementos para punto de venta.' },
    ],
  },
  email: 'info@vanster.design',
  phone: '93 164 89 25',
  phoneHref: 'tel:+34931648925',
  address: ['c. Diputació, 322', '08009 Barcelona'],
  // Abre la direccion en Google Maps (en movil, en la app si esta instalada),
  // desde donde se pueden pedir indicaciones para llegar.
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Carrer de la Diputació, 322, 08009 Barcelona'),
  web: 'www.vanster.design',
  webHref: 'https://www.vanster.design',
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/vanster.design/' },
    { name: 'Facebook', href: 'https://www.facebook.com/vanster.design/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/v-nster-and-lei/' },
  ],
};
