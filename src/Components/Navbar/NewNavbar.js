import styles from '@/styles/Navbar.module.css'
import { ModalVisibleMenuNavbar } from '@/utils/Modales'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'


export default function NewNavbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  },[])
  console.log(width);

  return (
    <div 
    // className={open && styles.modal
    >

    <header   ref={ref} className={styles.newHeader}>
      <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }} href={'/'}>
        <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color:'#5B0221', fontSize:'24px' }} className={styles.title}>Quarks</h1>
        <img alt={'Cotiza tus repuestos logo'} src={'/Logo.png'} style={{ height: '26px', width: '26px', marginLeft: '8px' }} />
      </Link>

      <ul 
      style={{display:width > 1080? 'flex': open ? 'flex': 'none'}}
       className={styles.navv}>
        <li className={styles.li}><Link style={{ textDecoration: 'none', color:router?.pathname === '/' && '#5B0221'}}className={styles.newSubtitle} href={'/'}>Articulos</Link></li>
        <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/cotizaciones' && '#5B0221' }}className={styles.newSubtitle} href={'/cotizaciones'}>Trivias</Link></li>
        <li className={styles.li}><Link style={{ textDecoration: 'none', color:router?.pathname === '/almacenes' && '#5B0221'}}className={styles.newSubtitle} href={'/almacenes'}>Diccionario automotriz</Link></li>
      </ul>
      {width <= 180 && <img onClick={()=> setOpen(open ? false: true)} alt={'Menu'} src={open?'./close.svg' :'/menu2.svg'} className={styles.menu} style={{display: width <=1080? 'flex':'none'}} />}

    </header>
    </div >


  )
}