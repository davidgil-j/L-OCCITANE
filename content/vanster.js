/**
 * Datos de contacto de Vanster, la agencia que firma la propuesta.
 * Los usan el CTA y el pie: se mantienen aqui para que no se desincronicen.
 */
export const vanster = {
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
