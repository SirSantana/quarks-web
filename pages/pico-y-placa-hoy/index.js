import Layout from "@/src/Components/Layout";
import styles from '@/styles/PicoYPlaca.module.css'
import Link from "next/link";
export default function PicoYPlaca() {

  return (
    <Layout title={`Pico y Placa Colombia 2024`} description={'Consulta el Pico y Placa de Colombia. Entérate de las restricciones vehiculares y planifica tu viaje de manera eficiente para evitar contratiempos en las vías del pais.'} keywords={'Pico y Placa, Medellín, Colombia, Restricciones vehiculares, Tráfico, Movilidad, Horarios, Automóviles, Calendario, , Vehículos particulares, Regulaciones de tráfico'}>
      <div style={{ alignItems: 'flex-start' }} className={styles.container}>

        <h1 className={styles.title}>Pico y Placa principales ciudades de Colombia 2024</h1>
        <Link href={'/pico-y-placa-hoy/bogota'} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>Bogota</h4>
          </div>
        </Link>
        <Link href={'/pico-y-placa-hoy/bucaramanga'} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>Bucaramanga</h4>
          </div>
        </Link>
        <Link href={'/pico-y-placa-hoy/medellin'} style={{ cursor: 'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
          <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>Medellín</h4>
          </div>
        </Link>
      </div>
      <section style={{ width: '90%', maxWidth: '1400px', margin: '0 auto', marginBottom: '64px' }}>
        <h2>Pico y placa hoy en Colombia</h2>
        <p style={{ margin: '8px 0px 16px 0 ' }}>Descubre todo sobre el Pico y Placa en Colombia: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.</p>
        <p>Infórmate sobre las reglas y restricciones del Pico y Placa en Colombia. Evita sanciones y optimiza tus desplazamientos en la ciudad.</p>

        <h2 style={{ margin: '32px 0px 16px 0 ' }}>Conoce las medidas de Pico y placa para el 2024 en Colombia</h2>

        <h3 style={{ margin: '48px 0px 16px 0 ' }}>Consejos para Evitar Multas</h3>
        <p>Para evitar multas y sanciones, sigue estos consejos:</p>
        <ul>
          <li>Revisa el calendario del Pico y Placa antes de planificar tu viaje.</li>
          <li>Usa aplicaciones móviles para estar al tanto de las restricciones diarias.</li>
          <li>Considera alternativas de transporte como el uso de bicicletas, transporte público o el carpooling.</li>
        </ul>

        <h3 style={{ margin: '32px 0px 16px 0 ' }}>Impacto del Pico y Placa en la Movilidad</h3>
        <p>El Pico y Placa tiene un impacto significativo en la movilidad urbana. Ayuda a reducir la congestión vehicular, mejora la calidad del aire y fomenta el uso de transporte público.</p>

        <h3 style={{ margin: '32px 0px 16px 0 ' }}>Excepciones y Vehículos Exentos</h3>
        <p>Algunos vehículos están exentos de las restricciones del Pico y Placa, como los de emergencia, eléctricos y de servicio público. Consulta la normativa para obtener una lista completa de exenciones.</p>

      </section>
    </Layout>

  )
}