import styles from '@/styles/Landing.module.css'
import Link from 'next/link'



export default function SectionGrowthTaller() {
  return (
    <div className={styles.containerGrowthTaller}>
      <div className={styles.containerGrowth}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title}>Haz crecer tu negocio con nosotros. Unete Gratis!</h2>
          <button className={styles.button}>
            <Link href={'/servicios-automotriz/crear-taller'} style={{textDecoration:'none', color:'white'}}>
            Conoce mas
            </Link>
          </button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src={'./fotostoredefault.png'} className={styles.imgPrincipal} />
        </div>
      </div>
    </div>
  )
}