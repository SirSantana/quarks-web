import styles from '@/styles/Footer.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '@/public/logoquarks200623.png'
import InstagramLogo from '@/public/FacebookLogo.png'
import WhatsappLogo from '@/public/InstagramLogo.png'
import FacebookLogo from '@/public/WhatsappLogo.png'


export default function Footer() {
  const router = useRouter()
  return (
    <footer>
      <div className={styles.containerFooter}>
        <div className={styles.containerFooter2}>
          <div className={styles.containerText}>
            <h4 className={styles.title2}>Talleres mecanicos</h4>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/lujos-Bogota,%20Colombia/'}>Talleres de Accesorios y Lujos</Link>
            <Link className={styles.subtitle}  style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Aire%20acondicionado-Bogota,%20Colombia'}>Talleres de Aire acondicionado</Link>
            <Link className={styles.subtitle}  style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Alineación%20y%20balanceo-Bogota,%20Colombia'}>Talleres de Alineación y balanceo</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Baterias-Bogota,%20Colombia'}>Talleres de Baterias</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Cajas-Bogota,%20Colombia'}>Talleres de Caja y transmisión</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Cambio%20de%20aceite-Bogota,%20Colombia'}>Talleres de Cambio de aceite</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Clutch-Bogota,%20Colombia'}>Talleres de Clutch</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Motor-Bogota,%20Colombia'}>Talleres de Correas</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Suspensión-Bogota,%20Colombia'}>Talleres de Direccion y suspension</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Eléctricos-Bogota,%20Colombia'}>Talleres de Eléctricos</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Frenos-Bogota,%20Colombia'}>Talleres de Frenos</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Inyeccion-Bogota,%20Colombia'}>Talleres de Inyeccion</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Latoneria%20y%20pintura-Bogota,%20Colombia'}>Talleres de Latonería y pintura</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/Mecanico%20a%20Domicilio-Bogota,%20Colombia'}>Mecanico a domicilio</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Motor-Bogota,%20Colombia'}>Talleres de Motor</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Peritaje-Bogota,%20Colombia'}>Talleres de Peritaje</Link>
            <Link className={styles.subtitle} style={{ textDecoration: 'none', marginBottom: '8px' }} href={'/servicios-automotriz/Sincronizacion-Bogota,%20Colombia'}>Talleres de Sincronización</Link>
          </div>
          <div className={styles.containerText}>
            <h4 className={styles.title2}>Acerca de Nosotros</h4>
            <Link style={{ textDecoration: 'none' }} href={'/quienessomos'} ><p className={styles.subtitle}>¿Quienes somos?</p></Link>
          </div>
          <div className={styles.containerText}>
            <h4 className={styles.title2}>Legal</h4>
            <Link rel='noopener noreferrer' style={{ textDecoration: 'none' }} href='https://www.privacypolicies.com/live/09cd59af-1d7b-47b5-9dde-2e78d4dc9770' ><p className={styles.subtitle}>Politica de Privacidad</p></Link>
          </div>
        </div>
        <div className={styles.containerSocial}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
            <Link rel='noopener noreferrer' style={{ textDecoration: 'none' }} href='https://www.instagram.com/quarks_app/'><img src={WhatsappLogo.src} className={styles.logo} /></Link>
            <Link rel='noopener noreferrer' style={{ textDecoration: 'none' }} href='https://www.facebook.com/profile.php?id=100092259191727'><img src={InstagramLogo.src} className={styles.logo} /></Link>
          </div>
          <p className={styles.subtitleCopy}>(C) copyright Quarks 2023</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
          <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>Quarks</h4>
          <img src={Logo.src} className={styles.image} />
        </div>
      </div>
    </footer>
  )
}