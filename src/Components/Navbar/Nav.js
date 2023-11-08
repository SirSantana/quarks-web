import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'


export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const [width, setWidth] = useState(0);


  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);
  return (
    <div className={open && styles.modal} >

      <header ref={ref} className={styles.header2}>

        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
          <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.titleNav}>Quarks</h1>
        </Link>

        <ul className={styles.navv2}>
          {/* <li className={styles.li}><Link style={{fontSize:'14px', textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' && '#5B0221' }} className={styles.subtitle} href={'/servicios-automotriz/Taller mecanico-Bogota, Colombia'}>Talleres</Link></li> */}
          <li className={styles.li}><Link style={{fontSize:'14px', textDecoration: 'none', fontWeight:'500', color: router?.pathname === '/glosario-de-autopartes' ? '#5B0221':'white' }} className={styles.subtitle} href={'/acceso'}>¿Tiene un taller?</Link></li>

          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/cotizaciones' && '#5B0221' }}className={styles.subtitle} href={'/cotizaciones'}>Cotizaciones</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/blog' && '#5B0221' }}className={styles.subtitle}href={'/'}>Blog</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/almacenes' && '#5B0221' }}className={styles.subtitle} href={'/almacenes'}>Almacenes</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/vendedor' && '#5B0221' }}className={styles.subtitle}href={'/vendedor'}>Ingresar</Link></li> */}
        </ul>
      </header>
    </div >

  )
}
