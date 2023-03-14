import styles from '@/styles/Footer.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '@/public/Logo.png'
import InstagramLogo from '@/public/FacebookLogo.png'
import WhatsappLogo from '@/public/InstagramLogo.png'
import FacebookLogo from '@/public/WhatsappLogo.png'


export default function Footer() {
  const router = useRouter()
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title1}>Estas listo para cotizar tus repuestos sin salir de casa y sin altas comisiones?</h3>
        <button onClick={() => router.push('/')} className={styles.button}>
          Cotiza ya!
        </button>
      </div>
      <div className={styles.containerFooter}>
        <div className={styles.containerFooter2}>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
            <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>Quarks</h4>
            <img src={Logo.src} className={styles.image} />
          </div>


          <div className={styles.containerText}>
            <h4 className={styles.title2}>Producto</h4>
            <p className={styles.subtitle}>¿Cómo funciona?</p>
            <Link style={{ textDecoration: 'none' }} href={'/'}><p className={styles.subtitle}>Cotiza ahora!</p></Link>
            <Link style={{ textDecoration: 'none' }} href={'/vendedor'}><p className={styles.subtitle}>¿Eres vendedor?</p></Link>
            <Link style={{ textDecoration: 'none' }} href={'/cotizaciones'}><p className={styles.subtitle}>Busca tu repuesto</p></Link>
            <p className={styles.subtitle}>Beneficios</p>
          </div>

          <div className={styles.containerText}>
            <h4 className={styles.title2}>Acerca de Nosotros</h4>
            <Link style={{ textDecoration: 'none' }} href={'/contactanos'} ><p className={styles.subtitle}>Contactanos</p></Link>
            <Link style={{ textDecoration: 'none' }} href={'/quienessomos'} ><p className={styles.subtitle}>¿Quienes somos?</p></Link>

            <Link style={{ textDecoration: 'none' }} href={'/faq'} ><p className={styles.subtitle}>Preguntas frecuentes</p></Link>
          </div>

          <div className={styles.containerText}>
            <h4 className={styles.title2}>Legal</h4>
            <Link style={{ textDecoration: 'none' }} href='https://www.privacypolicies.com/live/09cd59af-1d7b-47b5-9dde-2e78d4dc9770' ><p className={styles.subtitle}>Politica de Privacidad</p></Link>
          </div>
        </div>

        <div className={styles.containerSocial}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
            <Link style={{ textDecoration: 'none' }} href='https://www.facebook.com/COlmotors/'><img src={FacebookLogo.src} className={styles.logo} /></Link>
            <Link style={{ textDecoration: 'none' }} href='https://wa.link/io9ypp'><img src={WhatsappLogo.src} className={styles.logo} /></Link>
            <Link style={{ textDecoration: 'none' }} href='https://www.instagram.com/quarks_app/'><img src={InstagramLogo.src} className={styles.logo} /></Link>
          </div>
          <p className={styles.subtitleCopy}>(C) copyright Quarks 2023</p>

        </div>

      </div>
    </>
  )
}