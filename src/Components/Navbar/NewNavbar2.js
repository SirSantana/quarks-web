

import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Select from 'react-select'
// import { customStyles, options2 } from '../Main/Main'
import styles2 from '@/styles/Landing.module.css'
import FirstNewScreen from '../LandingPage/FirstNewScreen';
import SliderTiposTalleres from '../LandingPage/SliderTiposTalleres';
import CategoriasSlider from '../LandingPage/CategoriasSlider';
import talleres from '@/pages/servicios-automotriz/talleres.json'
import CreatableSelect from 'react-select/creatable';
import Image from 'next/image';

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
const initialForm = {
  servicio: 'Taller mecanico',
  localidad: 'Bogota, Colombia'
}
const talleresWithOptions = talleres.talleres.map((taller) => {
  return ({
    value: taller.nombre,
    label: (
      <div style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', }}>
          {/* <img src={pastilla['img-posterior']} alt={pastilla.titulo} className={styles2.optionImage} /> */}
          <p style={{ fontSize: '14px',color:'black', fontWeight: '600' }}>{taller.nombre}</p>
          <p style={{ fontSize: '12px', fontWeight: '500' }}>{taller?.direccion} <span style={{fontWeight:'600'}}>{taller?.localidad}</span></p>
          {/* <div style={{width:'100%', display:'flex',marginTop:'4px', flexDirection:'row', flexWrap:'wrap', alignItems:'center'}}>
            {taller.categorias.map(servicio => (
              <p style={{ fontSize: '12px', fontWeight: '400' }}>{` ${servicio} · `}</p>
            ))}
          </div> */}
          

        </div>
      </div>
    ),
    index: taller.userName,
  })
});
const imageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}
export default function NewNavbarWithSearch({ mode }) {
  const router = useRouter()
  const ref = useRef(null)
  const [form, setForm] = useState(initialForm)

  const categoriaRouter = router?.query?.id?.split("-")[0]

  const handleSubmit = (e) => {
    e.preventDefault()

    // router.push(`/servicios-automotriz/${form.servicio}-${form.localidad}`)
    router.push(`/catalogo-pastas-freno?busqueda=${form.servicio}`)
  }
  const handleChange = (e) => {
    setForm({ ...form, pastilla: e.value, id: e.index })
    if (e.index) {
      router.push(`/${e.index}`)
    } else {
      router.push(`/servicios-automotriz?busqueda=${e.value}`)
    }
  }
  const sendMessage = (problema) => {
    let url = `https://api.whatsapp.com/send?phone=57${3202754087}`;

    window.open(url);
  }
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', }} >
      <div ref={ref} className={styles.header}>
        <div className={styles.navDiv}>
          <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
            <Image onLoad={imageLoader} alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} width={32} height={32} />
            <h4 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.titleNav}>Quarks Talleres</h4>
          </Link>
          <form onSubmit={handleSubmit} className={styles2.homeCard}>
            {/* <input onChange={(e) => setForm({ ...form, servicio: e.target.value })} className={styles.input} type="search" id="search" placeholder={'Buscar...'} /> */}
            <div style={{ width: '100%', maxWidth: '100%' }}>
              <CreatableSelect onChange={handleChange} options={talleresWithOptions} styles={customStyles} placeholder='Buscar taller' noOptionsMessage={() => 'No se encontro ningun repuesto'} isSearchable isClearable />
            </div>
            {/* <div className={styles.separatorSearch} />
            <div className={styles2.select2}>

              <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
            </div> */}
            <div onClick={handleSubmit} style={{ cursor: 'pointer' }} className={styles2.buttonSearch}>
              <ion-icon style={{ color: 'white', fontSize: '20px' }} name="search-outline"></ion-icon>
            </div>
          </form>
          <nav className={styles.navv}>
            {/* <div className={styles.talleres}>
              <p style={{ listStyle: 'none', cursor: 'pointer', textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' ? '#373737' : '#373737' }} className={styles.subtitle}>Talleres mecanicos</p>
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
            </div> */}
            <Link style={{ textDecoration: 'none', color: router?.pathname === '/acceso' ? '#373737' : '#464646' }} className={styles.subtitle} href={'/acceso'}>Tienes un Taller?</Link>
          </nav>
        </div>
        <section className={styles.sectionSliderShowNav}>
          <CategoriasSlider categorias={categorias} mode={mode} />
        </section>

      </div>

      <FirstNewScreen mode={mode} />

      {/* <button onClick={sendMessage}>What</button> */}
    </header>

  )
}