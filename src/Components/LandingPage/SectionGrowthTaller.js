import styles from '@/styles/Landing.module.css'
import Link from 'next/link'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'



export default function SectionGrowthTaller() {
  return (
    <section className={styles.containerGrowthTaller}>
      <div className={styles.containerGrowth}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title}>Haz crecer tu negocio con nosotros. Unete Gratis!</h2>
          <Button link={true} href={'/acceso'} variant={ButtonVariant.primary} size={ButtonSize.base} >
            Conoce mas
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src={'./fotostoredefault.png'} className={styles.imgPrincipal} />
        </div>
      </div>
    </section>
  )
}