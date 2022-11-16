import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_PREGUNTA } from '../../../graphql/mutations'
import styles from '../../../styles/Cotizar.module.css'
import MarcasMenu from '../../../utils/marcasMenu'
import ModalCargando from '../../../utils/modalCargando'
import ModalError from '../../../utils/modalError'
import ModalSuccesfull from '../../../utils/modalSuccesfull'


const initialForm={
    celular:'',
    marca:'Chevrolet',
    referencia:'',
    titulo:''
}
export default function FormPregunta(){
    const [form, setForm] = useState(initialForm)
    const validation = form.referencia === initialForm.referencia || form.celular === initialForm.celular || form.titulo === initialForm.titulo
    const [visibleModal, setVisibleModal] = useState(true)
    const handleMarca=(marca)=>{
        setForm({...form, marca})
    }

    const [createPregunta, {data, error, loading}] = useMutation(CREATE_PREGUNTA)

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setForm(initialForm)
        createPregunta({variables:form})
        setVisibleModal(true)
    }
    return(
        <div onClick={()=> setVisibleModal(false)} className={styles.container4}>
                <h1 className={styles.title2}>Cotiza tus repuestos</h1>
                <h3 className={styles.subtitle}>Completa los campos y recibe la cotizacion a tu celular</h3>
                
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', marginTop:'40px', gap:'10px'}}>
                    <label htmlFor="marca" className={styles.label}>Marca </label>
                    <MarcasMenu handleMarca={handleMarca} marca={form.marca}/>

                    <label htmlFor="referencia" className={styles.label}>Referencia / cilindraje / modelo</label>
                    <input value={form.referencia} required onChange={handleChange} name='referencia' id='referencia' className={styles.input}type={'text'}placeholder='Ejemplo : Aveo 1.6 2008'/>
                    
                    <label htmlFor="repuestos" className={styles.label} >Repuestos</label>
                    <input value={form.titulo} required onChange={handleChange} id='repuestos' name='titulo' className={styles.input}type={'text'}placeholder='Eje de levas'/>
                    
                    <label htmlFor="celular" className={styles.label}>Celular</label>
                    <input value={form.celular} required onChange={handleChange}id='celular' name='celular' className={styles.input}type={'number'}placeholder='312355****'/>
                    
                    <input style={{backgroundColor:validation ? 'gray': '#f50057'}}  className={styles.button} type={'submit'} value='Enviar Cotizacion'/>
                </form>
                {loading && 
                <ModalCargando mensaje={'Enviando Cotizacion...'} description={'Espera un momento'}/>
                }
                {data && visibleModal &&
                <ModalSuccesfull mensaje={'Cotizacion enviada'} description={'Te contactaremos por whatsapp lo mas pronto posible'}/>
                }
                {error && visibleModal &&
                <ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
                </div>

    )
}