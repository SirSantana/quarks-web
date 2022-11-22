import styles from '../../../styles/Cotizar.module.css'
import MarcasMenu from '../../../utils/marcasMenu'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_COTIZACION } from '../../../graphql/mutations'
import { useRouter } from 'next/router'
import ModalCargando from '../../../utils/modalCargando'
import ModalSuccesfull from '../../../utils/modalSuccesfull'
import ModalError from '../../../utils/modalError'


const initialForm={
    garantia:'1',
    marca:'',
    pregunta:'',
    precio:'',
    descripcion:'',
}
export default function FormCotizar({celular}){
    const [form, setForm] = useState(initialForm)
    const validation = form.marca === initialForm.marca || form.precio === initialForm.precio
    const [visibleModal, setVisibleModal] = useState(false)
    const [createCotizacion, {data, loading, error}] = useMutation(CREATE_COTIZACION)
    const router = useRouter()
    const {id} = router?.query
    
    const handleChange=(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    useEffect(()=>{
        setForm({...form, pregunta:id})
    },[id])

    useEffect(()=>{
        if(data){
            let url = `https://api.whatsapp.com/send?phone=57${celular}`;
            url += `&text=${encodeURI(`😁 Hola, ya tenemos la cotización para tu vehículo! \n🚘 Cotización N° ${data?.createCotizacion?.id} \n👨🏼‍🦰 ${data?.createCotizacion?.descripcion} \n✍️ El precio es de ${data?.createCotizacion?.precio} \n📌 Marca/Origen : ${data?.createCotizacion?.marca} \n🔎 Tiene garantía por : ${data?.createCotizacion?.garantia} mes(es), pero estamos seguros que no tendrás ningún inconveniente \n📝 Para ver la cotización en la pagina ve al siguiente link https://www.quarks.com.co/cotizaciones/${id}. \n🎁 Quedamos atentos para enviarte el producto, con envío GRATIS!`)}&app_absent=0`
            window.open(url);
        }
    },[data])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(id){
            createCotizacion({variables:form})
            setForm(initialForm)
            setVisibleModal(true)
        }
    }
    const handleVisibleModal=()=>{
        if(visibleModal){
            setVisibleModal(false)
            router.reload()
        }
    }
    return(
            <div onClick={handleVisibleModal} className={styles.container4} style={{margin:0, width:'90%'}}>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', marginTop:'20px', gap:'10px'}}>

                    <label htmlFor="descripcion" className={styles.label}>Detalle de cotizacion</label>
                    <input value={form.descripcion} onChange={handleChange} name='descripcion' id='descripcion' className={styles.input}type={'text'}placeholder='Coloca un mensaje de soporte de cotizacion'/>
                    
                    
                    <label htmlFor="marca" className={styles.label}>Marca / Origen</label>
                    <input value={form.marca} required onChange={handleChange}id='marca' name='marca' className={styles.input}type={'text'}placeholder='General Motor'/>
                    
                    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                    <section style={{display:'flex',flexDirection:'column',width:'45%' }}>
                    <label htmlFor="precio" className={styles.label}>Precio</label>
                    <input  value={form.precio} required onChange={handleChange} id='precio' name='precio' className={styles.input}type={'number'}placeholder='Precio'/>
                    </section>

                    <section style={{display:'flex',flexDirection:'column',width:'45%' }}>
                    <label htmlFor="garantia" className={styles.label}>Garantia en meses</label>
                    <input value={form.garantia} onChange={handleChange} id='garantia' name='garantia' className={styles.input}type={'number'}placeholder='Garantia del producto' min="1" max="24"/>
                    </section> 
                    </div>

                    <input style={{backgroundColor:validation ? 'gray': '#f50057', cursor:'pointer'}}  className={styles.button} type={'submit'} value='Enviar Cotizacion'/>
                </form>
                {loading && 
                <ModalCargando mensaje={'Enviando Cotizacion...'} description={'Espera un momento'}/>
                }
                {data && visibleModal &&
                <ModalSuccesfull mensaje={'Cotizacion enviada'} description={'Espera a que el comprador te contacte'}/>
                }
                {error && visibleModal &&
                <ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
        </div>
    )
}