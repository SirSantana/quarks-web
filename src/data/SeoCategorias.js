export default function getSeoCategorias({ servicio, ciudad, vehiculo }) {
  const seo = {
    "cambio-de-aceite": {
      "title": "Cambio de Aceite",
      "description": `Encuentra talleres para cambio de aceite en ${ciudad} para tu ${vehiculo} y asegura el rendimiento óptimo de tu motor con un mantenimiento regular.`,
      "preguntas": {
        "importancia": "¿Por qué es importante hacer el cambio de aceite?",
        "duracion": "¿Cuánto tiempo dura el servicio de cambio de aceite?",
        "frecuencia": "¿Cada cuánto se recomienda realizar el cambio de aceite?"
      },
      "importancia": "El cambio de aceite es esencial para mantener el motor limpio y reducir el desgaste de sus componentes internos.",
      "duracion": "El servicio de cambio de aceite suele durar entre 30 y 45 minutos.",
      "frecuencia": "Se recomienda cada 5,000 a 10,000 km o según lo indique el fabricante.",
      "rating":4.7,
      "price":180.000

    },
    "lujos": {
      "title": "Lujos y Accesorios",
      "description": `Descubre talleres que instalan lujos y accesorios para personalizar y mejorar la apariencia de tu vehículo en ${ciudad} para tu ${vehiculo}.`,
      "preguntas": {
        "importancia": "¿Por qué instalar lujos y accesorios en tu vehículo?",
        "duracion": "¿Cuánto tiempo toma instalar un accesorio en el vehículo?",
        "frecuencia": "¿Cuándo es recomendable añadir accesorios a tu auto?"
      },
      "importancia": "Agregar accesorios a tu auto mejora no solo la estética sino también la comodidad y funcionalidad de ciertas áreas.",
      "duracion": "La instalación de accesorios puede variar entre 1 y 3 horas, dependiendo del accesorio.",
      "frecuencia": "Cada vez que desees personalizar o mejorar el rendimiento de tu vehículo.",
      "rating":4.7,
      "price":180.000
    },
    "baterias": {
      "title": "Baterías",
      "description": `Talleres para revisión y cambio de batería en ${ciudad} para tu ${vehiculo}, asegurando un encendido confiable y eficiencia eléctrica.`,
      "preguntas": {
        "importancia": "¿Por qué es importante revisar y reemplazar la batería?",
        "duracion": "¿Cuánto tiempo toma cambiar la batería de un vehículo?",
        "frecuencia": "¿Cada cuánto se recomienda reemplazar la batería?"
      },
      "importancia": "Revisar y reemplazar la batería evita problemas de encendido y protege los componentes eléctricos.",
      "duracion": "El cambio de batería toma aproximadamente 20 a 30 minutos.",
      "frecuencia": "Se recomienda cada 2 a 3 años, o cuando la batería muestre signos de desgaste."
    },
    "aire-acondicionado": {
      "title": "Aire Acondicionado",
      "description": `Encuentra talleres especializados en mantenimiento y recarga de aire acondicionado de vehículos para tu ${vehiculo} en ${ciudad}.`,
      "preguntas": {
        "importancia": "¿Por qué es importante mantener el aire acondicionado del vehículo?",
        "duracion": "¿Cuánto tiempo dura el mantenimiento del aire acondicionado?",
        "frecuencia": "¿Cada cuánto se recomienda el mantenimiento del aire acondicionado?"
      },
      "importancia": "El mantenimiento del aire acondicionado previene malos olores, mejora la calidad del aire y asegura que el sistema funcione eficientemente durante climas cálidos.",
      "duracion": "Este servicio generalmente toma entre 45 minutos y 1 hora.",
      "frecuencia": "Recomendado una vez al año o cada 20,000 km, especialmente antes de temporadas de calor."
    },
    "frenos": {
      "title": "Frenos",
      "description": `Encuentra talleres en revisión y cambio de pastillas, discos o líquidos de freno para garantizar seguridad en la conducción para tu ${vehiculo} en ${ciudad}.`,
      "preguntas": {
        "importancia": "¿Por qué es importante revisar el sistema de frenos?",
        "duracion": "¿Cuánto tiempo toma revisar o cambiar los frenos?",
        "frecuencia": "¿Cada cuánto se recomienda el mantenimiento de frenos?"
      },
      "importancia": "El mantenimiento regular de los frenos es crucial para la seguridad en carretera, ya que permite una respuesta de frenado efectiva y previene fallas que pueden ser peligrosas.",
      "duracion": "La revisión o cambio de frenos puede durar entre 30 minutos y 2 horas, dependiendo de los componentes a revisar o reemplazar.",
      "frecuencia": "Recomendado cada 10,000 a 15,000 km o si se detectan ruidos o disminución en la eficacia de frenado."
    },
    "motor": {
      "title": "Motor",
      "description": `Encuentra talleres con experiencia en mecánica especializada para tu motor y evita averías inesperadas en tu vehículo en ${ciudad} para tu ${vehiculo}.`,
      "preguntas": {
        "importancia": "¿Por qué es importante el mantenimiento regular del motor?",
        "duracion": "¿Cuánto tiempo toma el servicio de revisión del motor?",
        "frecuencia": "¿Cada cuánto se recomienda el mantenimiento del motor?"
      },
      "importancia": "El motor es el corazón del vehículo; un mantenimiento regular permite detectar problemas a tiempo, mejorar el consumo de combustible y extender la vida del motor.",
      "duracion": "El tiempo de servicio varía según la revisión, pero puede durar entre 1 y 3 horas.",
      "frecuencia": "Recomendado cada 20,000 a 30,000 km o según lo indique el manual del vehículo."
    },
    "clutch": {
      "title": "Clutch",
      "description": `Encuentra talleres de revisión y cambio del clutch para garantizar una transmisión de potencia óptima y evitar daños en el sistema de transmisión en ${ciudad} para tu ${vehiculo}.`,
      "preguntas": {
        "importancia": "¿Por qué es importante revisar el clutch regularmente?",
        "duracion": "¿Cuánto tiempo toma el servicio de cambio o ajuste del clutch?",
        "frecuencia": "¿Cada cuánto se recomienda el mantenimiento del clutch?"
      },
      "importancia": "El clutch es esencial para el cambio de marchas; su mantenimiento previene daños graves en la transmisión y mejora la experiencia de conducción.",
      "duracion": "Este servicio suele tomar entre 3 y 5 horas, dependiendo del tipo de vehículo y el estado del sistema.",
      "frecuencia": "Recomendado cada 60,000 a 100,000 km o si se detectan problemas al cambiar de marcha."
    },
    "alineación-y-balanceo": {
      "title": "Alineación y Balanceo",
      "description": `Talleres en ajuste de las ruedas para asegurar que estén perfectamente alineadas y equilibradas, mejorando el control y seguridad del vehículo en ${ciudad} para tu ${vehiculo}.`,
      "preguntas": {
        "importancia": "¿Por qué es importante la alineación y balanceo de las ruedas?",
        "duracion": "¿Cuánto tiempo toma el servicio de alineación y balanceo?",
        "frecuencia": "¿Cada cuánto se recomienda realizar la alineación y balanceo?"
      },
      "importancia": "La alineación y el balanceo son fundamentales para una conducción segura y estable, reduciendo el desgaste irregular de las llantas y mejorando la eficiencia del combustible.",
      "duracion": "Este servicio toma aproximadamente 1 hora.",
      "frecuencia": "Recomendado cada 10,000 km o al notar vibraciones en el volante o desgaste irregular de los neumáticos."
    },
    "cajas": {
      "title": "Cajas de Dirección",
      "description": "Mantenimiento o cambio de la caja de dirección para garantizar un control preciso y seguro del vehículo.",
      "preguntas": {
        "importancia": "¿Por qué es importante el mantenimiento de la caja de dirección?",
        "duracion": "¿Cuánto tiempo toma el servicio de ajuste o reemplazo de la caja de dirección?",
        "frecuencia": "¿Cada cuánto se recomienda revisar o cambiar la caja de dirección?"
      },
      "importancia": "La caja de dirección es clave en el sistema de dirección; un mantenimiento adecuado previene fallas y asegura la estabilidad del vehículo en la conducción.",
      "duracion": "El servicio puede durar entre 2 y 4 horas, dependiendo de si es un ajuste o un reemplazo.",
      "frecuencia": "Recomendado cada 50,000 km o si se detectan ruidos, rigidez o pérdida de precisión en la dirección."
    },
    "suspensión": {
      "title": "Suspensión",
      "description": "Mantenimiento y ajuste de los sistemas de suspensión para asegurar una conducción cómoda y estable.",
      "preguntas": {
        "importancia": "¿Por qué es importante mantener en buen estado la suspensión del vehículo?",
        "duracion": "¿Cuánto tiempo toma el servicio de revisión y ajuste de la suspensión?",
        "frecuencia": "¿Cada cuánto se recomienda realizar el mantenimiento de la suspensión?"
      },
      "importancia": "La suspensión en buen estado proporciona estabilidad, absorbe impactos y protege otros componentes del vehículo. Su mantenimiento mejora el control y la seguridad del auto.",
      "duracion": "La revisión y ajuste de la suspensión pueden tomar entre 2 y 4 horas.",
      "frecuencia": "Recomendado cada 20,000 km o si se notan ruidos, vibraciones o un rebote excesivo en el vehículo."
    },
    "latoneria-y-pintura": {
      "title": "Carrocería",
      "description": "Reparación y mantenimiento de la estructura exterior del vehículo para asegurar su estética y funcionalidad.",
      "preguntas": {
        "importancia": "¿Por qué es importante el mantenimiento regular de la carrocería?",
        "duracion": "¿Cuánto tiempo puede llevar una reparación de la carrocería?",
        "frecuencia": "¿Cada cuánto se recomienda revisar la carrocería del vehículo?"
      },
      "importancia": "Un buen mantenimiento de la carrocería previene el deterioro por corrosión y daños estructurales, además de mantener la apariencia y el valor del vehículo.",
      "duracion": "El tiempo varía según el tipo de reparación, desde horas para detalles menores hasta días para restauraciones más profundas.",
      "frecuencia": "Se recomienda revisar la carrocería cada 6 meses para detectar rayones, abolladuras y evitar la acumulación de óxido."
    },
    "inyeccion": {
      "title": "Inyección",
      "description": "Limpieza y mantenimiento del sistema de inyección para asegurar una entrega de combustible óptima y eficiente.",
      "preguntas": {
        "importancia": "¿Por qué es importante el mantenimiento del sistema de inyección de combustible?",
        "duracion": "¿Cuánto tiempo toma el servicio de limpieza y mantenimiento de inyección?",
        "frecuencia": "¿Cada cuánto se recomienda realizar el mantenimiento del sistema de inyección?"
      },
      "importancia": "Mantener limpio el sistema de inyección mejora el rendimiento del motor y reduce el consumo de combustible, además de minimizar las emisiones contaminantes.",
      "duracion": "Este servicio suele durar entre 1 y 2 horas.",
      "frecuencia": "Recomendado cada 20,000 km o al notar pérdida de potencia, arranque difícil o aumento en el consumo de combustible."
    },
    "electronica": {
      "title": "Electrónica",
      "description": "Diagnóstico y reparación de sistemas eléctricos y electrónicos del vehículo para garantizar su correcto funcionamiento.",
      "preguntas": {
        "importancia": "¿Por qué es importante el buen estado del sistema electrónico del vehículo?",
        "duracion": "¿Cuánto tiempo dura el diagnóstico y ajuste de los sistemas electrónicos?",
        "frecuencia": "¿Cada cuánto se recomienda revisar el sistema electrónico del vehículo?"
      },
      "importancia": "Un sistema electrónico en buen estado asegura el funcionamiento de componentes esenciales como luces, sensores y sistemas de seguridad.",
      "duracion": "El diagnóstico y ajuste puede tomar entre 1 y 3 horas, dependiendo de la complejidad del sistema.",
      "frecuencia": "Recomendado realizar una revisión completa cada 12 meses o si hay fallos en componentes eléctricos."
    },
    "sincronizacion": {
      "title": "Sincronización",
      "description": "Ajuste de los tiempos y sistemas del motor para asegurar un rendimiento óptimo y una combustión eficiente.",
      "preguntas": {
        "importancia": "¿Por qué es importante realizar la sincronización del motor?",
        "duracion": "¿Cuánto tiempo toma el servicio de sincronización del motor?",
        "frecuencia": "¿Cada cuánto se recomienda realizar la sincronización del motor?"
      },
      "importancia": "La sincronización adecuada del motor mejora la potencia, el consumo de combustible y prolonga la vida útil de componentes críticos.",
      "duracion": "Este servicio dura entre 2 y 4 horas, dependiendo del estado del motor.",
      "frecuencia": "Recomendado cada 10,000 a 15,000 km o si se detecta una pérdida de rendimiento en el motor."
    },
    "eléctricos": {
      "title": "Eléctricos",
      "description": "Diagnóstico, reparación y mantenimiento de los sistemas eléctricos del vehículo, incluyendo luces, alternador, batería y sensores.",
      "preguntas": {
        "importancia": "¿Por qué es importante mantener en buen estado los sistemas eléctricos del vehículo?",
        "duracion": "¿Cuánto tiempo toma el diagnóstico y mantenimiento de los sistemas eléctricos?",
        "frecuencia": "¿Cada cuánto se recomienda realizar un chequeo de los sistemas eléctricos?"
      },
      "importancia": "El sistema eléctrico es esencial para el funcionamiento de componentes críticos como las luces, el arranque del motor y los sistemas de seguridad. Un buen mantenimiento asegura un rendimiento confiable y evita problemas inesperados.",
      "duracion": "El diagnóstico y mantenimiento pueden durar entre 1 y 2 horas, dependiendo de los componentes revisados.",
      "frecuencia": "Recomendado realizar una revisión cada 12 meses o cuando se detecten fallas en el sistema eléctrico."
    },
    "cda": {
      "title": "CDA (Centro de Diagnóstico Automotriz)",
      "description": "Inspección tecnicomecánica y de emisiones realizada en centros especializados para asegurar que el vehículo cumpla con los requisitos de seguridad y medioambientales.",
      "preguntas": {
        "importancia": "¿Por qué es importante realizar la revisión tecnicomecánica?",
        "duracion": "¿Cuánto tiempo tarda el proceso de inspección en un CDA?",
        "frecuencia": "¿Cada cuánto es obligatoria la revisión tecnicomecánica en un CDA?"
      },
      "importancia": "La revisión tecnicomecánica es obligatoria y asegura que el vehículo cumpla con los estándares de seguridad y emisiones, contribuyendo a la seguridad vial y la protección del medio ambiente.",
      "duracion": "El proceso de inspección suele durar entre 45 minutos y 1 hora.",
      "frecuencia": "Obligatoria cada año para vehículos particulares, según la normativa vigente."
    }
  }

  let contenido = seo?.[servicio];
  if (contenido) {
    contenido.description = contenido.description
      .replace(/{ciudad}/g, ciudad)
      .replace(/{vehiculo}/g, vehiculo);
  }

  return contenido || null;
}