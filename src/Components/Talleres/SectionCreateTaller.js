
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Icon, { IconCatalog } from '../Icon/Icon'

export default function SectionCreateTaller() {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display:'flex', gap:'16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.rocketOuline} size='lg'/>Tienes un taller? Crea tu perfil</h2>
      <Link href={'/acceso'} style={{ color: '#373737', textDecoration: 'none', cursor: 'pointer', backgroundColor: '#FED569', position: 'relative', overflow: 'hidden' }} className={`${styles.containerHeaderCalendario}`}>
        <div style={{ width: '65%', gap: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '32px', fontWeight: '700', lineHeight: '40px' }}>Haz crecer tu taller!</p>
          <p style={{ fontSize: '12px', fontWeight: '600' }}>Unete gratis</p>
        </div>
        <Image
          sizes="45%"
          width={100}
          height={120}
          alt='Taller de carros en Bogota'
          src='/taller-ilustration.png' style={{
            width: '45%',
            position: 'absolute',
            objectFit: 'contain',
            bottom: '-10px', // Ajusta según sea necesario para que sobresalga un poco
            right: '-10px', // Ajusta según sea necesario para que sobresalga un poco
          }} />
      </Link>
    </>
  )
}