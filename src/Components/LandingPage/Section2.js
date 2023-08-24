import styles from '@/styles/Landing.module.css'
import Link from 'next/link'



export default function SectionCotizaciones() {
  return (
    <section style={{ backgroundColor: '#FDFDFD' }} className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>

        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Informacion de cada taller</h2>
          <h4 className={styles.subtitle2}>Cada taller automotriz, tienen su horario de servicio, direccion, numeros de contacto, servicios ofrecidos, y mas.</h4>
          <Link className={styles.button} href={'/servicios-automotriz/Taller mecanico-Bogota, Colombia'} style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}>
            Mirar talleres
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src='/cardtallerUno.jpg' className={styles.imgPrincipal} />
        </div>
      </div>
    </section>
  )
}