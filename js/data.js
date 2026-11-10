/*
 * Contenido editable del portafolio.
 * - Las imágenes se cargan desde el CDN de Behance (versión 808px con respaldo a 404px).
 *   Para mejor calidad y control, reemplazar por archivos propios en /assets/projects/.
 * - Las descripciones son provisionales: ajustarlas con el autor.
 */
window.PORTFOLIO = {
  behance: 'https://www.behance.net/AlexanderIlustrador',

  cover: {
    kicker: 'Bitácora · Vol. 01',
    title: 'Cuaderno de<br><em>ilustración</em>',
    note: 'tinta · línea · anatomía',
    image:
      'https://mir-s3-cdn-cf.behance.net/49bc8feceb753a728ab653da5684596c/7b730c22-f8a6-4d99-ae31-48d562483525_rwc_0x15x1920x378x1920.jpg?h=4d188955e9da9bdd8a0c4e57a2c07d21'
  },

  projects: [
    {
      title: 'Sketch Book',
      caption: 'Bocetos y estudios de línea tomados del cuaderno de trabajo.',
      tags: ['Boceto', 'Portaminas'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/9415bf258272671.Y3JvcCwxMDYyLDgzMCw1LDM2NQ.jpeg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/9415bf258272671.Y3JvcCwxMDYyLDgzMCw1LDM2NQ.jpeg'
    },
    {
      title: 'Disección de Aquiles',
      caption: 'Estudio anatómico del héroe clásico desde la estructura.',
      tags: ['Anatomía', 'Tinta'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/8dc19c258117917.Y3JvcCw5ODYsNzcxLDIwNywxNjg.jpg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/8dc19c258117917.Y3JvcCw5ODYsNzcxLDIwNywxNjg.jpg'
    },
    {
      title: 'Disección de un café',
      caption: 'Un objeto cotidiano desarmado en capas y detalle.',
      tags: ['Editorial', 'Tinta'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/86007d258119617.Y3JvcCw3NDQsNTgyLDIxMCwyOTM.jpg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/86007d258119617.Y3JvcCw3NDQsNTgyLDIxMCwyOTM.jpg'
    },
    {
      title: 'León de Fu',
      caption: 'Personaje y guardián, entre la tradición y la línea propia.',
      tags: ['Personaje', 'Color'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/099801258118803.Y3JvcCwxMDMyLDgwNyw4MSwxNzY.jpg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/099801258118803.Y3JvcCwxMDMyLDgwNyw4MSwxNzY.jpg'
    },
    {
      title: 'Anfibio',
      caption: 'Criatura de dos mundos resuelta con alto contraste.',
      tags: ['Criatura', 'Contraste'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/4e1e7e258014773.Y3JvcCw0MDQsMzE2LDcxMSwyMjI.jpg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/4e1e7e258014773.Y3JvcCw0MDQsMzE2LDcxMSwyMjI.jpg'
    },
    {
      title: 'Regreso a la Tierra',
      caption: 'Narrativa visual sobre el viaje de vuelta a casa.',
      tags: ['Narrativa', 'Técnica al agua'],
      image: 'https://mir-s3-cdn-cf.behance.net/projects/808/edb3bb258187557.Y3JvcCw2NDYsNTA1LDIzNSw0MQ.jpg',
      fallback: 'https://mir-s3-cdn-cf.behance.net/projects/404/edb3bb258187557.Y3JvcCw2NDYsNTA1LDIzNSw0MQ.jpg'
    }
  ],

  contact: [
    { label: 'Behance', value: 'AlexanderIlustrador', href: 'https://www.behance.net/AlexanderIlustrador' },
    // Pendiente: confirmar datos reales
    { label: 'Correo', value: 'correo@pendiente.com', href: 'mailto:correo@pendiente.com' },
    { label: 'Instagram', value: '@pendiente', href: '#' }
  ]
};
