import FormPregunta from "../../components/Cotizaciones/Form/FormPregunta";
import Layout from "../../components/Layout";
import styles from '../../components/Home/styles.module.css'
let marcas =['Chevrolet', 'Mazda', 'Ford', 'Renault']


export default function CotizarPage(){
    return(
        <Layout title={'Cotiza tus repuestos - Quarks'} type='website' description={'Encuentra los repuestos para tu vehiculo facil y rapido en colombia'}>
            <div className={styles.container} style={{marginTop:'80px'}}>
           
           <div className={styles.containerManual}>
           
           <div className={styles.containerManual2}>
           <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
           {marcas.map(marca=> (
               <img src={`/${marca}.png`} style={{width:'50px', height:'50px'}} alt={`Logo ${marca}`}/>
           ))}
           </div>
           <h1 style={{margin:'10px 0'}} className={styles.titleBlue}>Cotiza tus repuestos <b style={{color:'#f50057'}}>manualmente</b>  </h1>
           <h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Si no encontraste tu(s) repuesto(s) en el buscador, también puedes cotizarlos manualmente.<br/> Completa el siguiente formulario, y nosotros te enviaremos la cotización a tu Whatsapp en un plazo de 2 a 24 horas.</h4>

           </div>
           
               <FormPregunta/>
           </div>
       </div>
        </Layout>
    )
}