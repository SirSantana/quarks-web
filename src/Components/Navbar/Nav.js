
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'


export default function Nav() {
  return (
    <div className={styles.containerNav}>
      <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }} href={'/'}>
        <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.title}>Quarks</h1>
        <img alt={'dropdown'} src={'/Logo.png'} style={{ height: '26px', width: '26px', marginLeft: '8px' }} />
      </Link>
      <div className={styles.containerItems}>
        <Link style={{ textDecoration: 'none' }} href={'/cotizaciones'}>
          <h3 className={styles.subtitle}>Cotizaciones</h3>
        </Link>

        <Link style={{ textDecoration: 'none' }} href={'/vendedor'}>
          <h3 className={styles.subtitle}>¿Eres vendedor?</h3>
        </Link>
      </div>
    </div>
  )
}