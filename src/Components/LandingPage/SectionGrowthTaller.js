import styles from '@/styles/Landing.module.css'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'
import Image from 'next/image'

export default function SectionGrowthTaller() {
  return (
    <section className={styles.containerGrowthTaller}>
      <div className={styles.containerGrowth}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title}>Haz crecer tu negocio con nosotros!</h2>
          <Button link={true} href={'/acceso'} variant={ButtonVariant.primary} size={ButtonSize.base} >
            Conoce mas
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <Image width={450} height={400} src={'/fotostoredefault.png'} className={styles.imgPrincipal} alt='La forma mas facil de crecer tu taller mecanico automotriz'/>
        </div>
      </div>
    </section>
  )
}