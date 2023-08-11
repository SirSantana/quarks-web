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
    <section>
      {/* <div className={styles.container}>
        <h3 className={styles.title1}>Estas listo para cotizar tus repuestos sin salir de casa y sin altas comisiones?</h3>
        <button onClick={() => router.push('/')} className={styles.button}>
          Cotiza ya!
        </button>
      </div> */}
      <div className={styles.containerFooter}>
        
        <div className={styles.containerFooter2}>
          <div className={styles.containerText}>
            <h4 className={styles.title2}>Talleres mecanicos</h4>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/lujos-Bogota,%20Colombia/'}><p className={styles.subtitle}>Talleres de Accesorios y Lujos</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Aire%20acondicionado-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Aire acondicionado</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Alineación%20y%20balanceo-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Alineación y balanceo</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Baterias-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Baterias</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Cajas-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Caja y transmisión</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Cambio%20de%20aceite-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Cambio de aceite</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Clutch-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Clutch</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Motor-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Correas</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Suspensión-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Direccion y suspension</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Eléctricos-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Eléctricos</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Frenos-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Frenos</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Inyeccion-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Inyeccion</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Latoneria%20y%20pintura-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Latonería y pintura</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/Mecanico%20a%20Domicilio-Bogota,%20Colombia'}><p className={styles.subtitle}>Mecanico a domicilio</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Motor-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Motor</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Peritaje-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Peritaje</p></Link>
            <Link style={{ textDecoration: 'none', marginBottom:'8px' }} href={'/servicios-automotriz/Sincronizacion-Bogota,%20Colombia'}><p className={styles.subtitle}>Talleres de Sincronización</p></Link>

          </div>

          


          {/* <div className={styles.containerText}>
            <h4 className={styles.title2}>Producto</h4>
            <p className={styles.subtitle}>¿Cómo funciona?</p>
            <Link style={{ textDecoration: 'none' }} href={'/'}><p className={styles.subtitle}>Cotiza ahora!</p></Link>
            <Link style={{ textDecoration: 'none' }} href={'/vendedor'}><p className={styles.subtitle}>¿Eres vendedor?</p></Link>
            <Link style={{ textDecoration: 'none' }} href={'/cotizaciones'}><p className={styles.subtitle}>Busca tu repuesto</p></Link>
            <p className={styles.subtitle}>Beneficios</p>
          </div> */}

          <div className={styles.containerText}>
            <h4 className={styles.title2}>Acerca de Nosotros</h4>
            <Link style={{ textDecoration: 'none' }} href={'/quienessomos'} ><p className={styles.subtitle}>¿Quienes somos?</p></Link>

            {/* <Link style={{ textDecoration: 'none' }} href={'/faq'} ><p className={styles.subtitle}>Preguntas frecuentes</p></Link> */}
          </div>

          <div className={styles.containerText}>
            <h4 className={styles.title2}>Legal</h4>
            <Link style={{ textDecoration: 'none' }} href='https://www.privacypolicies.com/live/09cd59af-1d7b-47b5-9dde-2e78d4dc9770' ><p className={styles.subtitle}>Politica de Privacidad</p></Link>
          </div>
        </div>

        <div className={styles.containerSocial}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
            <Link style={{ textDecoration: 'none' }} href='https://www.instagram.com/quarks_app/'><img src={WhatsappLogo.src} className={styles.logo} /></Link>
            {/* <Link style={{ textDecoration: 'none' }} href='https://wa.link/io9ypp'><img src={WhatsappLogo.src} className={styles.logo} /></Link> */}
            <Link style={{ textDecoration: 'none' }} href='https://www.facebook.com/profile.php?id=100092259191727'><img src={InstagramLogo.src} className={styles.logo} /></Link>
          </div>
          <p className={styles.subtitleCopy}>(C) copyright Quarks 2023</p>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
            <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>Quarks</h4>
            <img src={Logo.src} className={styles.image} />
          </div>
      </div>
    </section>
  )
}