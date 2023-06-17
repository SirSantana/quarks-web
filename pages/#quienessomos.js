import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'


export default function QuienesSomos() {
  return (
    <Layout title={'Quienes somos | Quarks'}>
      <div className={styles.container}>
        <h1 className={styles.title}>¿Quienes somos?</h1>
        <p className={styles.response}>Somos un equipo Colombiano que por medio de la tecnología busca solucionar pequeños problemas en el sector automotriz.
          <br />
          <br />
          Soy Miguel, un joven que vio cómo su padre comercializaba repuestos, hasta ponerme hombro a hombro, con mucho menos conocimiento pero con muchas ganas.
          Fue trabajando con él, donde evidencié un problema de los vendedores y compradores de repuestos en Colombia. Donde los vendedores cotizaban varias veces el mismo repuesto y donde los compradores, debian salir de su casa y caminar bastante, en ocasiones para no encontrar el repuesto.
          <br />
          <br />

          Para esto fue creado Quarks, para hacer más eficiente el trabajo de los vendedores y facilitar la cotización por parte de los compradores.
          <br />
          <br />

          Poco a poco iremos mejorando el servicio, ten un poco de paciencia, lo hacemos con todo el gusto!
          <br />
          <br />

          Atentamente. Miguel de Quarks.</p>
      </div>
    </Layout>
  )
}