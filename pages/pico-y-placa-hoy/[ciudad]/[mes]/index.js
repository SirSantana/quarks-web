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
export default function PicoYPlaca({ data }) {
  const { query, asPath } = useRouter()
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Pico y Placa ${ciudades[query.ciudad]} ${query.mes}`,
    "description": `Consulta la información oficial y actualizada sobre el Pico y Placa en ${ciudades[query.ciudad]} el mes de ${query.mes}. Horarios, excepciones, multas y consejos para cumplir con la normativa.`,
    "url": `https://quarks.com.co/pico-y-placa-hoy/${query.ciudad?.toLowerCase()}/${query.mes?.toLowerCase()}`,
    "mainEntity": [{
      "@type": "HowTo",
      "name": `Cómo saber si tu vehiculo tiene restriccion de Pico y Placa en ${query.ciudad} el mes de ${query.mes}`,
      "step": [{
        "@type": "HowToStep",
        "text": "Identifica el último dígito de tu placa"
      }, {
        "@type": "HowToStep",
        "text": "Consulta el calendario de restricciones"
      }, {
        "@type": "HowToStep",
        "text": "Verifica si tu vehículo está exento"
      }]
    }, {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `¿Cómo funciona el Pico y Placa en ${query.ciudad} el mes de ${query.mes}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `El Pico y Placa en ${query.ciudad} funcionara de la siguiente manera: ${data.map(el => el.titulo.replaceAll('-', ' ') + ' ' + el.placas)}. El pico y placa en ${query.ciudad} el mes de ${query.mes} es una medida que restringe la circulación de vehículos según el último dígito de su placa en determinados días y horarios.`
          }
        },
        {
          "@type": "Question",
          "name": `¿Cuales son las restricciones del Pico y Placa en ${query.ciudad} en ${query.mes}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Las restriccion de Pico y Placa en ${query.ciudad} varian segun el dia y fecha. Consulta el calendario de restricciones para obtener la información actualizada.`
          }
        },
      ]
    }],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [horariosCiudades[query.ciudad]?.dias],
      "opens": horariosCiudades[query.ciudad]?.horarios[0],
      "closes": horariosCiudades[query.ciudad]?.horarios[1],
    }],
    "datePublished": `${new Date(data[0].fecha).toISOString()}`, // Fecha de publicación inicial
    "dateModified": `${new Date(data[0].fecha).toISOString()}`, // Fecha de última modificación
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
    <Layout title={`Pico y Placa ${query.mes} en ${query.ciudad ? ciudades[query.ciudad] : 'Medellín'} `} picoyplacaStructured={structuredData} description={`Consulta el Pico y Placa de ${query.ciudad} para cada día del mes de ${query.mes}. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías de la ciudad.`} keywords={'Pico y Placa, Medellín, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, Vehículos particulares, Regulaciones de tráfico'}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>
        <h1 className={styles.title}>Pico y Placa {query?.mes && query.mes} {query.ciudad ? ciudades[query.ciudad] : 'Medellín'} </h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para {query.ciudad ? ciudades[query.ciudad] : 'Medellín'} en {query?.mes ? query.mes : 'el 2024'}.</p>
        <Image title={`Pico y Placa en ${query.ciudad}`} loading='lazy' src={'/pico y placa banner.jpg'} alt={`Pico y placa ${query.ciudad} ${query.mes}`} width={800} height={400} style={{ objectFit: 'cover', margin: '32px 0', width: '90%', maxWidth: '600px', height: '30%', maxHeight: '400px' }} />

        {data && data?.map(el => (
          <div style={{ width: '100%' }}>

            <Link href={`${asPath}/${el.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
              <div className={styles.containerCardOnePico} >
                <div>
                  <h2>{el.titulo.replaceAll('-', ' ')}</h2>
                  <p>Vehículos Particulares (Carros y Motos)</p>
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
          <h2>Pico y placa mes de {query.mes} en {query.ciudad ? query.ciudad : 'Medellín'}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
        </div>
        <h2 style={{ margin: '32px 0px 16px 0 ' }}>Conoce las medidas de Pico y placa de {query.mes} en {query.ciudad ? query.ciudad : 'Medellín'}</h2>

        <div>
          <h3 style={{ margin: '48px 0px 16px 0 ' }}>Consejos para Evitar Multas</h3>
          <p>Para evitar multas y sanciones, sigue estos consejos:</p>
          <ul>
            <li>Revisa el calendario del Pico y Placa antes de planificar tu viaje.</li>
            <li>Usa aplicaciones móviles para estar al tanto de las restricciones diarias.</li>
            <li>Considera alternativas de transporte como el uso de bicicletas, transporte público o el carpooling.</li>
          </ul>
        </div>

        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Impacto del Pico y Placa en la Movilidad</h3>
          <p>El Pico y Placa tiene un impacto significativo en la movilidad urbana. Ayuda a reducir la congestión vehicular, mejora la calidad del aire y fomenta el uso de transporte público.</p>
        </div>
        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Excepciones y Vehículos Exentos</h3>
          <p>Algunos vehículos están exentos de las restricciones del Pico y Placa, como los de emergencia, eléctricos y de servicio público. Consulta la normativa para obtener una lista completa de exenciones.</p>
        </div>
        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Últimas Actualizaciones y Cambios en la Normativa</h3>
          <p>Mantente informado sobre cualquier cambio en la normativa del Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}. Las autoridades pueden ajustar los horarios y las reglas en respuesta a las condiciones de tráfico y la calidad del aire.</p>
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