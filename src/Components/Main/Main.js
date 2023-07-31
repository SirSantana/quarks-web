import styles from '@/styles/Main.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Select from 'react-select'

export const options = [
  { value: 'Cambio de aceite', label: 'Cambio de aceite', index: 0 },
  { value: 'Sincronizacion', label: 'Sincronizacion', index: 1 },
  { value: 'Alineación y balanceo', label: 'Alineación y balanceo', index: 2 },
  { value: 'Peritaje', label: 'Peritaje', index: 3 },
  { value: 'Diagnostico automotriz', label: 'Diagnostico automotriz', index: 4 },
  { value: 'Tecnico mecanica', label: 'Tecnico mecanica', index: 5 },
  { value: 'Servicio de Frenos', label: 'Servicio de Frenos', index: 6 },
  { value: 'Servicio de Aire acondicionado', label: 'Servicio de Aire acondicionado', index: 7 },
  { value: 'Servicio de Clutch', label: 'Servicio de Clutch', index: 8 },
  { value: 'Servicio de Suspensión', label: 'Servicio de Suspensión', index: 9 },
  { value: 'Servicio de Motor', label: 'Servicio de Motor', index: 10 },
  { value: 'Servicio de Eléctricos', label: 'Servicio de Eléctricos', index: 11 },
  { value: 'Servicio de Electronica', label: 'Servicio de Electronica', index: 12 },
  { value: 'Servicio de Inyeccion', label: 'Servicio de Inyeccion', index: 13 },
  { value: 'Servicio de Latonería y pintura', label: 'Servicio de Latonería y pintura', index: 14 },
  { value: 'Servicio de Baterias', label: 'Servicio de Baterias', index: 15 },
  { value: 'Servicio de Llantas', label: 'Servicio de Llantas', index: 16 },
  { value: 'Servicio de Cajas', label: 'Servicio de Cajas', index: 17 },
  { value: 'Servicio de Clutch', label: 'Servicio de Clutch', index: 18 },
  { value: 'Servicio de Lujos', label: 'Servicio de Lujos', index: 19 },
  { value: 'Revisión general', label: 'Revisión general', index: 20 },
  { value: 'Mecanica Basica', label: 'Mecanica Basica', index: 21 },
  { value: 'Mecanica Avanzada', label: 'Mecanica Avanzada', index: 22 },
  { value: 'Taller mecanico', label: 'Taller mecanico', index: 23 },
  { value: 'Mecanico a Domicilio', label: 'Mecanico a Domicilio', index: 24 },

  

]
export const options2 = [
  { value: 'Bogota, Colombia', label: 'Bogota, Colombia', index: 0 },
  { value: 'Barrios Unidos. Bogota, Colombia', label: 'Barrios Unidos', index: 1 },
  { value: 'Bosa. Bogota, Colombia', label: 'Bosa', index: 2 },
  { value: 'CiudadBolivar. Bogota, Colombia', label: 'CiudadBolivar', index: 3 },
  { value: 'Engativa. Bogota, Colombia', label: 'Engativa', index: 4 },
  { value: 'Fontibon. Bogota, Colombia', label: 'Fontibon', index: 5 },
  { value: 'Kennedy. Bogota, Colombia', label: 'Kennedy', index: 6 },
  { value: 'Martires. Bogota, Colombia', label: 'Martires', index: 7 },
  { value: 'PuenteAranda. Bogota, Colombia', label: 'PuenteAranda', index: 8 },
  { value: 'Suba. Bogota, Colombia', label: 'Suba', index: 9 },
  { value: 'Teusaquillo. Bogota, Colombia', label: 'Teusaquillo', index: 10 },
  { value: 'Tunjuelito. Bogota, Colombia', label: 'Tunjuelito', index: 11 },
  { value: 'Usaquen. Bogota, Colombia', label: 'Usaquen', index: 12 },
  { value: 'Usme. Bogota, Colombia', label: 'Usme', index: 13 },
  { value: 'Santafe. Bogota, Colombia', label: 'Santafe', index: 14 },
]
export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f50057' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#ffefef', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    zIndex:'999'
  }),
};

const initialForm = {
  servicio: 'Cambio de aceite',
  localidad: 'Bogota, Colombia'
}
export default function Main() {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const handleSubmit = (e) => {
    e.preventDefault()

    router.push(`/servicios-automotriz/${form.servicio}-${form.localidad}`)
  }
  return (
    <div className={styles.divContainer}>

      <section className={styles.home} >
        <div className={styles.homeText} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%' }}>
          <h1 className={styles.title}>
            Encuentra los mejores talleres mecanicos de Bogotá
          </h1>
          {/* <img src='./Croquis2.png' style={{width:'30%', height:'250px'}}/> */}
        </div>

        <form onSubmit={handleSubmit} className={styles.homeCard}>
          <div className={styles.select1}>
            <Select onChange={(e) => setForm({ ...form, servicio: e.value })} options={options} styles={customStyles}  placeholder={'Selecciona un servicio'} />
          </div>
          <div className={styles.separador} />
          <div className={styles.select2}>
            <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
          </div>

          <input type='submit' className={styles.buttonPrimary} value={'Buscar'} />
        </form>
      </section>
      <div className={styles.containerIcons}>
        <Link style={{ textDecoration: 'none', outline: 'none', color: '#373737' }} href={`/servicios-automotriz/Cambio de aceite-Bogota, Colombia`} className={styles.cardIcon}>
          <img src={'../Filtros.png'} className={styles.icon}/>
          <p className={styles.textCategory}>Cambio de Aceite</p>
        </Link>
        <div className={styles.separador1} />


        <Link style={{ textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.cardIcon} href={`/servicios-automotriz/Servicio de Baterias-Bogota, Colombia`}>
          <img src={'../Baterias.png'}className={styles.icon} />
          <p className={styles.textCategory}>Cambio de Baterias</p>
        </Link>
        <div  className={styles.separador1} />

        <Link style={{ textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.cardIcon} href={`/servicios-automotriz/Servicio de Latonería y pintura-Bogota, Colombia`}>
          <img src={'../Carroceria.png'}  className={styles.icon}/>
          <p className={styles.textCategory}>Latoneria y pintura</p>
        </Link>

        <div  className={styles.separador1} />

        <Link style={{ textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.cardIcon} href={`/servicios-automotriz/Servicio de Frenos-Bogota, Colombia`}>
          <img src={'../Frenado.png'} className={styles.icon} />
          <p className={styles.textCategory}>Servicio de Frenos</p>
        </Link>

        <div  className={styles.separador1} />

        <Link style={{ textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.cardIcon} href={`/servicios-automotriz/Mecanica Basica-Bogota, Colombia`}>
          <ion-icon  class={styles.icon}name="add-outline"></ion-icon>
          <p className={styles.textCategory}>+ 20 Servicios</p>
        </Link>


      </div>


    </div>



  )
}