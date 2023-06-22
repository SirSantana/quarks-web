import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'


export default function QuienesSomos() {
  return (
    <Layout title={'Quienes somos | Quarks'}>
      <div style={{marginTop:0}} className={styles.container}>
        <h1 className={styles.title}>¿Quienes somos?</h1>
        <p className={styles.response}>
          Somos un equipo colombiano que busca hacer el mundo automotriz facil y entendible para todos.
          <br/>
          <br/>

          Ya sea que seas un entusiasta de los automóviles o un propietario que desea conocer más sobre las piezas y funcionamiento que conforman su vehículo, esta lugar es para ti.
          <br/>Bienvenido!
          <br/>
          <br/>


          Atentamente. Miguel de Quarks.</p>
      </div>
    </Layout>
  )
}