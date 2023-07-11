import styles from '@/styles/Main.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Select from 'react-select'

export const options = [
  { value: 'Taller mecanico', label: 'Taller mecanico', index: 0 },
  { value: 'Revisión general', label: 'Revisión general', index: 1 },
  { value: 'Mecanica Basica', label: 'Mecanica Basica', index: 2 },
  { value: 'Mecanica Avanzada', label: 'Mecanica Avanzada', index: 3 },
  { value: 'Cambio de aceite', label: 'Cambio de aceite', index: 4 },
  { value: 'Sincronizacion', label: 'Sincronizacion', index: 5 },
  { value: 'Alineación y balanceo', label: 'Alineación y balanceo', index: 6 },
  { value: 'Peritaje', label: 'Peritaje', index: 7 },
  { value: 'Diagnostico automotriz', label: 'Diagnostico automotriz', index: 8 },
  { value: 'Tecnico-mecanica', label: 'Tecnico-mecanica', index: 9 },
  { value: 'Servicio de Frenos', label: 'Servicio de Frenos', index: 10 },
  { value: 'Servicio de Aire acondicionado', label: 'Servicio de Aire acondicionado', index: 11 },
  { value: 'Servicio de Clutch', label: 'Servicio de Clutch', index: 12 },
  { value: 'Servicio de Suspensión', label: 'Servicio de Suspensión', index: 13 },
  { value: 'Servicio de Motor', label: 'Servicio de Motor', index: 14 },
  { value: 'Servicio de Eléctricos', label: 'Servicio de Eléctricos', index: 15 },
  { value: 'Servicio de Electronica', label: 'Servicio de Electronica', index: 16 },
  { value: 'Servicio de Inyeccion', label: 'Servicio de Inyeccion', index: 17 },
  { value: 'Servicio de Latonería y pintura', label: 'Servicio de Latonería y pintura', index: 18 },
  { value: 'Servicio de Baterias', label: 'Servicio de Baterias', index: 19 },
  { value: 'Servicio de Llantas', label: 'Servicio de Llantas', index: 20 },
  { value: 'Servicio de Cajas', label: 'Servicio de Cajas', index: 21 },
  { value: 'Servicio de Clutch', label: 'Servicio de Clutch', index: 22 },


]
export const options2 = [
  { value: 'Bogota, Colombia', label: 'Bogota, Colombia', index: 0 },
  { value: 'Engativa. Bogota, Colombia', label: 'Engativa', index: 1 },
  { value: 'Suba. Bogota, Colombia', label: 'Suba', index: 2 },
  { value: 'Barrios Unidos. Bogota, Colombia', label: 'Barrios Unidos ', index: 3 },
  { value: 'Usaquen. Bogota, Colombia', label: 'Usaquen', index: 4 },
  { value: 'Teusaquillo. Bogota, Colombia', label: 'Teusaquillo', index: 5 },
  { value: 'Santafe. Bogota, Colombia', label: 'Santafe', index: 6 },

]
const customStyles = {
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
  }),
};

const initialForm = {
  servicio: 'Taller mecanico',
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
            Encuentra el lugar ideal para tu auto
          </h1>
          {/* <img src='./Croquis2.png' style={{width:'30%', height:'250px'}}/> */}
        </div>

        <form onSubmit={handleSubmit} className={styles.homeCard}>
          <div className={styles.select1}>
            <Select onChange={(e) => setForm({ ...form, servicio: e.value })} options={options} styles={customStyles} defaultValue={options[0]} />
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