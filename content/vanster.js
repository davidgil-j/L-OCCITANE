/**
 * Datos de contacto de Vanster, la agencia que firma la propuesta.
 * Los usan el CTA y el pie: se mantienen aqui para que no se desincronicen.
 */
export const vanster = {
  // "Quienes somos": borrador redactado a partir de vanster.design (inicio y
  // sobre nosotros), pendiente de que Vanster lo valide. Las palabras entre
  // asteriscos se componen en cursiva magenta.
  about: {
    eyebrow: 'Vänster · Barcelona, desde 2010',
    title: 'Quiénes somos',
    paragraphs: [
      'Nacimos en Barcelona en 2010, de la unión entre una publicista y periodista y un abogado emprendedor por definición. *Vänster* significa *zurdo* en sueco, y en el equipo hay unos cuantos: mirar las cosas desde el otro lado es nuestra manera de trabajar.',
      'Diseñamos marcas, webs, informes e ilustración, y producimos merchandising, regalos corporativos y espacios para punto de venta en tiempo récord. Cada marca es un mundo, y lo nuestro es enseñar qué la hace única.',
      "Para L'Occitane no proponemos un catálogo. Proponemos sentarnos con vuestros equipos, entender cómo se usa cada pieza en tienda y en oficina, y producirla con el mismo cuidado que ponéis en lo vuestro.",
    ],
    // Proyectos que la propia web de Vanster muestra en su portfolio.
    clients: ['Esade', 'Gran Teatre del Liceu', "L'Auditori de Barcelona", 'Barcelona Academy of Art', 'Palau Macaya'],
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
