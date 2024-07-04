
import Layout from '@/src/Components/Layout'
import styles from '@/styles/PicoYPlaca.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function PicoYPlacaCiudad({ data }) {
  const router = useRouter()

  return (
    // <Layout title={`Pico y Placa Colombia`} description={'Consulta el Pico y Placa de Colombia. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías del pais.'} keywords={'Pico y Placa, Medellín, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, , Vehículos particulares, Regulaciones de tráfico'}>
    //   <div style={{ alignItems: 'flex-start' }} className={styles.container}>

    //     <h1 className={styles.title}>Pico y Placa principales ciudades de Colombia </h1>
    //     <Link href={'/pico-y-placa-hoy?ciudad=medellin&&month=Julio-6'} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
    //       <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
    //         <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Julio</h4>
    //       </div>
    //     </Link>
    //     <h3>Bucaramanga</h3>
    //   </div>
    // </Layout>
    <Layout title={`Pico y Placa ${router.query.ciudad}`} description={`Consulta el Pico y Placa en la ciudad de ${router.query.ciudad}. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en ${router.query.ciudad}.`} keywords={`Pico y Placa, ${router.query.ciudad}, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, , Vehículos particulares, Regulaciones de tráfico`}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>

        <h1 className={styles.title}>Pico y Placa en {router.query.ciudad} </h1>
        <Link href={`${router.asPath}/mayo`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Mayo</h4>
          </div>
        </Link>
        <Link href={`${router.asPath}/junio`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Junio</h4>
          </div>
        </Link>
        <Link href={`${router.asPath}/julio`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'black', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA Julio</h4>
          </div>
        </Link>
      </div>

      <section style={{ width: '90%', maxWidth: '1100px', margin: '0 auto', marginBottom: '64px' }}>
        <div>
          <h2>Pico y placa hoy {router.query.ciudad ? router.query.ciudad : 'Medellín'}</h2>
          <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en {router.query.ciudad ? router.query.ciudad : 'Medellín'}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
          <p>Infórmate sobre las reglas y restricciones del Pico y Placa en {router.query.ciudad ? router.query.ciudad : 'Medellín'}. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>

        </div>
        <h2 style={{ margin: '32px 0px 16px 0 ' }}>Conoce las medidas de Pico y placa en {router.query.ciudad ? router.query.ciudad : 'Medellín'}</h2>

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
          <p>Mantente informado sobre cualquier cambio en la normativa del Pico y Placa en {router.query.ciudad ? router.query.ciudad : 'Medellín'}. Las autoridades pueden ajustar los horarios y las reglas en respuesta a las condiciones de tráfico y la calidad del aire.</p>

        </div>
      </section>
    </Layout>

  )
}