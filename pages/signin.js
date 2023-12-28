
import { SIGNIN_NEGOCIO_VDOS } from '@/graphql/mutations'
import useAuth from '@/hooks/useAuth'
import Layout from '@/src/Components/Layout'
import AddDatosImportantes from '@/src/Components/Register/AddDatosImportantes'
import AddEmailAndPassword from '@/src/Components/Register/AddEmailAndPassword'
import AddServicios from '@/src/Components/Register/AddServicios'
import VerifyUsername from '@/src/Components/Register/VerifyUsername'
import styles from '@/styles/Faq.module.css'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

let initialForm = {
  email: '',
  password: '',
}

export default function SignIn() {
  const [form, setForm] = useState(initialForm)
  const { user, login } = useAuth()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const router = useRouter()
  const [signInNegocio, { loading, data, error }] = useMutation(SIGNIN_NEGOCIO_VDOS,)


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signInNegocio({ variables: {email:form?.email, password:form?.password}})
  }
  useEffect(() => {
    if (data) {
      localStorage.setItem('negocioToken', JSON.stringify(data?.signInNegocio.token))
      login(data?.signInNegocio?.token)
      setForm(initialForm)
      router.reload()
      // router.push(`/${data?.signInNegocio.negocio.userName}`)
    }
  }, [data])
  useEffect(()=>{
    if(user){
       router.replace(`/${user.userName}`)
    }
  },[user])
  return (
    <Layout title={'Obten acceso temprano'} visibleNavbar={false}>
      <div className={styles.containerAcceso} >

        {user && form.checked ?
          <p>Ya tienes una sesion iniciada</p>
          :
          <>
            <img src="./card-almacen-prev.png" className={styles.imgCard} alt="Crea tu perfil" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
              {/* <p style={{ fontSize: '14px', color: '#4EDD76', fontWeight: '600', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><ion-icon style={{ color: '#4EDD76', fontSize: '24px' }} name="ribbon-outline"></ion-icon>+50 talleres y almacenes registrados</p> */}
              <h1 className={styles.titleAccess}>Inicia sesion</h1>
              <p style={{ margin: '8px 0 32px 0', color: '#5c5c5c' }}>
                Completa los datos y podras editar tu taller.
              </p>

              <form className={styles.containerForm} onSubmit={handleSubmit}>
                <div className={styles.containerEmailPass}>
                  <input onChange={handleChange} name="email" required type="email" placeholder="Correo electronico" value={form.email}  className={styles.inputsEmailPass} />
                  <div className={styles.containerInputAcceso}>
                    <input onChange={handleChange} name="password" minLength={6} required type={visiblePassword ? 'text' : 'password'} placeholder="Contraseña" value={form.password} className={styles.inputAcceso} />
                    {visiblePassword
                      ? <ion-icon onClick={() => setVisiblePassword(!visiblePassword)} style={{ fontSize: '20px', cursor: 'pointer' }} name="eye-outline"></ion-icon>
                      : <ion-icon onClick={() => setVisiblePassword(!visiblePassword)} style={{ fontSize: '20px', cursor: 'pointer' }} name="eye-off-outline"></ion-icon>
                    }
                  </div>
                </div>
                {(error) && (
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
                    <ion-icon style={{ fontSize: '20px' }} name="alert-circle"></ion-icon>
                    {error?.message}
                  </p>
                )}
                <button disabled={loading} type="submit" className={styles.button2}>
                  {loading
                    ? <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px' }}>Creando...</p>
                    :
                    "Ingresar"
                  }
                </button>


              </form>
            </div>


          </>
        }
      </div>
    </Layout >
  )
}