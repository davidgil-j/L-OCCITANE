/**
 * Contenido de la landing de L'Occitane.
 * Copy de borrador redactado por el equipo, pendiente de validación
 * final por Yasmina/David C. antes de publicar.
 *
 * Escrito para quien lo va a leer en L'Occitane: describe lo que se propone
 * y por qué encaja con la Maison, sin comprometer plazos, precios ni
 * especificaciones técnicas que la propuesta aún no fija.
 */
export const loccitane = {
  hero: {
    title: "Una propuesta a medida para L'Occitane",
    // Fragmento del titular que se compone en cursiva de Gambetta como
    // acento editorial. Debe aparecer literalmente dentro de `title`.
    titleAccent: 'a medida',
    subtitle:
      'En Vänster hemos preparado una colección de piezas corporativas para vuestras tiendas, vuestros equipos y vuestros clientes. Todas parten del universo de la Maison: la luz de Provenza, lo artesanal y el cuidado por el detalle.',
  },
  products: [
    {
      id: 'agendas',
      name: 'Agendas 2027',
      navLabel: 'Agendas',
      audience: 'Tiendas y trabajadores',
      description: [
        'Una agenda anual para acompañar el día a día en tienda y en oficina. Proponemos cubiertas en tonos inspirados en la paleta de Provenza y un interior pensado para el ritmo real de trabajo, con planificación semanal y espacio para notas.',
        "Lleva el logotipo de L'Occitane y puede adaptarse por equipo o por tienda, para que cada persona la sienta como una pieza propia.",
      ],
    },
    {
      id: 'calendarios',
      name: 'Calendarios de sobremesa',
      navLabel: 'Calendarios',
      audience: 'Tiendas y trabajadores',
      description: [
        'Un calendario de mesa que acompaña el puesto de trabajo durante los doce meses. Cada mes puede dedicarse a un paisaje, un ingrediente o un momento del año en Provenza, de modo que la identidad de la Maison esté presente sin necesidad de nombrarla.',
        "Un diseño sobrio, en un formato cómodo para el mostrador o el escritorio, personalizado con la imagen de L'Occitane.",
      ],
    },
    {
      id: 'bidon',
      name: 'Bidón de agua premium',
      navLabel: 'Bidón',
      audience: 'Trabajadores',
      description: [
        'Un bidón térmico pensado como detalle diario para el equipo: útil, duradero y agradable de llevar. Al ser reutilizable, evita botellas de un solo uso en tienda y en oficina.',
        'Es un objeto que se usa cada día, y por eso transmite la marca con naturalidad. El logotipo se aplica con un acabado discreto, en colores afines a la paleta de la Maison.',
      ],
    },
    {
      id: 'merchandising',
      name: 'Merchandising para clientes',
      navLabel: 'Merchandising',
      audience: 'Clientes',
      description: [
        'Una selección de artículos de regalo para acompañar la experiencia de compra y cuidar la relación con los clientes más fieles. Piezas útiles, a la altura de la Maison, que prolongan la visita a la tienda una vez en casa.',
        'La selección puede orientarse a campañas concretas, a momentos del año o a programas de fidelización, siempre con el mismo cuidado en los materiales.',
      ],
    },
  ],
  cta: {
    title: '¿Hablamos de los próximos pasos?',
    text: 'Nos encantaría presentaros la propuesta en persona, resolver cualquier duda y ajustar cada pieza a lo que necesitan de verdad vuestras tiendas y vuestros equipos.',
    buttonLabel: 'Hablemos',
    // Sin href propio: el CTA escribe al email de Vanster (content/vanster.js).
  },
};
