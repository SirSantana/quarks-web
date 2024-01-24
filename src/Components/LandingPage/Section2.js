import styles from '@/styles/Landing.module.css'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'
import { IconCatalog } from '../Icon/Icon'
import Image from 'next/image'



export default function SectionCotizaciones() {
  return (
    <section style={{ backgroundColor: '#FDFDFD' }} className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Mecanico automotriz</h2>
          <p className={styles.subtitle2}>Cada taller automotriz, tienen su horario de servicio, direccion, numeros de contacto, servicios ofrecidos, y mas.</p>
          <Button link={true} href={'/servicios-automotriz/Taller-mecanico'} variant={ButtonVariant.primary} size={ButtonSize.base} icon={IconCatalog.arrowForwardOutline}>
            Mirar talleres
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <Image width={450} height={400} src='/cardtallerUno.jpg' className={styles.imgPrincipal} alt='Talleres mecanicos cerca a mi en Bogota'/>
        </div>
      </div>
    </section>
  )
}