import Layout from "@/src/Components/Layout";
import styles from '@/styles/PicoYPlaca.module.css'
import picoyplaca from '@/pages/picoyplaca.json'

import Link from "next/link";
import { useRouter } from "next/router";

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
export default function PicoYPlaca({ data }) {
  const router = useRouter()
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const numeroMes = meses.indexOf(router.query.slug[1].split('-')[2]);
  let date = new Date(data?.fecha)

  // const picoyplacaAnteriores = picoyplaca.picoyplaca[numeroMes].filter(el => el.index < data?.index).reverse().slice(0, 3)
  // const picoyplacaDespues = picoyplaca.picoyplaca[numeroMes].filter(el => el.index > data?.index).slice(0, 3)
  let keyWords = [
    `Pico y Placa ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    "Restricciones de circulación",
    "Horario Pico y Placa",
    "Consulta Pico y Placa",
    `Movilidad en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    `Tráfico en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    "Multas Pico y Placa",
    `Planificar ruta en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    "Calendario Pico y Placa",
    "Pico y placa mañana",
    `Pico y placa ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''} hoy`,
    "pico y placa hoy",
    `pico y placa ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''} mañana`,
    `pico y placa hoy en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    `hora pico y placa ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    "Normativa de tránsito",
    "Evitar sanciones Pico y Placa",
    "Circulación vehicular",
    `Desplazamientos en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`,
    "Regulación de tráfico",
    `Movilidad urbana en ${router.query.slug && router.query.slug.length > 0 ? router.query.slug[0] : ''}`
  ];
  return (
    <Layout title={`Pico y Placa ${router.query.slug[0]} Hoy ${data?.titulo?.replaceAll('-', ' ')}`} icon={'/pico-y-placa.png'} image={'./pico-y-placa.png'} description={`Consulta el Pico y Placa en ${router.query.slug[0]} hoy ${data?.titulo?.replaceAll('-', ' ')} de forma rápida y sencilla. Evita multas y planifica tus desplazamientos con nuestra herramienta actualizada al instante. Descubre las restricciones de circulación, horarios y recomendaciones para mejorar tu movilidad en la ciudad. ¡Planifica tu día con anticipación y evita contratiempos en tu ruta!`} keywords={keyWords} fecha={new Date(data?.fecha).toISOString()} lastModified={new Date(data?.fecha).toGMTString()}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pico y Placa Hoy {data?.titulo.replaceAll('-', ' ')} en {router.query.slug[0]}</h1>
        <section className={styles.containerPlaca}>
          <div style={{ backgroundColor: 'transparent', border: '5px solid black', borderRadius: '10px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            {data?.placas !== 'NO APLICA'
              &&
              <p className={styles.textOne}>No pueden circular vehiculos con placas terminadas en:</p>
            }
            <p className={styles.placas}>{data?.placas}</p>
            {data?.placas !== 'NO APLICA'
              &&
              <p className={styles.horario}>{data?.horario}</p>
            }
          </div>
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa Hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Pico y placa hoy {data?.fechaFormat.replaceAll('-', ' ')} en {router.query.slug[0]}, no podrán circular vehiculos con placas terminas en {data?.placas} {data?.placas !== 'NO APLICA' && ', desde las ' + data?.horario}</p>
        </section>
       
        
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h3 style={{ marginBottom: '16px' }}>Conoce el pico y placa del mes de {meses[numeroMes]}</h3>
          <div onClick={() => router.push(`/pico-y-placa-hoy?ciudad=${router.query.slug[0]}&&month=${meses[numeroMes]}-${numeroMes}`)} style={{ cursor: 'pointer', marginTop: '4px', width: '300px' }} className={styles.containerMiniPlaca}>
            <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>Pico y Placa</h4>
            </div>
          </div>
        </section>
        <h4>Encuentra los mejores repuestos para tu Chevrolet</h4>
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
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px' }}>
          <h2>Pico y Placa</h2>
          <p>Conoce el Pico y Placa en {router.query.slug[0]} para este {data?.titulo.replaceAll('-', ' ')}</p>
          <div style={{ margin: '16px 0' }}>
            <h3>Pico y Placa Carros Particulares:</h3>
            {data?.placas === 'NO APLICA'
              ?
              <p style={{ marginTop: '8px' }}>Hoy {data?.fechaFormat.replaceAll('-', ' ')} <span style={{ fontWeight: '700' }}>NO  hay restricciones.</span></p>

              :
              data?.especial
                ?
                <>
                  <p style={{ marginTop: '8px' }}><span style={{ fontWeight: '700' }}>NO podrán</span>  circular las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas[0]}</span>  de <span style={{ fontWeight: '700' }}> Horario:</span> {data?.horario[0]} y las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas[1]}</span>  de <span style={{ fontWeight: '700' }}>Horario:</span> {data?.horario[1]}</p>
                </>

                :
                <p style={{ marginTop: '8px' }}><span style={{ fontWeight: '700' }}>NO podrán</span>  circular las placas terminadas en <span style={{ fontWeight: '700' }}>{data?.placas}</span> de <span style={{ fontWeight: '700' }}>Horario:</span> {data?.horario}</p>
            }
          </div>
        </section>

        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Pl</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {router.query.slug[0]}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {router.query.slug[0]}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>hora pico y placa {router.query.slug[0]}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>No podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>pico y placa {router.query.slug[0]} hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>No podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Vehiculos particulars con placas terminas en {data?.placas} no podrán circular {data?.placas !== 'NO APLICA' && ' desde las ' + data?.horario} .</p>
        </section>
        <section style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa {router.query.slug[0]} {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}</h2>
          <h2>Pico y Placa {router.query.slug[0]} {data?.titulo.replaceAll('-', ' ')}</h2>
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
        </section>
      </div>
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

  const numeroMes = meses.indexOf(params.slug[1].split('-')[2]);

  if (numeroMes === -1 || !picoyplaca?.picoyplaca[numeroMes]) {
    return {
      notFound: true, // Muestra una página 404 si no hay datos
    };
  }

  let picoyplacafilterciudad = picoyplaca.picoyplaca[numeroMes].filter(
    el => el?.ciudad?.toLowerCase() === params.slug[0].toLowerCase()
  );

  let picoYplacaHoy = picoyplacafilterciudad.find(
    el => el.fechaFormat.toLowerCase() === String(params.slug[1]).toLowerCase()
  );

  return {
    props: {
      data: picoYplacaHoy || null,
    },
    revalidate: 1000000, 
  };
}