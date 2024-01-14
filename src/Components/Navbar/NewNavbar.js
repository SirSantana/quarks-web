

import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Select from 'react-select'
import { customStyles, options2 } from '../Main/Main'
import styles2 from '@/styles/Landing.module.css'
import CategoriasSlider from '../LandingPage/CategoriasSlider';
import Image from 'next/image';

 export const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos' },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'Baterias' },
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

const initialForm = {
  servicio: 'Taller mecanico',
  localidad: 'Bogota, Colombia'
}

export default function NewNavbarWithSearch2({ visibleSlider }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [form, setForm] = useState(initialForm)

  const categoriaRouter = router?.query?.id?.split("-")[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/servicios-automotriz/${form.servicio}-${form.localidad}`)
  }

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} className={open && styles.modal}>
      <div ref={ref} className={` ${styles.header}`}>
        <div className={styles.navDiv}>
          <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
            <Image alt={'Cotiza tus repuestos logo'} width={32} height={32} src={'/logoquarks200623.png'} />
            <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.titleNav}>Quarks Talleres</h3>
          </Link>
          <form onSubmit={handleSubmit} className={styles2.homeCard}>
            <input aria-label='Search' onChange={(e) => setForm({ ...form, servicio: e.target.value })} className={styles.input} type="search" id="search" placeholder={'Buscar...'} />
            <div className={styles.separatorSearch} />
            <div className={styles2.select2}>
              <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
            </div>
            <div onClick={handleSubmit} style={{ cursor: 'pointer' }} className={styles2.buttonSearch}>
              <ion-icon style={{ color: 'white', fontSize: '20px' }} name="search-outline"></ion-icon>
            </div>
          </form>
          <ul className={styles.navv}>
            <Link style={{ textDecoration: 'none', color: router?.pathname === '/acceso' ? '#373737' : '#464646' }} className={styles.subtitle} href={'/acceso'}>Tienes un Taller?</Link>
          </ul>
        </div>
        {visibleSlider && <section className={styles.sectionSliderShowNav}>
          <CategoriasSlider categorias={categorias} />
        </section>}
      </div>
    </header>

  )
}