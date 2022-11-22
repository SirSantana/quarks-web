import Link from 'next/link'
import styles from './styles.module.css'



export default function Aplicacion(){
    return(
        <div className={styles.container}>
           
            <div style={{gap:'50px'}} className={styles.containerManual}>
            
            <div style={{gap:'20px'}}  className={styles.containerManual2}>
            
            <h1 style={{margin:'10px 0'}} className={styles.titleBlue}>Controla los <b style={{color:'#f50057'}}>gastos</b> de tú vehículo </h1>
            <h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Descarga nuestra app, para controlar tus gastos, y llevar tu contabilidad semanal, mensual y anual. ¡Gratis para nuestros usuarios! </h4>
            <Link href={'https://play.google.com/store/apps/details?id=com.quarks.vehiculo'}><img  src="/googleplay.png" alt="FondoRepuestosCarros" style={{height:'80px', width:'200px'}} /></Link>

            </div>
            <img
            className={styles.imageAplicacion}
          src="/AplicacionMobile.png"
          alt="Aplicacion para llevar la contabilidad"
        />
            
            </div>
        </div>
    )
}