/**
 * Datos de contacto de Vanster, la agencia que firma la propuesta.
 * Los usan el CTA y el pie: se mantienen aqui para que no se desincronicen.
 */
export const vanster = {
  // "Quienes somos": borrador redactado a partir de vanster.design (inicio y
  // sobre nosotros), pendiente de que Vanster lo valide. Tono sobrio: datos y
  // lo que hace el estudio, sin declaraciones.
  about: {
    eyebrow: 'Vänster',
    title: 'Quiénes somos',
    facts: [
      { term: 'Fundación', value: '2010' },
      { term: 'Sede', value: 'Barcelona' },
      { term: 'Ámbito', value: 'Diseño y producción' },
    ],
    paragraphs: [
      'Somos un estudio de diseño. Trabajamos la identidad de marca, la comunicación y las piezas físicas que la acompañan.',
      'Además de diseñar, producimos: merchandising, regalo corporativo, impresos y elementos para punto de venta.',
      "Para L'Occitane proponemos empezar por conocer a vuestros equipos y el uso que hacen de cada pieza, en tienda y en oficina, y producir a partir de ahí.",
    ],
    servicesLabel: 'Servicios',
    services: [
      'Identidad y branding',
      'Webs',
      'Informes y publicaciones',
      'Ilustración e infografía',
      'Animación',
      'Merchandising y regalo corporativo',
      'Punto de venta',
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
