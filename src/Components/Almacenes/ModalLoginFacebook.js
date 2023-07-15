import styles from '@/styles/Almacenes.module.css'
import { signIn } from 'next-auth/react'

export default function ModalLoginFacebook({ setVisibleModalLogin }) {


  return (
    <div className={styles.modalContent} style={{ width: '90%', borderRadius: '8px', maxWidth: '400px', padding: '32px', boxSizing: 'border-box' }}>
      <ion-icon onClick={() => setVisibleModalLogin(false)} style={{ fontSize: '32px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
      <ion-icon style={{ fontSize: '64px', color: '#373737', marginBottom: '16px' }} name="person-circle-outline"></ion-icon>
      <h1  style={{color:'#373737'}} className={styles.title2}>Ingresa con google o facebook y listo!</h1>
      <p style={{ fontSize: '14px', textAlign: 'center' }} className={styles.subtitle}>Solo falta que ingreses a tu cuenta para que puedas escribir una reseña</p>
      <button onClick={()=> signIn('facebook')} style={{cursor:'pointer', borderRadius: '4px',color:'white',alignItems:'center', display:'flex',gap:'16px',marginTop:'32px',width:'100%',display:'flex', justifyContent:'center',  height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#3b5998' }}>
        <ion-icon style={{fontSize:'24px',color:'white'}} name="logo-facebook"></ion-icon>
        Ingresa con facebook
      </button>
      <button onClick={()=> signIn('google')} style={{cursor:'pointer', borderRadius: '4px',color:'white',alignItems:'center', display:'flex',gap:'16px',marginTop:'16px', width:'100%',display:'flex', justifyContent:'center', height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#D0463B' }}>
        <ion-icon style={{fontSize:'24px',color:'white'}} name="logo-google"></ion-icon>
        Ingresa con google
      </button>
    </div>

  )
}