/*
 * Contenido editable del portafolio.
 * - Imágenes propias en /assets/projects/<proyecto>/ (01.webp es la portada del proyecto).
 * - excerpt: texto corto del pie de página del marco.
 * - body: párrafos del texto completo (página de notas y lector).
 * - quote (opcional): cita con su fuente.
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
      excerpt: 'Estructura, pulso y claroscuro: el dominio del oficio construido hoja a hoja.',
      tags: ['Lápiz mecánico', 'Rapidógrafo', 'Cómic'],
      body: [
        'En cada ejercicio de mis bitácoras, la estructura y el pulso del trazo (marcado por la precisión del lápiz mecánico y la firmeza del rapidógrafo) se enfrentan al papel para dar paso a una anatomía implacable y a un claroscuro de contrastes profundos.',
        'No hay espacio para el adorno vano ni para la excusa: cada línea es una decisión milimétrica donde la potencia del dibujo y la crudeza del cómic se encuentran, revelando el proceso vivo de quien entiende que el dominio del oficio se construye hoja a hoja, sin atajos.'
      ],
      image: 'assets/projects/sketch-book/01.webp',
      images: [
        { src: 'assets/projects/sketch-book/01.webp' },
        { src: 'assets/projects/sketch-book/02.webp' },
        { src: 'assets/projects/sketch-book/03.webp' },
        { src: 'assets/projects/sketch-book/04.webp' },
        { src: 'assets/projects/sketch-book/05.webp' },
        { src: 'assets/projects/sketch-book/06.webp' },
        { src: 'assets/projects/sketch-book/07.webp' },
        { src: 'assets/projects/sketch-book/08.webp' },
        { src: 'assets/projects/sketch-book/09.webp' },
        { src: 'assets/projects/sketch-book/10.webp' },
        { src: 'assets/projects/sketch-book/11.webp' },
        { src: 'assets/projects/sketch-book/12.webp' },
        { src: 'assets/projects/sketch-book/13.webp' },
        { src: 'assets/projects/sketch-book/14.webp' },
        { src: 'assets/projects/sketch-book/15.webp' },
        { src: 'assets/projects/sketch-book/16.webp' }
      ]
    },
    {
      title: 'Disección de Aquiles',
      excerpt: 'Una disección metafórica del héroe: lo que yace tras la armadura.',
      tags: ['Mitología', 'Anatomía'],
      body: [
        'Esta obra presenta una poderosa reinterpretación visual y conceptual del mítico héroe griego Aquiles, fusionando la grandiosidad de la mitología clásica con una profunda introspección sobre la vulnerabilidad humana y espiritual.',
        '«Disección de Aquiles» subvierte el mito clásico. Si bien la leyenda popular nos habla de su infame punto débil físico en el talón, esta obra realiza una disección metafórica de su ser interno. Nos invita a contemplar lo que yace tras la armadura: la dualidad entre la furia del amor que habita en su pecho y la eternidad silenciosa de su alma.'
      ],
      image: 'assets/projects/diseccion-de-aquiles/01.webp',
      images: [
        { src: 'assets/projects/diseccion-de-aquiles/01.webp' },
        { src: 'assets/projects/diseccion-de-aquiles/02.webp' },
        { src: 'assets/projects/diseccion-de-aquiles/03.webp' },
        { src: 'assets/projects/diseccion-de-aquiles/04.webp' },
        { src: 'assets/projects/diseccion-de-aquiles/05.webp' },
        { src: 'assets/projects/diseccion-de-aquiles/06.webp' }
      ]
    },
    {
      title: 'Disección de un café',
      excerpt: 'Un torso clásico pintado con café: el ritual diario hecho materia.',
      tags: ['Café', 'Anatomía clásica'],
      body: [
        'La pieza trasciende el mero estudio académico para convertirse en una profunda metáfora visual. La pintura presenta un torso masculino esculpido con un dominio clásico de la estructura y el volumen, evocando la estética de los torsos de la antigua Grecia y el rigor anatómico.',
        'Sin embargo, este cuerpo no es una fría estatua de mármol; cobra vida y sentido a través de la elección del café como medio pictórico y de la taza que sostiene en su mano. Así, el combustible que despierta al individuo y moviliza su cotidianidad se convierte en la materia misma que da vida y forma al cuerpo, celebrando una unión perfecta entre el esfuerzo, el ritual diario y la maestría artesanal del dibujo.'
      ],
      image: 'assets/projects/diseccion-de-un-cafe/01.webp',
      images: [
        { src: 'assets/projects/diseccion-de-un-cafe/01.webp' },
        { src: 'assets/projects/diseccion-de-un-cafe/02.webp' },
        { src: 'assets/projects/diseccion-de-un-cafe/03.webp' },
        { src: 'assets/projects/diseccion-de-un-cafe/04.webp' }
      ]
    },
    {
      title: 'León de Fu',
      excerpt: 'Ritual de transformación: el portador se convierte en la bestia mítica.',
      tags: ['Grafito', 'Sincretismo', 'Color'],
      body: [
        'Esta obra propone una lectura donde la ilustración se convierte en un ritual de transformación y sincretismo cultural. La figura humana —de musculatura esculpida y postura suspendida en el dinamismo del movimiento— no solo soporta el peso físico de la estructura, sino que encarna el mito de la transmutación: el joven deja de ser un simple portador para convertirse en el canalizador de la bestia mítica.',
        'El uso del trazo firme y limpio en el grafito contrasta con la irrupción cromática del rojo y el blanco en la máscara y el calzado, estableciendo una tensión visual entre la disciplina de la forma anatómica y la explosión ritual del color.',
        'Desde su profunda simbología, la cabeza del león de Fu trasciende el mero atrezo folclórico para erigirse como un tótem de protección, prosperidad y poder espiritual. Los ojos circulares y sobredimensionados, enmarcados en tonos amarillos y verdes, actúan como vigías que ahuyentan las energías oscuras, mientras que la fuerza contenida en el torso del guerrero simboliza la maestría sobre los instintos más salvajes.',
        'Es una metáfora visual donde el arte tradicional y el vigor físico se funden para recordarnos que el verdadero poder de la ilustración no reside en la mímesis de la realidad, sino en la capacidad de evocar mitos vivos capaces de habitar y transformar el cuerpo de quien los sostiene.'
      ],
      image: 'assets/projects/leon-de-fu/01.webp',
      images: [
        { src: 'assets/projects/leon-de-fu/01.webp' },
        { src: 'assets/projects/leon-de-fu/02.webp' },
        { src: 'assets/projects/leon-de-fu/03.webp' },
        { src: 'assets/projects/leon-de-fu/04.webp' },
        { src: 'assets/projects/leon-de-fu/05.webp' }
      ]
    },
    {
      title: 'Letales',
      client: 'Marca Anfibio',
      excerpt: 'Calistenia, crossfit y misticismo ancestral con la energía de la rana dardo.',
      tags: ['Branding', 'Ilustración comercial'],
      body: [
        'Ilustraciones creadas para la marca Anfibio. Una exploración visual donde la fuerza de la calistenia y el crossfit se cruzan con el misticismo de nuestras tribus ancestrales y la energía de la rana dardo.',
        'Trazos dinámicos y actitud indomable para dar vida a la esencia de la marca.'
      ],
      image: 'assets/projects/letales/01.webp',
      coverFit: 'contain', // imagen horizontal: se muestra completa en el marco
      images: [
        { src: 'assets/projects/letales/01.webp' },
        { src: 'assets/projects/letales/02.webp' },
        { src: 'assets/projects/letales/03.webp' },
        { src: 'assets/projects/letales/04.webp' },
        { src: 'assets/projects/letales/05.webp' },
        { src: 'assets/projects/letales/06.webp' }
      ]
    },
    {
      title: 'Regreso a la Tierra',
      client: 'Editorial Gris Tormenta, 2022',
      excerpt: 'Ilustración editorial sobre la nostalgia de la Tierra vista desde el espacio.',
      tags: ['Editorial', 'Narrativa'],
      body: [],
      quote: {
        text: [
          'Lo que más se extraña allá es la tierra misma. Extrañaba los olores. Extrañaba los árboles; incluso soñaba con ellos. Incluso aluciné. Creí oler fuego de verdad y algo se estaba asando.',
          'Acabé poniendo fotos de árboles en las paredes para animarme. Allá sí se extraña la tierra.'
        ],
        cite: 'Mijaíl Korniénko, entrevista después de su primera misión espacial.'
      },
      image: 'assets/projects/regreso-a-la-tierra/01.webp',
      coverFit: 'contain', // imagen horizontal: se muestra completa en el marco
      images: [
        { src: 'assets/projects/regreso-a-la-tierra/01.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/02.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/03.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/04.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/05.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/06.webp' },
        { src: 'assets/projects/regreso-a-la-tierra/07.webp' }
      ]
    }
  ],

  contact: [
    { label: 'Behance', value: 'AlexanderIlustrador', href: 'https://www.behance.net/AlexanderIlustrador' },
    { label: 'Correo', value: 'alexander.academiadearte@gmail.com', href: 'mailto:alexander.academiadearte@gmail.com' },
    { label: 'Instagram', value: '@alexander_maestroilustrador', href: 'https://www.instagram.com/alexander_maestroilustrador/' }
  ]
};
