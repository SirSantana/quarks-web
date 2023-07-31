import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'


export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [width, setWidth] = useState(0);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100vw'}} className={open && styles.modal} >

      <header ref={ref} className={` ${scrolled ? styles.headerScrolled : styles.header}`}>
      <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'16px' }} href={'/'}>
        <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
        <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.titleNav}>Quarks</h1>
      </Link>

        <ul className={styles.navv}>
          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' && '#5B0221' }} className={styles.subtitle} href={'/servicios-automotriz/Taller mecanico-Bogota, Colombia'}>Talleres</Link></li>
          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/glosario-de-autopartes' && '#5B0221' }} className={styles.subtitle} href={'/glosario-de-autopartes'}>Glosario</Link></li>
        </ul>

      </header>
    </div >


  )
}