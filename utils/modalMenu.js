import { useState } from 'react'
import styles from '@/styles/Home.module.css'

let comoFunciona = 'Esta es una cotizacion que recibiste o que recibio un usuario. Todas las cotizaciones son publicas, con esto podrás contactar por whatsapp con el vendedor y llegar a un acuerdo con él.'
let problema='😁 Hola, cuentanos con que vendedor tuviste inconvenientes, ingresa archivos que nos puedan ayudar a validar tu informacion'
export default function ModalMenu({ preguntas, setVisibleModal }) {
  const [visibleRespuesta, setVisibleRepuesta] = useState(false)
  const sendMessage = (problema) => {
    let url = `https://api.whatsapp.com/send?phone=57${3203393232}`;
    url += `&text=${encodeURI(problema)}&app_absent=0`
    window.open(url);
  }
  const handleClick = (el)=>{
    if(el === '¿Cómo funciona?'){
      setVisibleRepuesta(true)
    }else if(el === '¿Problemas con el vendedor?'){
      sendMessage(problema)
    } else{
      sendMessage('Cuentanos en que podemos ayudarte')
    }
  }
  return (

    <div  className={styles.darkBG}>
      <div className={styles.centered}>

        <div className={styles.modal}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'90%'}}>
          <img src="/Logo.png" alt="Exitoso"  style={{width:'20px', height:'20px'}} />
          <img onClick={()=> setVisibleModal(false)} src="/error.svg" alt="Exitoso"  style={{width:'20px',cursor:'pointer', height:'20px'}} />
          </div>
          <div style={{marginTop:'10px', display:'flex', flexDirection:'column', gap:'2px'}}>
          {preguntas.map(el=>
          <h4 onClick={()=>handleClick(el)} style={{ textAlign: 'center', cursor:'pointer' }} className={styles.subtitle}>{el}</h4>
            )}
          </div>
        </div>
      </div>
      {visibleRespuesta &&
      <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <h4 style={{ textAlign: 'center', cursor:'pointer' }} className={styles.subtitle}>{comoFunciona}</h4>
          <h6 onClick={()=> setVisibleRepuesta(false)} style={{ textAlign: 'center', cursor:'pointer', fontSize:'12px', color:'#f50057' }} className={styles.subtitle}>Volver</h6>
        
        </div>
      </div>
    </div>
      }
    </div>
  )
}