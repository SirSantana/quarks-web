import Layout from "@/src/Components/Layout";
import styles from '@/styles/PicoYPlaca.module.css'
import data from '@/pages/picoyplaca.json'
import Link from "next/link";
import { useRouter } from "next/router";
export default function PicoYPlaca({ data }) {
  const router = useRouter();

  return (
    <Layout title={'Pico y Placa Bogota Marzo'} description={'Consulta el Pico y Placa de Bogotá para cada día del mes de marzo. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías de la ciudad.'} keywords={'Pico y Placa, Bogotá, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, Marzo 2024, Vehículos particulares, Regulaciones de tráfico'}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>
        <h1  className={styles.title}>Pico y Placa Marzo. Bogotá </h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para el mes de Marzo en Bogotá.</p>

        {data?.map(el => (
          <Link href={`${router.asPath}/${el?.fechaFormat.toLowerCase()}`} style={{ color: 'black', textDecoration: 'none', width: '90%', margin:'0 auto' }}>
            <div className={styles.containerCardOnePico} >
              <div>
                <h2>{el.titulo.replaceAll('-', ' ')}</h2>
                <p>Vehículos Particulares</p>
                <h3 style={{ marginTop: '16px' }}>{el?.placas === 'NO APLICA' ? 'SIN RESTRICCIÓN'  : el?.especial?'Pico y Placa Especial': el.horario}</h3>
              </div>
              {el?.especial
                ?
                <div>
                  <h3 style={{ marginTop: '16px' }}>{el.horario[0]}</h3>
                  <div style={{marginTop:'4px'}} className={styles.containerMiniPlaca}>
                    <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                      <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[0]}</h4>
                    </div>
                  </div>
                  <h3 style={{ marginTop: '16px' }}>{el.horario[1]}</h3>

                  <div style={{marginTop:'4px'}}  className={styles.containerMiniPlaca}>
                    <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                      <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>{el.placas[1]}</h4>
                    </div>
                  </div>
                </div>

                :
                <div className={styles.containerMiniPlaca}>
                  <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                    <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>{el.placas}</h4>
                  </div>
                </div>
              }
            </div>
            <div style={{ width: '100%', backgroundColor: '#C6C6C6', height: '1px', margin: '16px 0', width: '95%', maxWidth: '800px' }} />
          </Link>
        ))}
      </div>

    </Layout>

  )
}

export async function getServerSideProps() {
  return {
    props: {
      data:
        data?.picoyplaca
    }

  }
}
