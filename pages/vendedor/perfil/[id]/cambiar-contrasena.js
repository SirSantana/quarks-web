

import { CHANGE_PASSWORD } from '@/graphql/mutations'
import useAuth from '@/hooks/useAuth'
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Vendedor.module.css'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const initialForm = {
  email:'',
  previusPassword: '',
  password: '',
  confirmPassword: ''
}

export default function CambiarContraseña() {
  const { user } = useAuth()
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const [changePassword, {loading, error, data}] = useMutation(CHANGE_PASSWORD)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      return router.push('/')
    }
    if (form.confirmPassword !== form.password) {
      return alert('Las contraseñas deben coincidir')
    }
    changePassword({variables:{email:form.email, password:form.password, previusPassword:form.previusPassword}})
  }
  useEffect(() => {
    if (data) {
      router.back()
    }
  }, [data])
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])
  return (
    <Layout title={'Editar perfil vendedor | Quarks'} description={'Edita tu perfil como vendedor'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cambiar Contraseña</h1>
        <p style={{ width: '100%' }} className={styles.subtitle}>Por tu seguridad es importante que cambies tu contraseña periodicamente.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input required placeholder="Contraseña actual" className={styles.input} name='previusPassword' onChange={handleChange} type={'password'} />
          <input required placeholder="Nueva contraseña" className={styles.input} name='password' onChange={handleChange} type={'password'} />
          <input required placeholder="Confirmar Nueva contraseña" className={styles.input} name='confirmPassword' onChange={handleChange} type={'password'} />

          <button disabled={loading} style={{ alignSelf: 'flex-start' }} className={styles.button}>
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </Layout>
  )
}