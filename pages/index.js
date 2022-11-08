import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Theme } from '../styles/Theme'
import styles from '../styles/Index.module.css'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h2 className={styles.title} style={Theme.texts.title}>Encuentra en un solo lugar todo para tu vehiculo</h2>
      <h4 style={Theme.texts.subtitle}>Con quarks podras encontrar talleres, almacenes, y llevar la contabilidad de tu vehiculo.</h4>
      <button style={Theme.buttons.primary}>Buscar talleres, almacenes</button>
      
      </div>
      <img src="/CarFondo.png" alt="FondoRepuestosCarros" className={styles.image} />
      
      
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
      </div>
      <img src="/FichaPublicitariaApp.png" alt="FondoRepuestosCarros" className={styles.image} />

      </div>

    </Layout>
  )
}
