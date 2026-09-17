/**
 * Contenido de la landing de L'Occitane.
 * Copy de borrador redactado por el equipo, pendiente de validación
 * final por Yasmina/David C. antes de publicar.
 */
export const loccitane = {
  hero: {
    title: "Una propuesta a medida para L'Occitane en Provence",
    // Fragmento del titular que se compone en cursiva de Gambetta como
    // acento editorial. Debe aparecer literalmente dentro de `title`.
    titleAccent: 'a medida',
    subtitle:
      'Vänster presenta una selección de merchandising corporativo para tiendas, equipo y clientes, con la calidez artesanal de Provenza en cada detalle.',
  },
  products: [
    {
      id: 'agendas',
      name: 'Agendas 2027',
      audience: 'Tiendas y trabajadores',
      description:
        "Una agenda anual pensada para el día a día en tienda o en oficina, con acabados que evocan los tonos cálidos y los materiales naturales de Provenza. Personalizable con el logotipo de L'Occitane.",
    },
    {
      id: 'calendarios',
      name: 'Calendarios de sobremesa',
      audience: 'Tiendas y trabajadores',
      // Claim corto de la composicion 02 (borrador, pendiente de validar).
      claim: 'Doce meses de Provenza sobre la mesa',
      description:
        'Un calendario de mesa o pared para acompañar el espacio de trabajo durante todo el año, con un diseño sobrio que refleja la identidad de la Maison.',
    },
    {
      id: 'bidon',
      name: 'Bidón de agua premium',
      audience: 'Trabajadores',
      description:
        'Un bidón térmico de calidad, pensado como detalle diario para el equipo: funcional, duradero, con el logotipo de la marca en un acabado discreto y elegante.',
    },
    {
      id: 'merchandising',
      name: 'Merchandising para clientes',
      audience: 'Clientes',
      description:
        'Una selección de artículos de regalo pensados para acompañar la experiencia de compra y fidelizar a los clientes, con el mismo cuidado en los materiales que define a la Maison.',
    },
  ],
  cta: {
    title: '¿Hablamos de los próximos pasos?',
    buttonLabel: 'Hablemos',
    href: '#',
  },
};
