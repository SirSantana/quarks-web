import Layout from "@/src/Components/Layout";
import picoyplaca from '@/pages/picoyplaca.json'
import styles from '@/styles/PicoYPlaca.module.css'
import { useRouter } from "next/router";
import Link from "next/link";

let keyWords = [
  "Pico y Placa Bogotá",
  "Restricciones de circulación",
  "Horario Pico y Placa",
  "Consulta Pico y Placa",
  "Movilidad en Bogotá",
  "Tráfico en Bogotá",
  "Multas Pico y Placa",
  "Planificar ruta en Bogotá",
  "Calendario Pico y Placa",
  "Pico y placa mañana",
  "Pico y placa Bogota hoy",
  "pico y placa hoy",
  "pico y placa bogota mañana",
  "pico y placa hoy en bogotá",
  "hora pico y placa bogota",
  "Normativa de tránsito",
  "Evitar sanciones Pico y Placa",
  "Circulación vehicular",
  "Desplazamientos en Bogotá",
  "Regulación de tráfico",
  "Movilidad urbana"
]
export default function PicoYPlaceHoyBogota({ data }) {
  const router = useRouter()

  const picoyplacaAnteriores = picoyplaca.picoyplaca.filter(el => el.index < data?.index).reverse().slice(0, 3)
  const picoyplacaDespues = picoyplaca.picoyplaca.filter(el => el.index > data?.index).slice(0, 3)

  console.log(picoyplacaDespues);
  return (
    <Layout title={`Pico y Placa Bogota Hoy ${data?.titulo?.replaceAll('-', ' ')}`} icon={'/pico-y-placa.png'} image={'./pico-y-placa.png'} description={`Consulta el Pico y Placa en Bogota hoy ${data?.titulo?.replaceAll('-', ' ')} de forma rápida y sencilla. Evita multas y planifica tus desplazamientos con nuestra herramienta actualizada al instante. Descubre las restricciones de circulación, horarios y recomendaciones para mejorar tu movilidad en la ciudad. ¡Planifica tu día con anticipación y evita contratiempos en tu ruta!`} keywords={keyWords} lastModified={new Date(data?.fecha).toGMTString()}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pico y Placa Hoy {data?.titulo.replaceAll('-', ' ')}</h1>
        <div className={styles.containerPlaca}>
          <div style={{ backgroundColor: 'transparent', border: '5px solid black', borderRadius: '10px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            {data?.placas !== 'NO APLICA'
              &&
              <p className={styles.textOne}>No pueden circular vehiculos con placas terminadas en:</p>
            }
            {data?.especial
              ?
              <div className={styles.containerPlacasEspecial}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[0]}</p>
                  <p className={styles.horario2}>{data?.horario[0]}</p>
                </div>
                <div style={{ height: '80%', backgroundColor: 'black', width: '5px', margin: '0 auto' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[1]}</p>
                  <p className={styles.horario2}>{data?.horario[1]}</p>
                </div>
              </div>
              :
              <>
                <p className={styles.placas}>{data?.placas}</p>
                {data?.placas !== 'NO APLICA'
                  &&
                  <p className={styles.horario}>{data?.horario}</p>
                }
              </>

            }
          </div>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa Hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Pico y placa hoy {data?.fechaFormat.replaceAll('-', ' ')} en Bogotá, no podrán circular vehiculos con placas terminas en {data?.placas} {data?.placas !== 'NO APLICA' && ', desde las ' + data?.horario}</p>
        </div>

        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa anteriores dias de Marzo</h2>
          {picoyplacaAnteriores?.map(el => (
            <Link scroll={true} href={`/pico-y-placa-hoy-bogota/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
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
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Placa siguientes dias de Marzo</h2>
          {picoyplacaDespues?.map(el => (
            <Link scroll={true} href={`/pico-y-placa-hoy-bogota/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
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
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Conoce el pico y placa del mes de Marzo</h2>
          <div onClick={() => router.push('/pico-y-placa-hoy-bogota')} style={{ cursor: 'pointer', marginTop: '4px', width: '300px' }} className={styles.containerMiniPlaca}>
            <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>Pico y Placa</h4>
            </div>
          </div>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px' }}>
          <h2>Pico y Placa</h2>
          <p>Conoce el Pico y Placa en Bogotá para este {data?.titulo.replaceAll('-', ' ')}</p>
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
        </div>
       
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>Pico y Pl</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en Bogotá: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en Bogotá. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>hora pico y placa bogota</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>No podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </div>
        <div style={{ margin: '32px 0', width: '95%', maxWidth: '600px', }}>
          <h2>pico y placa bogota hoy</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>{data?.placas === 'NO APLICA' ? 'NO APLICA' : <>No podrán circular vehículos con restricción en el horario: <span style={{ fontWeight: '700' }}>{data?.horario}</span></>}</p>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {

  let picoYplacaHoy = picoyplaca?.picoyplaca.find(el => el.fechaFormat.toLowerCase() == String(query.id))
  return {
    props: {
      data:
        picoYplacaHoy
    }

  }
}
