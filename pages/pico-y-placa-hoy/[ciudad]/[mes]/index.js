import data from '@/pages/picoyplaca.json'
import Layout from '@/src/Components/Layout'
import styles from '@/styles/PicoYPlaca.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PicoYPlaca({ data }) {
  const { query, asPath } = useRouter()
  console.log(data);
  return (
    <Layout title={`Pico y Placa ${query.mes} en ${query.ciudad ? query.ciudad : 'Medellín'} `} description={`Consulta el Pico y Placa de ${query.ciudad} para cada día del mes de ${query.mes}. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías de la ciudad.`} keywords={'Pico y Placa, Medellín, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, Vehículos particulares, Regulaciones de tráfico'}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>
        <h1 className={styles.title}>Pico y Placa {query?.mes && query.mes} {query.ciudad ? query.ciudad : 'Medellín'} </h1>
        <p style={{ marginBottom: '32px' }}>Conoce las restricciones de pico y placa para {query.ciudad ? query.ciudad : 'Medellín'} en {query?.mes ? query.mes : 'el 2024'}.</p>

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
        <div></div>
        <h3 style={{ margin: '32px 0px 16px 0 ' }}>Excepciones y Vehículos Exentos</h3>
        <p>Algunos vehículos están exentos de las restricciones del Pico y Placa, como los de emergencia, eléctricos y de servicio público. Consulta la normativa para obtener una lista completa de exenciones.</p>

        <div>
          <h3 style={{ margin: '32px 0px 16px 0 ' }}>Últimas Actualizaciones y Cambios en la Normativa</h3>
          <p>Mantente informado sobre cualquier cambio en la normativa del Pico y Placa en {query.ciudad ? query.ciudad : 'Medellín'}. Las autoridades pueden ajustar los horarios y las reglas en respuesta a las condiciones de tráfico y la calidad del aire.</p>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  if (query.mes) {
    let filteredData;
    if (query.ciudad === 'bogota') {
      filteredData = data.picoyplaca[meses.indexOf(query.mes)].filter(el => {
        return !el.ciudad;
      })
    }
    else {
      filteredData = data.picoyplaca[meses.indexOf(query.mes)].filter(el => {
        return el.ciudad && el.ciudad.toLowerCase() === query.ciudad.toLowerCase();
      })
    };
    return {
      props: {
        data: filteredData
      }
    }
  }
}