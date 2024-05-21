import Layout from "@/src/Components/Layout";
import styles from '@/styles/PicoYPlaca.module.css'
import data from '@/pages/picoyplaca.json'
import Link from "next/link";
import { useRouter } from "next/router";
export default function PicoYPlaca({ data }) {
  const { query, asPath, push } = useRouter();


  return (
    <Layout title={`Pico y Placa  ${query.ciudad ? query.ciudad : 'Medellín'}  ${query?.month ? query?.month.split('-')[0] : ''}`} description={'Consulta el Pico y Placa de Medellín para cada día del mes de marzo. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías de la ciudad.'} keywords={'Pico y Placa, Medellín, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, Marzo 2024, Vehículos particulares, Regulaciones de tráfico'}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>
        <h1 className={styles.title}>Pico y Placa {query?.month && query.month.split('-')[0]} {query.ciudad ? query.ciudad : 'Medellín'} </h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para {query?.month ? query.month.split('-')[0] : 'el 2024'} en Medellín.</p>

        {data ? data?.map(el => (
          <Link href={`pico-y-placa-hoy/${el.ciudad}/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin: '0 auto' }}>
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
        ))
          :
          <>
            <h3>Medellín</h3>
            <div onClick={() => push('/pico-y-placa-hoy?ciudad=medellin&&month=Mayo-4')} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
              <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Mayo</h4>
              </div>
            </div>

            <h3>Bucaramanga</h3>

            <div onClick={() => push('/pico-y-placa-hoy?ciudad=bucaramanga&&month=Mayo-4')} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
              <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Mayo</h4>
              </div>
            </div>
          </>
        }
      </div>
      <section>
        <h2>Pico y placa hoy {query.ciudad ? query.ciudad : 'Medellín'}</h2>
        <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
        <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>
      </section>
    </Layout>

  )
}

export async function getServerSideProps({ query }) {
  if (query.month) {
    return {
      props: {
        data:
          data?.picoyplaca[query?.month?.split('-')[1]].filter(el => el?.ciudad?.toLowerCase() === query.ciudad.toLowerCase())
      }
    }
  }
  return {
    props: {

    }

  }
}
