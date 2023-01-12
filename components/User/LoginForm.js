import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SIGN_IN_MUTATION } from "../../graphql/mutations"
import useAuth from "../../hooks/useAuth"
import styles from '../../styles/Cotizar.module.css'
import ModalCargando from "../../utils/modalCargando"
import ModalError from "../../utils/modalError"
import ModalSuccesfull from "../../utils/modalSuccesfull"


const initialForm = {
  email: '',
  password: ''
}

export default function LoginForm() {
  const [form, setForm] = useState(initialForm)
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION)
  const { login } = useAuth()
  const [visibleModal, setVisibleModal] = useState(true)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialForm)
    signIn({ variables: form })
    setVisibleModal(true)
  }
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', JSON.stringify(data?.signIn.token))
      login(data?.signIn)
      setForm(initialForm)
      router.reload()
    }
  }, [data])
  
 
  return (
    <div onClick={() => setVisibleModal(false)} className={styles.container4} style={{justifyContent:'center', alignItems:'center'}}>
      <h1 className={styles.title2}>Inicia Sesion</h1>
      <h3 className={styles.subtitle}>Completa los campos</h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', gap: '10px' }}>
        <label htmlFor="email" className={styles.label}>Correo</label>
        <input value={form.email} required onChange={handleChange} id='email' name='email' className={styles.input} type={'email'} placeholder='tucorreo@gmail.com' />

        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input value={form.password} required onChange={handleChange} id='password' name='password' className={styles.input} type={'password'} placeholder='******' />


        <input style={{ backgroundColor: '#f50057', cursor: 'pointer', width:'100%' }} className={styles.button} type={'submit'} value='Iniciar Sesion' />
      </form>
      {loading &&
        <ModalCargando mensaje={'Verificando...'} description={'Espera un momento'} />
      }
      {data && visibleModal &&
        <ModalSuccesfull mensaje={'Sesion Iniciada'} description={'Empieza a cotizar!'} />
      }
      {error && visibleModal &&
      <ModalError mensaje={'Ha ocurrido un error'} description={error.message} />
      }
      
    </div>
  )
}