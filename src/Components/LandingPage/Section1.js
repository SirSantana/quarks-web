import styles from '@/styles/Landing.module.css'
import Link from 'next/link'



export default function SectionVariedadTalleres() {
  return (
    <section className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src='/carespejo.svg' className={styles.imgPrincipal} />
          <a style={{ fontSize: '14px', }} href="https://storyset.com/transport">Illustrations by Storyset</a>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Gran variedad de talleres</h2>
          <h4 className={styles.subtitle2}>Encuentra talleres de carros para cualquier servicio, desde latoneria y pintura hasta reparacion de motor</h4>
          <Link className={styles.button} href={'/'} style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}>
            Buscar ahora
          </Link>
        </div>
      </div>
    </section>
  )
}