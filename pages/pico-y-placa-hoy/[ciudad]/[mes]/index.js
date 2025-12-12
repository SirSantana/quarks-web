import data from '@/pages/picoyplaca.json'
import Layout from '@/src/Components/Layout'
import styles from '@/styles/PicoYPlaca.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

let horariosCiudades = {
  "medellin": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horarios: ['05:00', '20:00']
  },
  "bogota": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horarios: ['06:00', '21:00']
  },
  "bucaramanga": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    horarios: ['06:00', '20:00']
  },
}
let ciudades = {
  'bogota': 'Bogotá',
  'medellin': 'Medellín',
  'bucaramanga': 'Bucaramanga',
}

// Función para capitalizar la primera letra de una cadena
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}


export default function PicoYPlaca({ data }) {
  const { query, asPath } = useRouter()
  
  // Nombres de ciudad y mes capitalizados para uso en títulos
  const ciudadDisplay = ciudades[query.ciudad] || 'Medellín';
  const mesDisplay = capitalize(query.mes || 'el 2024');
  
  // URL Canónica Completa
  const canonicalUrl = `https://quarks.com.co/pico-y-placa-hoy/${query.ciudad?.toLowerCase()}/${query.mes?.toLowerCase()}`;


  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    // Título más natural y menos técnico
    "name": `Pico y Placa ${mesDisplay} en ${ciudadDisplay} | Restricciones Vehiculares`, 
    "description": `Consulta la información oficial y actualizada sobre el Pico y Placa en ${ciudadDisplay} el mes de ${mesDisplay}. Horarios, excepciones, multas y consejos para cumplir con la normativa.`,
    "url": canonicalUrl,
    "mainEntity": [{
      "@type": "HowTo",
      // Título del HowTo más detallado
      "name": `Cómo revisar la restricción de Pico y Placa en ${ciudadDisplay} para ${mesDisplay}`, 
      "step": [{
        "@type": "HowToStep",
        "text": "Identifica el último dígito de tu placa y el tipo de vehículo"
      }, {
        "@type": "HowToStep",
        "text": "Consulta el calendario de restricciones diarias de ${ciudadDisplay}"
      }, {
        "@type": "HowToStep",
        "text": "Verifica los horarios de la medida y las posibles exenciones"
      }]
    }, {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `¿Cómo funciona el Pico y Placa en ${ciudadDisplay} durante ${mesDisplay}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            // Respuesta mejorada usando la data con un límite de caracteres
            "text": `El Pico y Placa en ${ciudadDisplay} funciona de la siguiente manera: ${data.slice(0, 5).map(el => el.titulo.replaceAll('-', ' ') + ' ' + (el.placas === 'NO APLICA' ? 'SIN RESTRICCIÓN' : el.placas)).join('; ')}. Es una medida de restricción vehicular según el último dígito de la placa en determinados días y horarios.`,
          }
        },
        {
          "@type": "Question",
          "name": `¿Cuáles son los horarios de la restricción del Pico y Placa en ${ciudadDisplay}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Generalmente, el horario del Pico y Placa en ${ciudadDisplay} es de ${horariosCiudades[query.ciudad]?.horarios[0]} a ${horariosCiudades[query.ciudad]?.horarios[1]} durante los días hábiles. Consulta la información diaria para confirmar.`,
          }
        },
      ]
    }],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      // Se asegura que los días sea un array de strings, no un array dentro de un array
      "dayOfWeek": horariosCiudades[query.ciudad]?.dias, 
      "opens": horariosCiudades[query.ciudad]?.horarios[0],
      "closes": horariosCiudades[query.ciudad]?.horarios[1],
    }],
    "datePublished": data && data.length > 0 ? new Date(data[0].fecha).toISOString() : new Date().toISOString(), 
    "dateModified": data && data.length > 0 ? new Date(data[0].fecha).toISOString() : new Date().toISOString(), 
    "author": {
      "@type": "Organization",
      "name": "Quarks Automotriz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quarks Automotriz",
    }
  };

  return (
    <Layout 
      title={`Pico y Placa ${mesDisplay} en ${ciudadDisplay} | Restricciones Vehiculares`}
      picoyplacaStructured={structuredData} 
      canonical={canonicalUrl} // Implementación de la URL Canónica
      description={`Consulta el Pico y Placa de ${ciudadDisplay} para cada día del mes de ${mesDisplay}. Entérate de las restricciones vehiculares, horarios y planifica tu viaje eficientemente para evitar contratiempos.`} 
      keywords={`Pico y Placa ${ciudadDisplay}, ${ciudadDisplay}, Restricciones vehiculares ${ciudadDisplay}, Tráfico ${ciudadDisplay}, Movilidad ${ciudadDisplay}, Pico y Placa ${mesDisplay}, Horarios Pico y Placa, Calendario Pico y Placa ${ciudadDisplay}`}
    >
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>
        {/* Título Principal optimizado */}
        <h1 className={styles.title}>Pico y Placa {mesDisplay.replaceAll('-', ' ')} en {ciudadDisplay}</h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para {ciudadDisplay} en {mesDisplay.replaceAll('-', ' ')}.</p>
        
        {/* Atributos alt/title de Imagen mejorados */}
        <Image 
          title={`Calendario oficial Pico y Placa ${ciudadDisplay} ${mesDisplay}`} 
          loading='lazy' 
          src={'/pico y placa banner.jpg'} 
          alt={`Calendario de Pico y Placa ${ciudadDisplay} ${mesDisplay}. Consulta restricciones por placa y horario.`} 
          width={800} 
          height={400} 
          style={{ objectFit: 'cover', margin: '32px 0', width: '90%', maxWidth: '600px', height: '30%', maxHeight: '400px' }} 
        />

        {/* ... (El mapeo de la data sigue igual) */}
        {data && data?.map(el => (
          <div style={{ width: '100%' }} key={el.fechaFormat}>
            <Link href={`${asPath}/${el.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
              <div className={styles.containerCardOnePico} >
                <div>
                  <h2>{el.titulo.replaceAll('-', ' ')}</h2>
                  <p>Vehículos Particulares</p>
                  <h3 style={{ marginTop: '16px' }}>{el?.placas === 'NO APLICA' ? 'SIN RESTRICCIÓN' : el?.especial ? 'Pico y Placa Especial' : el.horario}</h3>
                </div>
                <div className={styles.containerMiniPlaca}>
                  <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                    <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas}</h4>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', backgroundColor: '#C6C6C6', height: '1px', margin: '16px 0', width: '95%', maxWidth: '800px' }} />
            </Link>
          </div>
        ))}

      </div>
      <section style={{ width: '90%', maxWidth: '1100px', margin: '0 auto', marginBottom: '64px' }}>
        <div>
          {/* Título de Contenido Principal optimizado */}
          <h2>Pico y Placa mes de {mesDisplay.replaceAll('-', ' ')} en {ciudadDisplay}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {ciudadDisplay}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad durante **{mesDisplay}**.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {ciudadDisplay}. Evita sanciones y optimiza tus desplazamientos en la ciudad con nuestra guía actualizada.</p>
        </div>
        <h2 style={{ margin: '32px 0px 16px 0 ' }}>Conoce las medidas de Pico y Placa de {mesDisplay} en {ciudadDisplay}</h2>

        {/* ... (El resto del contenido informativo es consistente y usa las variables Display) */}
        <div>
          <h3 style={{ margin: '48px 0px 16px 0 ' }}>Consejos para Evitar Multas del Pico y Placa en {ciudadDisplay}</h3>
          <p>Para evitar multas y sanciones, sigue estos consejos:</p>
          <ul>
            <li>Revisa el calendario del Pico y Placa antes de planificar tu viaje.</li>
            <li>Usa aplicaciones móviles para estar al tanto de las restricciones diarias.</li>
            <li>Considera alternativas de transporte como el uso de bicicletas, transporte público o el carpooling.</li>
          </ul>
        </div>

        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Impacto del Pico y Placa en la Movilidad Urbana</h3>
          <p>El Pico y Placa tiene un impacto significativo en la movilidad urbana. Ayuda a reducir la congestión vehicular, mejora la calidad del aire y fomenta el uso de transporte público.</p>
        </div>
        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Excepciones y Vehículos Exentos de Pico y Placa en {ciudadDisplay}</h3>
          <p>Algunos vehículos están exentos de las restricciones del Pico y Placa, como los de emergencia, eléctricos y de servicio público. Consulta la normativa oficial de **{ciudadDisplay}** para obtener una lista completa de exenciones.</p>
        </div>
        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Últimas Actualizaciones y Cambios en la Normativa de {ciudadDisplay}</h3>
          <p>Mantente informado sobre cualquier cambio en la normativa del Pico y Placa en {ciudadDisplay}. Las autoridades pueden ajustar los horarios y las reglas en respuesta a las condiciones de tráfico y la calidad del aire.</p>
        </div>
      </section>
    </Layout>
  )
}


export async function getStaticPaths() {
  return {
    paths: [], // Se generarán bajo demanda
    fallback: 'blocking', // Bloquea hasta que la página se genere
  };
}

export async function getStaticProps({ params }) {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const [monthQuery, yearQuery] = params.mes.split('-');

  if (!meses.includes(monthQuery)) {
    return {
      notFound: true, // Si el mes no es válido, devuelve una página 404
    };
  }

  const monthIndex = meses.indexOf(monthQuery);
  let filteredData = [];

  if (params.ciudad.toLowerCase() === 'bogota') {
    filteredData = data.picoyplaca[yearQuery][monthIndex].filter(el => !el.ciudad);
  } else {
    filteredData = data.picoyplaca[yearQuery][monthIndex].filter(
      el => el.ciudad && el.ciudad.toLowerCase() === params.ciudad.toLowerCase()
    );
  }

  return {
    props: {
      data: filteredData || [],
    },
    revalidate: 1000000, 
  };
}