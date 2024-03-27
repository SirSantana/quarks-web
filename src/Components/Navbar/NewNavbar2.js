

import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles2 from '@/styles/Landing.module.css'
import FirstNewScreen from '../LandingPage/FirstNewScreen';
import CategoriasSlider from '../LandingPage/CategoriasSlider';
import talleres from '@/pages/servicios-automotriz/talleres.json'
import CreatableSelect from 'react-select/creatable';
import Image from 'next/image';
import FormSearchTaller from '../LandingPage/FormSearchTaller';

export const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos' },
  { nombre: 'Aire acondicionado', img: 'servicio-aire-acondicionado', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje' },
  { nombre: 'Sincronización', img: 'mecanica-basica', url: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'mecanica-avanzada', url: 'Tecnico mecanica' },
];
export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    fontSize: '14px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none', // Ocultar el icono de flecha
  }),
  indicatorSeparator: () => ({
    display: 'none', // Ocultar la línea horizontal
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f1f1f1' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#f1f1f1', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    fontSize: '14px',
    color: '#5c5c5c',
    zIndex: '999'
  }),
};


export default function NewNavbarWithSearch({ mode, visibleSlider = false }) {
  const router = useRouter()
  const ref = useRef(null)

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', }} >
      <div ref={ref} className={styles.header}>
        <div className={styles.navDiv}>
          <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
            <Image loading='lazy' alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} width={32} height={32} />
            <h4 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.titleNav}>Quarks</h4>
          </Link>
          <FormSearchTaller />
          <nav className={styles.navv}>
            <Link style={{ textDecoration: 'none', color: router?.pathname === '/acceso' ? '#373737' : '#464646' }} className={styles.subtitle} href={'/acceso'}>Tienes un Taller?</Link>
          </nav>
        </div>
        {visibleSlider && <nav className={styles.sectionSliderShowNav}>
          <CategoriasSlider categorias={categorias} mode={mode} />
        </nav>}
      </div>
      {visibleSlider && <FirstNewScreen mode={mode} />}
    </header>

  )
}