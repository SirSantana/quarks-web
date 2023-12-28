
import { CREATE_NEGOCIO_VDOS } from '@/graphql/mutations'
import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Faq.module.css'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'

function validarEmail(email) {
  // Expresión regular para verificar un formato de correo electrónico
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailRegex.test(email);
}
export default function AddEmailAndPassword({ setForm, form, setPage, page }) {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [createNegocioVDos, { loading, data, error }] = useMutation(CREATE_NEGOCIO_VDOS,)
  const [errorEmail, setErrorEmail] = useState(null)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarEmail(form.email?.trim())) {
      return setErrorEmail('La dirección de correo electrónico no es válida.')
    }
    createNegocioVDos({ variables: { username: form?.username.trim(), email: form?.email, password: form?.password } })
    setForm({ ...form, checked: true })
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, checked: false })
  }
  useEffect(() => {
    if (data) {
      let token = data?.createNegocioVDos.token
      localStorage.setItem('negocioToken', JSON.stringify(token))
      login(data?.createNegocioVDos)
      setForm({ ...form, checked: true })
      setPage(2)
    }
  }, [data])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
      {/* <ion-icon style={{ fontSize: '20px', }} onClick={() => setPage(0)} name="chevron-back-outline"></ion-icon> */}
      <Icon name={IconCatalog.chevronBackOutline} size={'md'} onClick={() => setPage(0)} />
      <p style={{ fontSize: '14px', color: '#4EDD76', fontWeight: '600', marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '8px' }}><ion-icon style={{ color: '#4EDD76', fontSize: '24px' }} name="storefront-outline"></ion-icon>Bienvenido {form.username}!</p>
      <h1 className={styles.titleAccess}>Completa los siguientes datos.</h1>

      <form className={styles.containerForm} onSubmit={handleSubmit}>
        <div className={styles.containerEmailPass}>
          <input onChange={handleChange} name="email" required type="email" placeholder="Correo electronico" value={form.email} style={{ border: error && form?.checked ? '1px solid #f50057' : 'none', }} className={styles.inputsEmailPass} />
          <div className={styles.containerInputAcceso}>
            <input onChange={handleChange} name="password" minLength={6} required type={visiblePassword ? 'text' : 'password'} placeholder="Contraseña" value={form.password} className={styles.inputAcceso} />
            {visiblePassword
              ? <Icon name={IconCatalog.eyeOutline} size={'md'} onClick={() => setVisiblePassword(!visiblePassword)} />
              : <Icon name={IconCatalog.eyeOutlineOff} size={'md'} onClick={() => setVisiblePassword(!visiblePassword)} />
            }
          </div>
        </div>
        {(error || errorEmail) && (
          <p
            style={{
              color: '#f50057',
              fontSize: '14px',
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon name={IconCatalog.alertCircle} size='md' />
            {error?.message || errorEmail}
          </p>
        )}
        <button disabled={loading} type="submit" className={styles.button2}>
          {loading
            ? <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px' }}>Creando...</p>
            :
            "Crear perfil"
          }
        </button>


      </form>
    </div>

  )
}