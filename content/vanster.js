/**
 * Datos de contacto de Vanster, la agencia que firma la propuesta.
 * Los usan el CTA y el pie: se mantienen aqui para que no se desincronicen.
 */
export const vanster = {
  // "Quienes somos": borrador redactado a partir de vanster.design (inicio y
  // sobre nosotros), pendiente de que Vanster lo valide. Se compone como una
  // entrada de diccionario del nombre. Las palabras entre asteriscos van en
  // cursiva magenta.
  about: {
    eyebrow: 'Quiénes somos',
    place: 'Barcelona, desde 2010',
    word: 'Vänster',
    phonetic: 'vèn·ster',
    grammar: 'adj. y s. Del sueco',
    senses: [
      'Izquierda, izquierdo.',
      'Estudio creativo de Barcelona que mira las cosas desde el otro lado.',
    ],
    paragraphs: [
      'Nacimos en 2010, de la unión entre una periodista y publicista y un abogado emprendedor por definición. Hoy somos un equipo de creativos y diseñadores, y unos cuantos somos *zurdos*: el nombre no es casualidad.',
      'Cada marca es un mundo. Lo nuestro es entender el suyo y enseñar qué la hace única, en pantalla y en papel, en la mano y en la tienda.',
    ],
    services: [
      { name: 'Identidad y branding' },
      { name: 'Webs y experiencias digitales' },
      { name: 'Informes y publicaciones' },
      { name: 'Ilustración e infografía' },
      { name: 'Animación y motion graphics' },
      { name: 'Merchandising y regalo corporativo', current: true },
      { name: 'Punto de venta y espacios efímeros' },
    ],
    currentLabel: 'Esta propuesta',
    closing:
      "Para L'Occitane no proponemos un catálogo. Proponemos sentarnos con vuestros equipos, entender cómo se usa cada pieza en tienda y en oficina, y producirla con el *mismo cuidado* que ponéis en lo vuestro.",
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
