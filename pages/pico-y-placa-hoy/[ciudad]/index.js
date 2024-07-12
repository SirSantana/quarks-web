
import Layout from '@/src/Components/Layout'
import styles from '@/styles/PicoYPlaca.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

let horariosCiudades={
  "Medellin": {dias:['Lunes','Martes','Miércoles','Jueves','Viernes'],
  horarios:['05:00', '20:00']},
  "Bogota": {dias:['Lunes','Martes','Miércoles','Jueves','Viernes'],
  horarios:['06:00', '21:00']},
  "Bucaramanga": {dias:['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  horarios:['06:00', '20:00']},
}

export default function PicoYPlacaCiudad({ciudad}) {
  const router = useRouter()
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Pico y Placa ${ciudad}`,
    "description": `Consulta la información oficial y actualizada sobre el Pico y Placa en ${ciudad}. Horarios, excepciones, multas y consejos para cumplir con la normativa.`,
    "url": `https://quarks.com.co/pico-y-placa-hoy/${ciudad?.toLowerCase()}`,
    "mainEntity": [{
      "@type": "HowTo",
      "name": `Cómo verificar el Pico y Placa en ${ciudad}`,
      "step": [{
        "@type": "HowToStep",
        "text": "Identifica el último dígito de tu placa"
      },{
        "@type": "HowToStep",
        "text": "Consulta el calendario de restricciones"
      },{
        "@type": "HowToStep",
        "text": "Verifica si tu vehículo está exento"
      }]
    },{
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `¿Cómo funciona el Pico y Placa en ${ciudad}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `El Pico y Placa en ${ciudad} es una medida que restringe la circulación de vehículos según el último dígito de su placa en determinados días y horarios.`
          }
        },
        {
          "@type": "Question",
          "name": `¿Cuales son las restricciones del Pico y Placa en ${ciudad}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Las restriccion de Pico y Placa en ${ciudad} varian segun el dia y fecha. Consulta el calendario de restricciones para obtener la información actualizada.`
          }
        },
      ]
    }],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [horariosCiudades[ciudad]?.dias],
      "opens": horariosCiudades[ciudad]?.horarios[0],
      "closes": horariosCiudades[ciudad]?.horarios[1],
    }],
    "datePublished": "2024-01-01T00:00:00+00:00", // Fecha de publicación inicial
    "dateModified": new Date().toISOString(), // Fecha de última modificación
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
    <Layout title={`Pico y Placa ${ciudad}`} picoyplacaStructured={structuredData} description={`Consulta el Pico y Placa en la ciudad de ${ciudad}. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en ${ciudad}.`} keywords={`Pico y Placa, ${ciudad}, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, , Vehículos particulares, Regulaciones de tráfico`}>
      <div style={{ alignItems: 'flex-start', width: '90%', maxWidth: '1100px',  marginBottom: '64px' }} className={styles.container}>


        <h1 className={styles.title}>Pico y Placa en {ciudad} </h1>
        <p style={{fontSize:'14px'}}>Bienvenido a la guía definitiva del Pico y Placa en {ciudad}. Aquí encontrarás toda la información actualizada sobre las restricciones vehiculares en nuestra ciudad. </p>
        <Image loading='lazy'  src={'/pico y placa banner.jpg'} alt={`Pico y placa ${ciudad}`} width={800} height={400} style={{objectFit:'cover', margin:'32px 0', width:'90%', maxWidth:'600px', height:'30%', maxHeight:'400px'}}  />
        <Link href={`${router.asPath}/mayo`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black',maxWidth:'400px', width: '95%', borderRadius: '10px', padding: '8px', margin: '32px auto', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '24px', fontWeight: '700' }}>PICO Y PLACA Mayo</h4>
          </div>
        </Link>
        <Link href={`${router.asPath}/junio`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black',maxWidth:'400px', width: '95%',  borderRadius: '10px', padding: '8px', margin: '32px auto', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '24px',  fontWeight: '700' }}>PICO Y PLACA Junio</h4>
          </div>
        </Link>
        <Link href={`${router.asPath}/julio`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black',maxWidth:'400px', width: '95%', borderRadius: '10px', padding: '8px', margin: '32px auto', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '24px',  fontWeight: '700' }}>PICO Y PLACA Julio</h4>
          </div>
        </Link>
      </div>

      <section style={{ width: '90%', maxWidth: '1100px', margin: '0 auto', marginBottom: '64px' }}>
        <div>
          <h2>Pico y placa hoy {ciudad ? ciudad : 'Medellín'}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {ciudad ? ciudad : 'Medellín'}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {ciudad ? ciudad : 'Medellín'}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
        </div>
        <h2 style={{ margin: '32px 0px 16px 0 ' }}>Conoce las medidas de Pico y placa en {ciudad ? ciudad : 'Medellín'}</h2>

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
          <p>Mantente informado sobre cualquier cambio en la normativa del Pico y Placa en {ciudad}. Las autoridades pueden ajustar los horarios y las reglas en respuesta a las condiciones de tráfico y la calidad del aire.</p>
        </div>
      </section>
    </Layout>

  )
}

export async function getStaticPaths() {
  const ciudades = ['Medellin', 'Bogotá', 'Cali'] // Agrega todas las ciudades relevantes
  const paths = ciudades.map((ciudad) => ({
    params: { ciudad: ciudad.toLowerCase() },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  if (!params.ciudad) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      ciudad: params.ciudad.charAt(0).toUpperCase() + params.ciudad.slice(1),
    },
  }
}