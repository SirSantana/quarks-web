import Layout from '../components/Layout'
import styles from '../styles/Index.module.css'
import PasosCotizacion from '../components/Home/PasosCotizacion'
import CotizacionManual from '../components/Home/CotizacionManual'
import Beneficios from '../components/Home/Beneficios'
import Footer from '../components/Home/Footer'
import Principal from '../components/Home/Principal'
import MultipleItems from '../utils/carousel'
import { useEffect, useRef } from 'react'

export default function Home() {
  const mainRef = useRef(null);

  let description = 'Repuestos automotores para tu carro en colombia, encuentra los repuestos para tu vehiculo, cotiza con decenas de vendedores tus partes'
  
  return (
    <Layout title={'Encuentra tus repuestos | Quarks'} type='website' description={description}>
      <section style={{marginTop:'70px'}} className={styles.container}>
        <Principal mainRef={mainRef} />
      </section>
      <section style={{ backgroundColor: '#f1f1f1', padding: "20px 0 40px 0" }}>
        <MultipleItems />
      </section>
      <section ref={mainRef}  style={{ backgroundColor: 'white', padding: "20px" }}>
        <CotizacionManual />
      </section>
      <section style={{ backgroundColor: '#f9f9fb', padding: "20px" }}>
        <PasosCotizacion />
      </section>
      <section style={{ backgroundColor: '#f9f9fb', padding: "20px" }}>
        <Beneficios />
      </section>
      {/* <div style={{ backgroundColor: 'rgb(255, 243, 243)', padding: "20px" }}>
        <Aplicacion />
      </div> */}
      <section style={{ backgroundColor: '#1b333d', padding: "20px" }}>
        <Footer />
      </section>


    </Layout>
  )
}
