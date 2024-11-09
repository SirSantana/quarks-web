import SectionFixedServicios from "@/src/Components/LandingPage/SectionFixedServicios"
import Layout from "@/src/Components/Layout"
import { useRouter } from "next/router"
import styles2 from '@/styles/Landing.module.css'
import CardNewTaller from "@/src/Components/LandingPage/CardNewTaller"
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

let listTalleresTecnicomecanica = [
  {
    nombre: 'Diagnostiautos CDA',
    url: '/diagnostiautos_cda',
    description: 'Realiza tu revisión técnico-mecánica en uno de los centros más reconocidos en Bogotá'
  },
  {
    nombre: 'CDA del Occidente Av Rojas',
    url: '/cda_occidente_avrojas',
    description: 'Ubicado en una zona de fácil acceso, este CDA ofrece servicios completos de revisión técnico-mecánica.'

  },
  {
    nombre: 'CDA MOVILIDAD BOGOTA',
    url: '/cda_movilidad_bogota',
    description: 'Con una excelente reputación, este centro garantiza una revisión técnico-mecánica eficiente'

  },
  {
    nombre: 'Revisión Plus Tecnicomecánica C.D.A.',
    url: '/revision_plus_tecnicomecanica',
    description: 'Con servicios rápidos y confiables, es una opción ideal para la revisión de tu vehículo.'

  },
  {
    nombre: 'CENTRO DE DIAGNOSTICO AUTOMOTOR AVENIDA SEXTA LTDA',
    url: '/cda_avenida_sexta',
    description: 'Con años de experiencia, este centro es una excelente elección para la revisión técnico-mecánica.'

  },
  {
    nombre: 'CDA Motos y Autos Bogota ',
    url: '/cda_motos_autos_bogota',
    description: 'Especializados en revisión técnico-mecánica tanto para motos como para autos.'

  },
  {
    nombre: 'CDA ECCE LTDA',
    url: '/cda_ecce_ltda',
    description: ' Reconocidos por su atención al detalle y profesionalismo en la revisión técno mecánica.'

  },
  {
    nombre: 'CDA De La 44',
    url: '/cda_dela_44',
    description: 'Ubicado estratégicamente, este centro ofrece servicios completos de revisión técnicomecánica.'

  },
  {
    nombre: 'CDA DISTRITAL',
    url: '/cda_distrital',
    description: 'Con un equipo altamente capacitado, garantizan una revisión técnico mecánica de calidad.'

  },
  {
    nombre: 'CDA PRIMERO DE MAYO',
    url: '/cda_primera_de_mayo',
    description: 'Famosos por su eficiencia y excelente servicio al cliente en la revisión técnomecánica.'

  }
]

export default function Servicio() {
  const router = useRouter()
  const resultsRef = useRef(null)
  const { loading, data, error } = useQuery(GET_NEGOCIOSVDOS_BY_SERVICIO, {
    variables: { tipo: 'cda' },
    onCompleted: () => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  return (
    <Layout image={'/revision tecno mecanica en bogota.jpg'} visibleNavbar={false} title={`Talleres para hacer la revision tecnicomecanica en Bogotá`} >
      <SectionFixedServicios />
      <section className={styles2.containerListTalleres} >
        <div ref={resultsRef} style={{ marginBottom: '32px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>Se encontraron +10 talleres para la tecnomecanica cerca de mi en Bogota.</p>
          {/* <div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '8px 12px', width: 'fit-content', alignItems: 'center', gap: '8px', border: '1px solid #D5D5D5', borderRadius: '4px' }}>
              <Icon name={IconCatalog.optionsOutline} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Filtrar</span>
            </div>
          </div> */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between' }} >
          {loading
            ?
            <>
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
            </>

            :
            data?.getNegociosVDosByServicio?.map((taller, index) => (
              <CardNewTaller key={taller.nombre} taller={taller} />
            ))}
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', margin: '32px auto 32px auto', }}>
          <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>Revision tecnomecanica en Bogotá</h2>
          <Image loading='lazy' src={'/revision tecno mecanica en bogota.jpg'} alt={`Talleres para hacer la revision tecnicomecanica en Bogotá 2024`} width={800} height={400} style={{ objectFit: 'cover', margin: '32px 0', width: '90%', maxWidth: '600px', height: '30%', maxHeight: '400px' }} />

          <p style={{ fontSize: '14px', color: '#929292' }}>Estas buscando un taller mecanico para hacer la tecnicomecanica de tu vehiculo en Bogotá? Encuentra los mejores cda en Bogotá en nuestra página. Encontraras todos los datos de cada CDA, desde los servicios que ofrece hasta los horarios y ubicacion. Junto con calificaciones y reseñas de otros usuario, podras elegir la mejor opción para tu vehiculo y hacer la revision tecnicomecanica.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', margin: '32px auto 32px auto', }}>
          <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>Encuentra el Mejor CDA para tu Revisión Técnico-Mecánica en Bogotá</h2>
          <p style={{ fontSize: '14px', color: '#929292' }}>Realizar la revisión técnico-mecánica es fundamental para garantizar la seguridad y el buen funcionamiento de tu vehículo. En nuestra página, te ofrecemos una lista detallada de los mejores CDA en Bogotá, cada uno con información completa sobre sus servicios, horarios, ubicación y opiniones de otros usuarios. No dejes la seguridad de tu vehículo al azar, elige el mejor CDA en Bogotá y realiza tu revisión técnomecánica con confianza.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', margin: '32px auto 32px auto', }}>
          <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>Los Mejores Centros de Diagnóstico Automotor (CDA) en Bogotá</h2>
          <ol style={{ marginLeft: '16px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
            {listTalleresTecnicomecanica?.map((el, index) => (
              <li style={{ fontWeight: '500', }} key={el?.userName}>
                <Link style={{ color: '#f50057' }} href={`${el?.url}`}> {el?.nombre} </Link>
                <p style={{ fontSize: '14px', color: '#929292', marginTop: '8px' }}>{el?.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className={styles2.containerListTalleres}>
        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '32px' }}>¿Por Qué Elegir Nuestra lista de CDA en Bogotá?</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li style={{ fontWeight: '500', }}>
            <strong>Calificaciones y Reseñas:</strong> Conoce la experiencia de otros usuarios antes de elegir el CDA para tu revisión técnicomecánica.
          </li>
          <li style={{ fontWeight: '500', }}>
            <strong>Ubicación y Horarios:</strong> Encuentra el CDA más cercano y con horarios que se adapten a tu agenda.
          </li>
          <li style={{ fontWeight: '500', }}>
            <strong>Servicios Completos:</strong> Desde revisión técnico mecánica hasta otros servicios adicionales que puedan necesitar tu vehículo.
          </li>
        </ul>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          Optimiza el rendimiento y seguridad de tu vehículo con una revisión técnico-mecánica de calidad en Bogotá. Nuestra plataforma te conecta con los mejores CDA de la ciudad, facilitando tu elección y garantizando un servicio de excelencia.
        </p>
      </section>
      <section className={styles2.containerListTalleres}>
        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '32px' }}>Tarifas Actualizadas para la Revisión Técnico-Mecánica en 2024</h2>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}><strong>Fuente:</strong> El Espectador</p>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          Con la llegada del nuevo año, los precios de diversos productos y servicios en Colombia, incluida la revisión técnico-mecánica obligatoria para vehículos, han sido ajustados. Según la Resolución 3318 de 2015 del Ministerio de Transporte, se han definido los nuevos rangos de tarifas para los Centros de Diagnóstico Automotor (CDA) para el año 2024.
        </p>
        <h3 style={{ textAlign: 'center', width: '100%', fontSize: '16px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px', marginTop: '32px' }}>Precios de la Revisión Técnico-Mecánica para 2024</h3>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          Los costos se han ajustado tomando en cuenta la Unidad de Valor Tributario (UVT) y el índice anual de precios al consumidor (IPC), que se situó en un 9,28 %. Con una estimación de inflación acumulada del 10 %, los precios de la revisión técnico-mecánica para este año son los siguientes:
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin:'24px 0'}}>
          <li><strong>Motos:</strong> $218.251</li>
          <li><strong>Automóviles Livianos:</strong> $327.219</li>
          <li><strong>Vehículos Pesados:</strong> $501.274</li>
        </ul>
        <h3>Frecuencia de la Revisión Técnico-Mecánica</h3>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          La revisión técnico-mecánica debe realizarse anualmente después de la primera revisión. Para vehículos particulares, la primera revisión es obligatoria cinco años después de la matrícula inicial. En el caso de vehículos públicos y motocicletas, la primera revisión se efectúa dos años después de la matrícula.
        </p>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          Es crucial estar atento a las fechas de vencimiento de la revisión para evitar sanciones y la inmovilización del vehículo. La falta de una revisión actualizada se considera una infracción (C35) que conlleva una multa equivalente a 15 salarios mínimos legales diarios vigentes.
        </p>
        <p style={{ fontSize: '14px', color: '#929292', marginTop: '16px' }}>
          Además de la revisión técnico-mecánica, asegúrese de tener al día otros documentos requeridos, como la licencia de tránsito, la licencia de conducción y el Seguro Obligatorio de Accidentes de Tránsito (SOAT), el cual también ha visto un incremento en su tarifa según la Superintendencia Financiera.
        </p>
      </section>
    </Layout>
  )
}