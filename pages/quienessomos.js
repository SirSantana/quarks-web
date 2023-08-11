import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'


export default function QuienesSomos() {
  return (
    <Layout title={'Quienes somos | Quarks'}>
      <div style={{ marginTop: '32px' }} className={styles.container}>
      <h1 className={styles.title}>Quiénes Somos</h1>
        <p style={{marginBottom:'48px'}} className={styles.response}>En Quarks, nuestra pasión por los automóviles y el compromiso con la calidad del servicio nos llevaron a crear esta plataforma única en Bogotá. <br/><br/>Hemos experimentado en carne propia los desafíos de encontrar talleres confiables y profesionales, y eso nos inspiró a construir un lugar donde los conductores puedan acceder fácilmente a información sobre los talleres de la ciudad.</p>

        <h2>Nuestro Propósito</h2>
        <p style={{marginBottom:'48px'}}className={styles.response}>Nuestro propósito es simple pero poderoso: conectar a los conductores con talleres excepcionales que ofrezcan un servicio de calidad y confianza.<br/><br/> Entendemos lo importante que es para ti mantener tu vehículo en óptimas condiciones, y por eso nos esforzamos en brindarte una plataforma que te ayude a tomar decisiones informadas sobre el cuidado de tu automóvil.</p>

        <h2>Nuestro Equipo</h2>
        <p style={{marginBottom:'48px'}}className={styles.response}>Detrás de Quarks, hay un equipo apasionado y comprometido que trabaja arduamente para asegurarse de que cada detalle esté cuidadosamente gestionado.
        <br/><br/> Desde expertos en la industria automotriz hasta profesionales creativos, todos compartimos una visión común: hacer que tu experiencia al buscar talleres sea lo más fácil y satisfactoria posible.</p>

        <h2>Nuestro Comunidad</h2>
        <p style={{marginBottom:'48px'}}className={styles.response}>Nos enorgullece ser parte de la comunidad automotriz en Bogotá. <br/><br/>No solo estamos aquí para listar talleres, sino también para crear un espacio donde los conductores puedan compartir experiencias, recomendaciones y conocimientos. Creemos en fortalecer los lazos entre conductores y talleres para construir una comunidad automotriz más fuerte y confiable.</p>

        <h2>Tu Confianza, Nuestra Prioridad</h2>
        <p style={{marginBottom:'48px'}}className={styles.response}>En Quarks, tu confianza es nuestra máxima prioridad. Trabajamos con un riguroso proceso de selección para garantizar que solo los talleres más calificados y confiables sean parte de nuestra plataforma. <br/><br/>Cada recomendación que encuentres aquí es el resultado de una investigación y evaluación cuidadosa.</p>


        <h2>¡Conduce con Confianza!</h2>
        <p className={styles.response}>Estamos emocionados de que formes parte de nuestra comunidad en Quarks. Ya sea que estés buscando un cambio de aceite, una revisión técnica o cualquier otro servicio automotriz, estamos aquí para ayudarte. <br/><br/>Explora nuestro directorio, lee los testimonios de conductores satisfechos y encuentra el taller perfecto para tus necesidades.</p>

        <p className={styles.response}>¡Gracias por confiar en nosotros para el cuidado de tu automóvil!</p>

        <p className={styles.response}>Atentamente. Miguel de Quarks</p>
      </div>
    </Layout>
  )
}