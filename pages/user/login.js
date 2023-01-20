import LoginForm from "../../components/User/LoginForm";
import styles from '../../components/Home/styles.module.css'
import Layout from "../../components/Layout";
import Link from 'next/link'
let marcas = ['Chevrolet', 'Mazda', 'Ford', 'Renault']
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter()
  const { user, logout } = useAuth();

  const handleCloseSesion = () => {
    logout()
    localStorage.clear()
    router.push('/')
  }
  return (
    <Layout title={'Inicio Sesion vendedores - Quarks'} type='website' description={'Eres vendedor de repuestos para carros?'}>
      <section className={styles.container} style={{ marginTop: '80px' }}>

        <div className={styles.containerManual} style={{ alignItems: 'flex-start', padding: '0 10px' }}>

          <div className={styles.containerManual2} >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {marcas.map(marca => (
                <img src={`/${marca}.png`} style={{ width: '50px', height: '50px' }} alt={`Repuestos de ${marca}`} />
              ))}
            </div>

            <h1 style={{ margin: '10px 0' }} className={styles.titleBlue}>Bienvenido de nuevo <b style={{ color: '#f50057' }}></b>  </h1>
            {!user &&
              <>
                <h2 style={{ fontWeight: 400 }} className={styles.titleBlue2} >Inicia sesion y empieza a vender! </h2>
                <Link href={'/vendedor'} ><button style={{ width: '100%', marginTop: '20px' }} className={styles.button}>¿No eres vendedor? Registrate</button></Link>
              </>
            }
          </div>
          {user ? (
            <div className={styles.container4} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <h2 style={{ color: "#1b333d" }}>Ya tienes una sesion iniciada</h2>
              <button style={{ width: '100%', marginTop: '20px' }} className={styles.button} onClick={() => router.push('/cotizaciones')}>Ir a cotizar</button>
              <button style={{ width: '100%', marginTop: '20px', backgroundColor: 'white', color: '#f50057' }} className={styles.button} onClick={handleCloseSesion}>Cerrar sesion</button>
            </div>
          ) : (
            <LoginForm />

          )}
        </div>
      </section>
    </Layout>
  )
}