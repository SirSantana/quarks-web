import styles from '@/styles/Landing.module.css'
import Link from 'next/link'



export default function SectionGlosario() {
  return (
    <section className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src='/glosarioautomotriz.png' className={styles.imgPrincipal} />
          <a style={{ fontSize: '14px', }} href="https://storyset.com/transport">Illustrations by Storyset</a>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Conoce mas de tu carro</h2>
          <h4 className={styles.subtitle2}>Tenemos a disposicion gratuita un glosario de autopartes donde de manera clara y concisa son explicados partes de tu vehiculo.</h4>
          <Link className={styles.button} href={'/glosario-de-autopartes'} style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}>
            Ver glosario
          </Link>
        </div>
      </div>
    </section>
  )
}