import styles from '@/styles/Landing.module.css'
import Link from 'next/link'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'



export default function SectionCotizaciones() {
  return (
    <section style={{ backgroundColor: '#FDFDFD' }} className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Informacion de cada taller automotriz</h2>
          <p className={styles.subtitle2}>Cada taller automotriz, tienen su horario de servicio, direccion, numeros de contacto, servicios ofrecidos, y mas.</p>
          <Button link={true} href={'/servicios-automotriz/Taller-mecanico'} variant={ButtonVariant.primary} size={ButtonSize.base} icon={'arrowForwardOutline'}>
            Mirar talleres
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <img src='/cardtallerUno.jpg' className={styles.imgPrincipal} />
        </div>
      </div>
    </section>
  )
}