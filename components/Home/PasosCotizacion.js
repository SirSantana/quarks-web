
import styles from './styles.module.css'
import {useRouter} from 'next/router'
export default function PasosCotizacion(){
    const router = useRouter()
    return(
        <div className={styles.container}>
            
            

            <div className={styles.divTitle}>
            <h1 className={styles.titleBlue}>Cotiza tus <b style={{color:'#f50057'}}>repuestos rápidamente</b>  </h1>
            </div>

            <div className={styles.containerPasos1}>
            
            <div className={styles.containerPasos2}>
            <div className={styles.circle}>
            <h3>1</h3>
            </div>
            <div className={styles.divTitle}>
            <h2 className={styles.titleBlue2}>Busca tu <b style={{color:'#f50057'}}>autoparte</b> </h2>
            </div>
            <h4 className={styles.subtitleRed}>Contamos con un buscador, para que coloques el nombre del repuesto,
                referencia o la marca de tu vehículo. <br/> Filtrara entre las cotizaciones de 
                nuestros usuarios.
            </h4>
            <button onClick={()=>router.push('/cotizaciones')} className={styles.button}>Ir al buscador</button>
            </div> 

            <div className={styles.containerPasos2}>
            <div className={styles.circle}>
            <h3>2</h3>
            </div>
            <div className={styles.divTitle}>
            <h2 className={styles.titleBlue2}>Encuentra el <b style={{color:'#f50057'}}>repuesto</b></h2>
            </div>
            <h4 className={styles.subtitleRed}>Selecciona la cotización que coincida con la marca, referencia del vehículo y el repuesto <br/>
                    Da click en un botón similar a este
            </h4>
            <button className={styles.button}>Ver cotizaciones</button>
            </div> 

            <div className={styles.containerPasos2}>
            <div className={styles.circle}>
            <h3>3</h3>
            </div>
            <div className={styles.divTitle}>
            <h2 className={styles.titleBlue2}>Confirma <b style={{color:'#f50057'}}> disponibilidad</b></h2>
            </div>
            <h4 className={styles.subtitleRed}>En la cotización encontraras el precio,marca u origen, garantía y la fecha.
                <br/>Selecciona la que te convenza.
                <br/>Y da click en un botón similar a este
            </h4>
            <button className={styles.button}>Contactar Disponibilidad</button>
            </div> 




            </div>

            

            
        </div>
    )
}