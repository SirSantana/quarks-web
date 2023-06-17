import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'
import { useState } from "react";


export default function PreguntasFrecuentes() {
  const [visibleResponse, setVisibleResponse] = useState({question1:false, question2:false, question3:false, question4:false, question5:false})

  return (
    <Layout title={'Preguntas Frecuentes | Quarks'}>
      <div className={styles.container}>
      <h1 className={styles.title}>Preguntas Frecuentes</h1>

      <div style={{margin:'16px 0'}}>
      <section onClick={()=> setVisibleResponse({...visibleResponse, question4:visibleResponse.question4 ? false:true})} style={{flexDirection:'row', display:'flex', cursor:'pointer', alignItems:'center', }}>
      <img src={visibleResponse.question4 ? './remove-sharp.svg': './add-sharp.svg'} className={styles.icon} />
      <h2 className={styles.question}>¿Solo tienen funcionamiento en Colombia?</h2>
      </section>
      {visibleResponse.question4 && <p className={styles.response}>Si, por el momento solo funcionamos en Colombia, ya que muchos repuestos cambian segun el pais de origen del vehiculo.</p>}
      </div>
      <div className={styles.divider}/>

      <div style={{margin:'16px 0'}}>
      <section onClick={()=> setVisibleResponse({...visibleResponse, question1:visibleResponse.question1 ? false:true})} style={{flexDirection:'row', display:'flex', cursor:'pointer', alignItems:'center', }}>
      <img src={visibleResponse.question1 ? './remove-sharp.svg': './add-sharp.svg'} className={styles.icon} />
      <h2 className={styles.question}>¿Cómo seleccionan a los vendedores?</h2>
      </section>
      {visibleResponse.question1 && <p className={styles.response}>Los vendedores nos mandan su informacion, y nosotros la analizamos y los contactamos para poder aceptarlos como vendedores.</p>}
      </div>
      <div className={styles.divider}/>

      <div style={{margin:'16px 0'}}>
      <section onClick={()=> setVisibleResponse({...visibleResponse, question2:visibleResponse.question2 ? false:true})} style={{flexDirection:'row', display:'flex', cursor:'pointer', alignItems:'center', }}>
      <img src={visibleResponse.question2 ? './remove-sharp.svg': './add-sharp.svg'} className={styles.icon} />
      <h2 className={styles.question}>¿Que pasa si un vendedor incumple?</h2>
      </section>
      {visibleResponse.question2 && <p className={styles.response}>Nuestros vendedores los validamos seriamente para que no pasen este tipo de cosas. Quarks no se hace responsable por un vendedor que incumpla. Sin embargo, si tuviste algun problema con alguno de ellos, envianos un correo <a href="/contactanos">Aquí</a> con las pruebas de la compra como capturas de pantalla y video, para que podamos tomar una decision frente al vendedor. </p>}
      </div>
      <div className={styles.divider}/>


      <div style={{margin:'16px 0'}}>
      <section onClick={()=> setVisibleResponse({...visibleResponse, question3:visibleResponse.question3 ? false:true})} style={{flexDirection:'row', display:'flex', cursor:'pointer', alignItems:'center',}}>
      <img src={visibleResponse.question3 ? './remove-sharp.svg': './add-sharp.svg'} className={styles.icon} />
      <h2 className={styles.question}>¿Cuanto se demoran en cotizar?</h2>
      </section>
      {visibleResponse.question3 && <p className={styles.response}>Nuestros vendedores son avisados rapidamente de tu cotizacion, el tiempo de cotizacion depende de la dificultad del repuesto y el horario de pregunta. Estimamos entre 1 hora a 12 horas. Dia a dia buscamos mejorar este y muchos aspectos mas, agradecemos tu comprension.</p>}
      </div>
      <div className={styles.divider}/>

      <div style={{margin:'16px 0'}}>
      <section onClick={()=> setVisibleResponse({...visibleResponse, question5:visibleResponse.question5 ? false:true})} style={{flexDirection:'row', display:'flex', cursor:'pointer', alignItems:'center', }}>
      <img src={visibleResponse.question4 ? './remove-sharp.svg': './add-sharp.svg'} className={styles.icon} />
      <h2 className={styles.question}>¿Como puedo ser vendedor?</h2>
      </section>
      {visibleResponse.question5 && <p className={styles.response}>Si quieres ser vendedor, envianos tu informacion en la siguiente pagina.</p>}
      </div>
      <div className={styles.divider}/>

      
      </div>
    </Layout>

  )
}