

import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Vendedor.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'




export default function MiPerfilVendedor() {
  const router = useRouter()
  const id = router?.query?.id
  const { logout } = useAuth();
  

  const handleCloseSesion = () => {
    logout()
    localStorage.clear()
    router.push('/')
  }
  return (
    < >
      <h1 className={styles.title}>Mi perfil</h1>
      <section className={styles.containerBoxes}>
        <div className={styles.boxPerfil}>
          <div>
            <h3 style={{ margin: 0, width: '100%' }} className={styles.title2}>Datos de tu Perfil</h3>
            <p style={{ margin: 0, width: '100%' }} className={styles.subtitle}>Edita los datos de tu perfil</p>
          </div>
          <Link href={`/vendedor/perfil/${id}/editar`}>
            <button style={{ margin: 0, height: '40px', backgroundColor: 'white', color: '#f50057', border: '1px solid #f50057', }} className={styles.button}>Editar</button>
          </Link>
        </div>

        <div className={styles.boxPerfil}>
          <div >
            <h3 style={{ margin: 0, width: '100%' }} className={styles.title2}>Seguridad</h3>
            <p style={{ margin: 0, width: '100%' }} className={styles.subtitle}>Por tu seguridad te recomendamos cambiar tu contraseña periodicamente</p>
          </div>
          <Link href={`/vendedor/perfil/${id}/cambiar-contrasena`}>
            <button style={{ margin: 0, height: '40px', backgroundColor: 'white', color: '#f50057', border: '1px solid #f50057' }} className={styles.button}>Cambiar Contraseña</button>
          </Link>

        </div>

        <div onClick={handleCloseSesion} className={styles.boxPerfil}>
          <h3 style={{ margin: 0, }} className={styles.title2}>Salir de quarks.com.co</h3>
          <button style={{ margin: 0, height: '40px', }} className={styles.button}>Cerrar sesion</button>
        </div>
      </section>
    </ >
  )
}