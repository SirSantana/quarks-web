

import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { customStyles, customStyles2, options, options2 } from '../Main/Main'
import styles2 from '@/styles/Landing.module.css'
import FirstNewScreen from '../LandingPage/FirstNewScreen';

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

const initialForm = {
  servicio: 'Taller mecanico',
  localidad: 'Bogota, Colombia'
}
export default function NewNavbarWithSearch() {
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
            <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
            <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.titleNav}>Quarks</h1>
          </Link>
          <form onSubmit={handleSubmit} className={styles2.homeCard}>
            <div className={styles2.select1}>
              <CreatableSelect isClearable
                styles={customStyles2}
                placeholder="Buscar..."
                onChange={(e) => setForm({ ...form, servicio: e?.value })}
                noOptionsMessage={() => null}
              />
            </div>
            <div className={styles2.select2}>
              <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
            </div>
            <div onClick={handleSubmit} style={{ cursor: 'pointer' }} className={styles2.buttonSearch}>
              <ion-icon style={{ color: 'white', fontSize: '24px' }} name="search-outline"></ion-icon>
            </div>
            {/* <input type='submit' className={styles2.buttonPrimary} value={'Buscar'} /> */}

          </form>
          <ul className={styles.navv}>
            <div className={styles.talleres}>
              <li style={{ listStyle: 'none', cursor: 'pointer', textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' ? '#373737' : '#373737' }} className={styles.subtitle}>Talleres</li>
              <div className={styles.tooltip}>
                <ul className={styles.ulTipos}>
                  {categorias.map(el => (
                    <li style={{ color: '#373737' }} className={styles.liCategory} onClick={() => router.push(`/servicios-automotriz/${el.url}-Bogota,%20Colombia`)} key={el.nombre}>
                      <img src={router.pathname === '/' ? `./${el.img}.png` : `../../${el.img}.png`} style={{ height: '20px', width: '20px' }} />
                      {categoriaRouter === el.nombre || (router?.pathname === '/' && el.nombre === 'Alineación y balanceo') ?
                        <p className={styles.textCategoriaTallerA}>{el.nombre}</p>
                        :
                        <p className={styles.textCategoriaTaller}>{el.nombre}</p>
                      }
                    </li>
                  ))}

                </ul>
              </div>
            </div>


            <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/glosario-de-autopartes' ? '#373737' : '#373737' }} className={styles.subtitle} href={'/glosario-de-autopartes'}>Glosario</Link></li>
            {/* <button>Tienes un taller?</button> */}

          </ul>
        </div>

      </div>
      <FirstNewScreen/>
    </header>

  )
}