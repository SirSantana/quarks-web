
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Link from 'next/link'


export default function RedesSociales({ data }) {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Redes Sociales</h2>
      <Link href={data?.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', backgroundColor: 'rgba(0, 128, 255, 0.1)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px', color: '#0080FF', }} name="logo-facebook"></ion-icon>
          <p style={{ fontSize: '14px' }}>Facebook</p>
        </div>
      </Link>

      <Link href="#" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', backgroundColor: 'rgba(235, 66, 100, 0.1)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px', color: '#EB4264', }} name="logo-instagram"></ion-icon>
          <p style={{ fontSize: '14px' }}>Instagram</p>
        </div>
      </Link>

      <Link href={data?.paginaweb}  style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', backgroundColor: '#f1f1f1', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <img style={{ borderRadius: '50%', border: '1px solid #f1f1f1', width: '20px', height: '20px', }} src={data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
          <p style={{ fontSize: '14px' }}>Pagina Web</p>
        </div>
      </Link>


    </>
  )
}