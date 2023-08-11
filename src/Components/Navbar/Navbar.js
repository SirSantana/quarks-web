import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos' },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'Baterias', url: 'Baterias' },
  { nombre: 'Caja y transmisión', img: 'Caja y Transmision', url: 'Cajas' },
  { nombre: 'Cambio de aceite', img: 'Filtros', url: 'Cambio de aceite' },
  { nombre: 'Clutch', img: 'Clutch', url: 'Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor' },
  { nombre: 'Direccion y suspension', img: 'Direccion y suspension', url: 'Suspensión' },
  { nombre: 'Eléctricos', img: 'Electricos', url: 'Eléctricos' },
  { nombre: 'Frenos', img: 'Frenado', url: 'Frenos' },
  { nombre: 'Inyeccion', img: 'inyeccion', url: 'Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'Carroceria', url: 'Latoneria y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'Motor', url: 'Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica' },

];
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }} className={open && styles.modal} >

      <header ref={ref} className={` ${scrolled ? styles.headerScrolled : styles.header}`}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
          <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.titleNav}>Quarks</h1>
        </Link>

        <ul className={styles.navv}>
          <div className={styles.talleres}>
            <li style={{listStyle:'none', textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' && '#5B0221' }} className={styles.subtitle}>Talleres</li>
            <div className={styles.tooltip}>
              <ul className={styles.ulTipos}>
                {categorias.map(el => (
                  <li onClick={()=> router.push(`/servicios-automotriz/${el.url}-Bogota,%20Colombia`)} key={el.nombre}>
                      <img src={`./${el.img}.png`} style={{ height: '20px', width: '20px' }} />
                      {el.nombre}

                  </li>
                ))}

              </ul>
            </div>
          </div>

          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/glosario-de-autopartes' && '#5B0221' }} className={styles.subtitle} href={'/glosario-de-autopartes'}>Glosario</Link></li>
          {/* <button>Tienes un taller?</button> */}

        </ul>

      </header>
    </div >


  )
}