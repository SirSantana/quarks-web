import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLayoutEffect, useRef, useState } from 'react'


export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const [width, setWidth] = useState(0);


  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);
  return (
    <div className={open && styles.modal} >

    <header  ref={ref} className={styles.header2}>

      <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }} href={'/'}>
        <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.title}>Quarks</h1>
        <img alt={'Cotiza tus repuestos logo'} src={'/Logo.png'} style={{ height: '26px', width: '26px', marginLeft: '8px' }} />
      </Link>

      <ul   style={{display:width > 1080? 'flex': open ? 'flex': 'none'}} className={styles.navv}>
        <li className={styles.li}><Link style={{ textDecoration: 'none', color:router?.pathname === '/' && '#5B0221'}}className={styles.subtitle} href={'/'}>Inicio</Link></li>
        <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/cotizaciones' && '#5B0221' }}className={styles.subtitle} href={'/cotizaciones'}>Cotizaciones</Link></li>
        {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/blog' && '#5B0221' }}className={styles.subtitle}href={'/'}>Blog</Link></li> */}
        <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/almacenes' && '#5B0221' }}className={styles.subtitle} href={'/almacenes'}>Almacenes</Link></li>
        <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/vendedor' && '#5B0221' }}className={styles.subtitle}href={'/vendedor'}>Ingresar</Link></li>
      </ul>
      <img onClick={()=> setOpen(open ? false: true)} alt={'Menu'} src={open?'./close.svg' :'/menu2.svg'} className={styles.menu} style={{display: width <=1080? 'block':'none'}} />
    </header>
    </div >

  )
}