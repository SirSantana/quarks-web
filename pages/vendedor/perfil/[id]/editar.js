import { SEND_EMAIL } from '@/graphql/mutations'
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Vendedor.module.css'
import { useMutation } from '@apollo/client'
import { useState } from 'react'



export default function EditarPerfil() {
  const [mensaje, setMensaje] = useState('')
  const [contactoEmail, {data,error, loading}] = useMutation(SEND_EMAIL)

  const sendMessage = () => {
    let url = `https://api.whatsapp.com/send?phone=57${3203393232}`;
    url += `&text=${encodeURI(`Me interesa editar mis datos como vendedor: ${mensaje}`)}&app_absent=0`
    window.open(url);
  }
  // const sendMessage = (e) => {
  //   e.preventDefault()
  //   console.log('buenas');
  //   console.log(mensaje);
  //   contactoEmail({variables:{name:'', email:'', mensaje:mensaje}})
  // }
  return (
    <Layout title={'Editar perfil vendedor | Quarks'} description={'Edita tu perfil como vendedor'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Editar perfil</h1>
        <p style={{width:'100%'}} className={styles.subtitle}>Por la seguridad de nuestros usuarios, no puedes editar tu informacion.<br/> Haznos saber que datos quieres editar y la razon. Esto lo hacemos para ofrecer seguridad y confiabilidad.</p>
        
        <form onSubmit={sendMessage} className={styles.form}>
          <textarea required  placeholder="Que datos quieres cambiar, y por qué" className={styles.input}onChange={(e)=> setMensaje(e.target.value)} style={{height:'100px', resize:'none'}} rows="5" type={'text'} />
          <button style={{alignSelf:'flex-start'}} className={styles.button}>
            Enviar mensaje
          </button>
        </form>
      </div>
    </Layout>
  )
}