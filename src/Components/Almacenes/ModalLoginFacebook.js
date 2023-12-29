import styles from '@/styles/Almacenes.module.css'
import { signIn, signOut, useSession, } from 'next-auth/react'

export default function ModalLoginFacebook({ setVisibleModalLogin, }) {

  const { data: session } = useSession()
  console.log(session);

  return (
    <div className={styles.modalContent} style={{ width: '90%', borderRadius: '8px', maxWidth: '400px', padding: '16px', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', marginBottom: '32px', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
          <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Ingresa con tu cuenta</p>
          {/* <ion-icon onClick={() => setVisibleModalLogin(false)} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon> */}
        </div>
        <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
      </header>

      <ion-icon style={{ fontSize: '64px', color: '#373737', marginBottom: '16px' }} name="person-circle-outline"></ion-icon>
      <h1 style={{ color: '#373737' }} className={styles.title2}>Ingresa con google o facebook y listo!</h1>
      <p style={{ fontSize: '14px', textAlign: 'center' }} className={styles.subtitle}>Solo falta que ingreses a tu cuenta, lo hacemos para saber quien eres</p>
      <button onClick={() => signIn('facebook')} style={{ cursor: 'pointer', borderRadius: '4px', color: 'white', alignItems: 'center', display: 'flex', gap: '16px', marginTop: '32px', width: '100%', display: 'flex', justifyContent: 'center', height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#3b5998' }}>
        <ion-icon style={{ fontSize: '24px', color: 'white' }} name="logo-facebook"></ion-icon>
        Ingresa con facebook
      </button>
      <button onClick={() => { signIn('google'), setVisibleModalLogin(false) }} style={{ cursor: 'pointer', borderRadius: '4px', color: 'white', alignItems: 'center', display: 'flex', gap: '16px', marginTop: '16px', width: '100%', display: 'flex', justifyContent: 'center', height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#D0463B' }}>
        <ion-icon style={{ fontSize: '24px', color: 'white' }} name="logo-google"></ion-icon>
        Ingresa con google
      </button>
      {session &&
        <button style={{border:'none',cursor:'pointer', fontSize:'14px', fontWeight:'600',margin:'16px 0', backgroundColor:'white', color:'#373737'}} onClick={() => { signOut(), setVisibleModalLogin(false) }}>
          Cerrar sesion
        </button>
      }
    </div>

  )
}