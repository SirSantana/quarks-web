import Layout from "@/src/Components/Layout";
import picoyplaca from '@/pages/picoyplaca.json'
import styles from '@/styles/PicoYPlaca.module.css'
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// let keyWords = [
//   "Pico y Placa Bogotá",
//   "Restricciones de circulación",
//   "Horario Pico y Placa",
//   "Consulta Pico y Placa",
//   "Movilidad en Bogotá",
//   "Tráfico en Bogotá",
//   "Multas Pico y Placa",
//   "Planificar ruta en Bogotá",
//   "Calendario Pico y Placa",
//   "Pico y placa mañana",
//   "Pico y placa Bogota hoy",
//   "pico y placa hoy",
//   "pico y placa bogota mañana",
//   "pico y placa hoy en bogotá",
//   "hora pico y placa bogota",
//   "Normativa de tránsito",
//   "Evitar sanciones Pico y Placa",
//   "Circulación vehicular",
//   "Desplazamientos en Bogotá",
//   "Regulación de tráfico",
//   "Movilidad urbana"
// ]
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
let repuestos = [
  {
    "repuesto": "Pastillas de freno Chevrolet Corsa",
    "precio": "90.000",
    "precioAnt": "98.000",
    "imagen": "https://http2.mlstatic.com/D_NQ_NP_2X_783125-MCO71919736666_092023-F.webp",
    "stock": 3,
    "fabricante": "Autotec U.S.A",
    "descuento": 3,
    "ventas": 4,
  },
  {
    "repuesto": "Muñecos / Bieleta Barra Estabilizadora Chevrolet Aveo",
    "precio": "76.000",
    "precioAnt": "85.000",
    "imagen": "https://http2.mlstatic.com/D_NQ_NP_2X_787143-MCO72599235153_102023-F.webp",
    "stock": 2,
    "fabricante": "Saher",
    "descuento": 0,
    "ventas": 2,
  },
  {
    "repuesto": "Impulsadores Chevrolet Captiva 2.4 - 3.0 - 3.6 (X16 Unds)",
    "precio": "380.000",
    "precioAnt": "410.000",
    "imagen": "https://http2.mlstatic.com/D_NQ_NP_2X_918317-MCO72595597482_112023-F.webp",
    "stock": 2,
    "fabricante": "Krammer U.S.A",
    "descuento": 0,
    "ventas": 2,
  }
]
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export default function PicoYPlaceHoyBogota({ data }) {
  const router = useRouter()
  const numeroMes = meses.indexOf(router.query.mes);
  // const picoyplacaAnteriores = picoyplaca.picoyplaca[numeroMes].filter(el => el.index < data?.index).reverse().slice(0, 3)
  // const picoyplacaDespues = picoyplaca.picoyplaca[numeroMes].filter(el => el.index > data?.index).slice(0, 3)
  let date = new Date(data?.fecha)
  console.log(router);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Pico y Placa ${ciudades[router.query.ciudad]} ${data?.titulo?.replaceAll('-', ' ')}`,
    "description": `Consulta la información oficial y actualizada sobre el Pico y Placa en ${ciudades[router.query.ciudad]} hoy ${data?.titulo?.replaceAll('-', ' ')}. Horarios, excepciones, multas y consejos para cumplir con la normativa.`,
    "url": `https://quarks.com.co/pico-y-placa-hoy/${router.query.ciudad?.toLowerCase()}/${router.query.mes?.toLowerCase()}/${data?.fechaFormat.toLowerCase()}`,
    "mainEntity": [{
      "@type": "HowTo",
      "name": `Cómo saber si tu vehiculo tiene restriccion de Pico y Placa en ${ciudades[router.query.ciudad]} el ${data?.titulo?.replaceAll('-', ' ').replace('Hoy', ' ')}`,
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
          "name": `¿Cómo funciona el Pico y Placa en ${ciudades[router.query.ciudad]} hoy ${data.titulo?.replaceAll('-', ' ')}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `El Pico y Placa hoy ${data.titulo?.replaceAll('-', ' ')} funcionara de la siguiente manera: Los vehiculos particulares con placas terminadas en ${data.placas} podrán circular ${data.placas !== 'NO APLICA' && 'desde las ' + data.horario}. El pico y placa es una medida que restringe la circulación de vehículos según el último dígito de su placa en determinados días y horarios.`
          }
        },
        {
          "@type": "Question",
          "name": `Pico y Placa ${data.titulo?.replaceAll('-', ' ')} ${ciudades[router.query.ciudad]}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Las restriccion de Pico y Placa para el dia ${data.titulo?.replaceAll('-', ' ')} en ${router.query.ciudad} seran: Vehiculo con placas terminadas en ${data.placas} podran circular. Consulta el calendario de restricciones para obtener la información actualizada.`
          }
        },
      ]
    }],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [horariosCiudades[router.query.ciudad]?.dias],
      "opens": horariosCiudades[router.query.ciudad]?.horarios[0],
      "closes": horariosCiudades[router.query.ciudad]?.horarios[1],
    }],
    "datePublished": `${new Date(data.fecha).toISOString()}`, // Fecha de publicación inicial
    "dateModified": `${new Date().toISOString()}`, // Fecha de última modificación
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
    <Layout picoyplacaStructured={structuredData} title={`Pico y Placa ${ciudades[router.query.ciudad]} Hoy ${data?.titulo?.replaceAll('-', ' ')}`} url={`${router.asPath}`} icon={'/pico-y-placa.png'} image={'./pico-y-placa.png'} description={`Consulta el Pico y Placa en Bogota hoy ${data?.titulo?.replaceAll('-', ' ')} de forma rápida y sencilla. Evita multas y planifica tus desplazamientos con nuestra herramienta actualizada al instante. Descubre las restricciones de circulación, horarios y recomendaciones para mejorar tu movilidad en la ciudad. ¡Planifica tu día con anticipación y evita contratiempos en tu ruta!`} fecha={new Date(data?.fecha).toISOString()} lastModified={new Date(data?.fecha).toGMTString()}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pico y Placa {router.query.ciudad} Hoy {data?.titulo.replaceAll('-', ' ')}</h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para el {data?.titulo.replaceAll('-', ' ')} en {router.query.ciudad}.</p>

        <section className={styles.containerPlaca}>
          <div style={{ backgroundColor: 'transparent', border: '5px solid black', borderRadius: '10px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            {/* {data?.placas !== 'NO APLICA'
              &&
              <p className={styles.textOne}>Pueden circular vehiculos con placas terminadas en:</p>
            } */}
            {data?.especial
              ?
              <div className={styles.containerPlacasEspecial}>
                <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[0]}</p>
                  <p className={styles.horario2}>{data?.horario[0]}</p>
                </article>
                <div style={{ height: '80%', backgroundColor: 'black', width: '5px', margin: '0 auto' }} />
                <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[1]}</p>
                  <p className={styles.horario2}>{data?.horario[1]}</p>
                </article>
              </div>
              :
              <>
                <p className={styles.placas}>{data?.placas}</p>
                {/* {data?.placas !== 'NO APLICA'
                  &&
                  <p className={styles.horario}>{data?.horario}</p>
                } */}
              </>

            }
          </div>
        </section>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa Hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Pico y placa hoy {data?.fechaFormat.replaceAll('-', ' ')} en {router.query.ciudad}, podrán circular vehiculos con placas terminas en {data?.placas} {data?.placas !== 'NO APLICA' && ', desde las ' + data?.horario}</p>
        </div>

        {/* <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h3 style={{ marginBottom: '16px' }}>Pico y Placa anteriores dias de {meses[numeroMes]}</h3>
          {picoyplacaAnteriores?.map(el => (
            <Link scroll={true} href={`/pico-y-placa-hoy/${router.query.ciudad}/${router.query.mes}/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
              <div className={styles.containerCardOnePico} >
                <div>
                  <h3>{el.titulo.replaceAll('-', ' ')}</h3>
                  <p>Vehículos Particulares</p>
                  <h3 style={{ marginTop: '16px' }}>{el?.placas === 'NO APLICA' ? 'SIN RESTRICCIÓN' : el?.especial ? 'Pico y Placa Especial' : el.horario}</h3>
                </div>
                {el?.especial
                  ?
                  <div>
                    <h3 style={{ marginTop: '16px' }}>{el.horario[0]}</h3>
                    <article style={{ marginTop: '4px' }} className={styles.containerMiniPlaca}>
                      <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                        <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[0]}</h4>
                      </div>
                    </article>
                    <h3 style={{ marginTop: '16px' }}>{el.horario[1]}</h3>

                    <article style={{ marginTop: '4px' }} className={styles.containerMiniPlaca}>
                      <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                        <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[1]}</h4>
                      </div>
                    </article>
                  </div>

                  :
                  <article className={styles.containerMiniPlaca}>
                    <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                      <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas}</h4>
                    </div>
                  </article>
                }
              </div>
              <div style={{ width: '100%', backgroundColor: '#C6C6C6', height: '1px', margin: '16px 0', width: '95%', maxWidth: '800px' }} />
            </Link>
          ))}
        </div> */}
        {/* <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h3 style={{ marginBottom: '16px' }}>Pico y Placa siguientes dias de {meses[numeroMes]}</h3>
          {picoyplacaDespues?.map(el => (
            <Link scroll={true} href={`/pico-y-placa-hoy/${router.query.ciudad}/${router.query.mes}/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
              <div className={styles.containerCardOnePico} >
                <div>
                  <h3>{el.titulo.replaceAll('-', ' ')}</h3>
                  <p>Vehículos Particulares</p>
                  <h3 style={{ marginTop: '16px' }}>{el?.placas === 'NO APLICA' ? 'SIN RESTRICCIÓN' : el?.especial ? 'Pico y Placa Especial' : el.horario}</h3>
                </div>
                {el?.especial
                  ?
                  <div>
                    <h3 style={{ marginTop: '16px' }}>{el.horario[0]}</h3>
                    <div style={{ marginTop: '4px' }} className={styles.containerMiniPlaca}>
                      <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                        <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[0]}</h4>
                      </div>
                    </div>
                    <h3 style={{ marginTop: '16px' }}>{el.horario[1]}</h3>

                    <div style={{ marginTop: '4px' }} className={styles.containerMiniPlaca}>
                      <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                        <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[1]}</h4>
                      </div>
                    </div>
                  </div>

                  :
                  <div className={styles.containerMiniPlaca}>
                    <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                      <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas}</h4>
                    </div>
                  </div>
                }
              </div>
              <div style={{ width: '100%', backgroundColor: '#C6C6C6', height: '1px', margin: '16px 0', width: '95%', maxWidth: '800px' }} />
            </Link>
          ))}
        </div> */}
        <Image loading='lazy' src={'/pico y placa banner.jpg'} alt={`Pico y placa ${router.query.ciudad} ${data?.titulo.replaceAll('-', ' ')}`} width={800} height={400} style={{ objectFit: 'cover', margin: '32px 0', width: '90%', maxWidth: '600px', height: '30%', maxHeight: '400px' }} />

        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h3 style={{ marginBottom: '16px' }}>Conoce el pico y placa del mes de {meses[numeroMes]}</h3>
          <div onClick={() => router.push(`/pico-y-placa-hoy/${router.query.ciudad}/${router.query.mes}`)} style={{ cursor: 'pointer', marginTop: '4px', width: '300px' }} className={styles.containerMiniPlaca}>
            <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>Pico y Placa</h4>
            </div>
          </div>
        </div>

        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px' }}>
          <h2>Pico y Placa</h2>
          <p>Conoce el Pico y Placa en {router.query.ciudad} para este {data?.titulo.replaceAll('-', ' ')}</p>
          <div style={{ margin: '16px 0' }}>
            <h3>Pico y Placa Carros Particulares:</h3>
            {data?.placas === 'NO APLICA'
              ?
              <p style={{ marginTop: '8px' }}>Hoy {data?.fechaFormat.replaceAll('-', ' ')} <span style={{ fontWeight: '700' }}>NO  hay restricciones.</span></p>

              :
              data?.especial
                ?
                <>
                  <p style={{ marginTop: '8px' }}><span style={{ fontWeight: '700' }}>Podrán</span>  circular las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas[0]}</span>  de <span style={{ fontWeight: '700' }}> Horario:</span> {data?.horario[0]} y las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas[1]}</span>  de <span style={{ fontWeight: '700' }}>Horario:</span> {data?.horario[1]}</p>
                </>

                :
                <p style={{ marginTop: '8px' }}><span style={{ fontWeight: '700' }}>Podrán</span>  circular las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas}</span> de <span style={{ fontWeight: '700' }}>Horario:</span> {data?.horario}</p>
            }
          </div>
        </div>

        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Pl</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {router.query.ciudad}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {router.query.ciudad}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>hora pico y placa {router.query.ciudad}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>Podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>pico y placa {router.query.ciudad} hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>Podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Vehiculos particulars con placas terminas en {data?.placas} podrán circular {data?.placas !== 'NO APLICA' && ' desde las ' + data?.horario} .</p>
        </div>
        {/* <h2>Encuentra los mejores repuestos para tu Chevrolet</h2>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '1000px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {repuestos.map(repuesto => (
            <Link href={'https://www.cotizatusrepuestos.com/'} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '16px', border: '1px solid #d9d9d9', borderRadius: '8px', maxWidth: '100%', width: '300px', margin: '0 auto' }}>
              <img src={repuesto?.imagen} style={{ width: '80%', height: '280px', objectFit: 'contain', margin: '0 auto' }} alt={repuesto?.repuesto} />
              <p>{repuesto.repuesto}</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>{repuesto.fabricante}</p>
              <p style={{ fontWeight: '600', color: '#f50057', fontSize: '12px', marginTop: '8px' }}>Antes ${repuesto.precioAnt}</p>
              <p style={{ fontWeight: '600', fontSize: '24px', marginTop: '8px' }}>${repuesto.precio}</p>
            </Link>
          ))}
        </section> */}
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa {router.query.ciudad} {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}</h2>
          <h2>Pico y Placa {router.query.ciudad} {data?.titulo.replaceAll('-', ' ')}</h2>
          <time dateTime={new Date(data?.fecha).toISOString()} itemProp="datePublished">
            {date.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}
          </time>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query, res }) {

  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // let picoYplacaHoy = picoyplaca?.picoyplaca[numeroMes].find(el => el.fechaFormat.toLowerCase() == String(query.dia))
  let picoYplacaHoy;
  let yearQuery = query.mes.split('-')[1];
  let monthQuery = query.mes.split('-')[0];
  const mesIndex = meses.indexOf(monthQuery);

  if (query.ciudad.toLowerCase() === 'bogota') {
    picoYplacaHoy = picoyplaca.picoyplaca[yearQuery][mesIndex].find(el => el.fechaFormat.toLowerCase() === String(query.dia).toLowerCase());
  } else {
    const filteredByCity = picoyplaca.picoyplaca[yearQuery][mesIndex]?.filter(el => el.ciudad && el.ciudad.toLowerCase() === query.ciudad.toLowerCase());
    picoYplacaHoy = filteredByCity?.find(el => el.fechaFormat.toLowerCase() === String(query.dia).toLowerCase());
  }
  if (picoYplacaHoy) {
    return {
      props: {
        data:
          picoYplacaHoy
      }
    }
  }
  else {
    res.setHeader('Location', `/pico-y-placa-hoy/${query.ciudad}/${query.mes}`); // Cambia '/nueva-ruta' a la ruta deseada
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return { props: {} };
  }
}
