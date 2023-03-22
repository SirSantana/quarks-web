import { SIGN_IN_MUTATION } from '@/graphql/mutations'
import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Vendedor.module.css'
import { Loader } from '@/utils/loader'
import { ModalError } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const initialForm = {
  email: '',
  password: ''
}
export default function LoginFormVendedor() {
  const [form, setForm] = useState(initialForm)
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION)
  const { login } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialForm)
    signIn({ variables: form })
  }
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', JSON.stringify(data?.signIn.token))
      login(data?.signIn)
      setForm(initialForm)
      router.replace(`/vendedor/perfil/${data?.signIn?.user?.id}`)
    }
  }, [data])
  if(loading){
    return (
      <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center'}}>
        <Loader/>
      </div>
    )
  }
  if(error){
    alert(error)
  }
  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input value={form.email} required onChange={handleChange} id='email' name='email' placeholder="Tú email" className={styles.input} type={'email'} />
      <input value={form.password} required onChange={handleChange} id='password' name='password' placeholder="Tú contraseña" className={styles.input} type={'password'} />
      <button  style={{ alignSelf: 'flex-start', marginBottom: '8px' }} className={styles.button}>
        Inicia Sesión
      </button>
      <Link href={'/vendedor'}>
        <button style={{ alignSelf: 'flex-start', width: 'fit-content', backgroundColor: 'white', color: '#f50057', marginTop: '0px' }} className={styles.button}>
          No tienes una cuenta? Registrate
        </button>
      </Link>
    </form>
  )
}