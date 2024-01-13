import styles from '@/styles/Landing.module.css'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'

export default function SectionVariedadTalleres() {
  return (
    <section className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src='/carespejo.svg' className={styles.imgPrincipal} alt='Taller mecanico de carros'/>
          <a style={{ fontSize: '14px', }} href="https://storyset.com/transport">Illustrations by Storyset</a>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Variedad de talleres de carros</h2>
          <p className={styles.subtitle2}>Encuentra talleres de carros para cualquier servicio, desde latoneria y pintura, hasta reparacion de motor y mas en un solo lugar.</p>
          <Button link={true} href={'/'} variant={ButtonVariant.primary} size={ButtonSize.base} >
            Buscar ahora
          </Button>
        </div>
      </div>
    </section>
  )
}