import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Theme } from '../styles/Theme'
import styles from '../styles/Index.module.css'

export default function Home() {
  return (
    <Layout title={'Encuentra tus repuestos'}>
      <div className={styles.container}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h2 className={styles.title} style={Theme.texts.title}>Encuentra en un solo lugar todo para tu vehiculo</h2>
      <h4 style={Theme.texts.subtitle}>Con quarks podras encontrar talleres, almacenes, y llevar la contabilidad de tu vehiculo.</h4>
      <Link style={{width:'100%', marginTop:'20px'}} href={'/almacenes'}><button style={Theme.buttons.primary}>Buscar talleres y almacenes</button></Link>
      
      </div>
      <img src="/CarFondo.png" alt="FondoRepuestosCarros" className={styles.image2} />
      
      
      </div>
      <div className={styles.container2}>
      <div style={{marginBottom:'20px'}}>
      <h2 className={styles.title}>Descarga la App y lleva tu contabilidad gratis!</h2>
      <div style={{display:'flex',margin:10, flexDirection:'row',alignItems:'center' , gap:'10px'}}>
      <i class="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crea tu Perfil</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row', alignItems:'center', gap:'10px'}}>
      <i class="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crea tu Vehiculo</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row',alignItems:'center', gap:'10px' }}>
      <i class="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crear tus Gastos</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row', alignItems:'center', gap:'10px'}}>
      <i class="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Registra Tanqueadas, Repuestos, Mantenimientos, Lavadero y mas</h4>
      
      </div>
      <Link href={'https://play.google.com/store/apps/details?id=com.quarks.vehiculo'}><img  src="/googleplay.png" alt="FondoRepuestosCarros" style={{height:'80px', width:'200px'}} /></Link>

      </div>
      <img src="/FichaPublicitariaApp.png" alt="FondoRepuestosCarros" className={styles.image} />

      </div>

    </Layout>
  )
}
