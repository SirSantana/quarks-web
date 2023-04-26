import styles from '@/styles/Main.module.css'
import { useState } from 'react'
import sendMessage from './fetching'



export function ModalSuccessfull({ title, subtitle }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#55C200', padding: '16px 32px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title}</p>
        <p style={{ fontSize: '13px', color: 'white', margin: 0 }}>{subtitle} </p>
      </div>
    </div>
  )
}


export function ModalLoading({ title }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#FFBB56', padding: '16px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title}</p>
      </div>
    </div>
  )
}

export function ModalError({ title, subtitle }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#f50057', padding: '16px 32px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title} </p>
        <p style={{ fontSize: '13px', color: 'white', margin: 0 }}>{subtitle ? subtitle : 'Verifica tu conexión, e intentalo de nuevo'} </p>
      </div>
    </div>
  )
}

const initialForm = {
  name: '',
  celular: ''
}
export function ModalContactMe({setVisibleModalContactMe, vendedor, urlPregunta }) {
  const [form, setForm] = useState(initialForm)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!form.name || !form.celular){
     return alert('Debes completar tus datos')
    }
    // console.log(vendedor?.celular);
    let frase = `🚗¡El cliente ${form.name} esta interesado en tu cotizacion! \n🧑 Contacte con él, al siguiente numero ${form.celular} \n✍️ Link de la cotizacion: \n` + urlPregunta
        sendMessage({ titulo: frase, number: `57${vendedor?.celular}` })
  }

  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', padding: '32px 16px', borderRadius: '8px' }} className={styles.modalContent}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#5B0221', margin: 0 }}>Quiero que me contacten </p>
          <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>Para que el almacen {vendedor?.almacen} te contacte, debes llener los siguiente datos </p>

        </section>
        <form className={styles.form}>
          <input value={form.name} required onChange={handleChange} placeholder="Tú nombre" name='name' id='name' className={styles.input} type={'text'} />
          <input value={form.celular} required onChange={handleChange} placeholder="Tú celular" name='celular' id='celular' className={styles.input} type={'number'} />

        </form>
        <div style={{width:'100%', display:'flex', gap:'8px', justifyContent:'flex-end', marginTop:'32px'}}>
          <button onClick={()=> setVisibleModalContactMe(false)} style={{width:'40%', fontSize:'14px', fontWeight:'400',borderRadius:'4px', height:'40px',color:'#f50057', backgroundColor:'white', border:'1px solid #f50057'}} className={styles.button}>Cancelar</button>
          <button onClick={handleSubmit} style={{width:'40%', fontSize:'14px', fontWeight:'400',borderRadius:'4px', height:'40px'}} className={styles.button}>Enviar datos</button>
        </div>
      </div>

    </div>
  )
}

