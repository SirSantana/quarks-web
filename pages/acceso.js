import { INTERESADO_PREMIUM } from "@/graphql/mutations";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'
import { ModalError, ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


let initialForm = {
  nombre:'',
  email:''
}
export default function AccesoPrevio() {
  const [interesadoPremium, {loading, data, error}] = useMutation(INTERESADO_PREMIUM)
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const handleSubmit=(e)=>{
    e.preventDefault()
    interesadoPremium({variables:form})
  }
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value})
    console.log(form);
  }
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [data])
  return (
    <Layout title={'Obten acceso temprano'}>
      <div className={styles.containerAcceso} >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
          <p style={{ fontSize:'14px', color: '#f50057', fontWeight:'600', display:'flex', flexDirection:'row', alignItems:'center', gap:'8px' }}><ion-icon style={{color:'#f50057', fontSize:'24px'}} name="ribbon-outline"></ion-icon>+50 talleres y almacenes registrados</p>
          <h1 className={styles.titleAccess}>La mejor forma de mostrar tu taller o almacen!</h1>
          <p style={{ margin: '8px 0 32px 0', color: '#5c5c5c' }}>
            Crea tú perfil en linea personalizado <span style={{ fontWeight: '700' }}>gratis</span> por tiempo limitado.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.containerInputAcceso}>
              <input onChange={handleChange}name="nombre" required type="text" placeholder="Nombre del negocio" className={styles.inputAcceso} />
              <input onChange={handleChange}name="email"required type="email" placeholder="Tu correo" className={styles.inputAcceso} />
            </div>
            <button type="submit" className={styles.button2}>
              Enviar
            </button>
          </form>
        </div>
        <img src="./card-almacen-prev.png" className={styles.imgCard} alt="Crea tu perfil" />

      </div>
      {loading &&
        <ModalLoading title={'Enviando... '} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
      {data && 
        <ModalSuccessfull title={'Genial'} subtitle={'Te enviaremos un correo con toda la informacion en unas horas!'}/>
      }
    </Layout>
  )
}