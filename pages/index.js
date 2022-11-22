import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Theme } from '../styles/Theme'
import styles from '../styles/Index.module.css'
import PasosCotizacion from '../components/Home/PasosCotizacion'
import CotizacionManual from '../components/Home/CotizacionManual'
import Beneficios from '../components/Home/Beneficios'
import Aplicacion from '../components/Home/Aplicacion'
import Footer from '../components/Home/Footer'

export default function Home() {
  return (
    <Layout title={'Encuentra tus repuestos - Quarks'} type='website' description={'Repuestos automotores para tu carro en colombia'}>
      <div className={styles.container}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h2 className={styles.title} style={Theme.texts.title}>Cotiza los repuestos para tu carro</h2>
      <h4 style={Theme.texts.subtitle}>Con quarks podrás encontrar talleres, almacenes, y llevar la contabilidad de tu vehículo.</h4>
      <Link style={{width:'100%', marginTop:'20px'}} href={'/cotizaciones'}><button style={Theme.buttons.primary}>Buscar repuestos</button></Link>
      
      </div>
      {/* <img src="/CarFondo.png" alt="FondoRepuestosCarros" className={styles.image2} /> */}
      <Image src="/CarFondo.png" alt="Carrorepuestos" width={400} height={350} className={styles.image2} />
      
      
      </div>
      {/* <div className={styles.container2}>
      <div style={{marginBottom:'20px'}}>
      <h2 className={styles.title}>Descarga la App y lleva tu contabilidad gratis!</h2>
      <div style={{display:'flex',margin:10, flexDirection:'row',alignItems:'center' , gap:'10px'}}>
      <i className="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crea tu Perfil</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row', alignItems:'center', gap:'10px'}}>
      <i className="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crea tu Vehiculo</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row',alignItems:'center', gap:'10px' }}>
      <i className="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Crear tus Gastos</h4>
      </div>
      <div style={{display:'flex',margin:10, flexDirection:'row', alignItems:'center', gap:'10px'}}>
      <i className="fa fa-check"></i>
      <h4 style={Theme.texts.subtitleWhite}>Registra Tanqueadas, Repuestos, Mantenimientos, Lavadero y mas</h4>
      
      </div>
      <Link href={'https://play.google.com/store/apps/details?id=com.quarks.vehiculo'}><img  src="/googleplay.png" alt="FondoRepuestosCarros" style={{height:'80px', width:'200px'}} /></Link>

      </div>
      <Image src="/FichaPublicitariaApp.png" alt='FondoRepuestosCarros' width={400} height={350} className={styles.image} />
      {/* <img src="/FichaPublicitariaApp.png" alt="FondoRepuestosCarros" className={styles.image} /> */}
    <div style={{backgroundColor:'#f9f9fb', padding:"20px"}}>
    <PasosCotizacion/>
    </div>
    <div style={{backgroundColor:'white', padding:"20px"}}>
    <CotizacionManual/>
    </div>
    <div style={{backgroundColor:'#f9f9fb', padding:"20px"}}>
    <Beneficios/>
    </div>
    <div style={{backgroundColor:'rgb(255, 243, 243)', padding:"20px"}}>
    <Aplicacion/>
    </div>
    <div style={{backgroundColor:'#1b333d', padding:"20px"}}>
    <Footer/>
    </div>


    </Layout>
  )
}
