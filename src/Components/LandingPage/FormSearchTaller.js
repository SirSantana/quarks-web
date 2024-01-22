

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles2 from '@/styles/Landing.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import CreatableSelect from 'react-select/creatable';
import { customStyles } from '../Navbar/NewNavbar2';


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
export default function FormSearchTaller({width, height}) {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)

  const handleSubmit = (e) => {
    e.preventDefault()
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
  return (
    <form onSubmit={handleSubmit} className={styles2.homeCard} style={{margin:'0 auto', width:width?width:null, height:height?height:null,}}>
      <div style={{ width: '100%', maxWidth: '100%' }}>
        <CreatableSelect aria-label='Search' onChange={handleChange} options={talleresWithOptions} styles={customStyles} placeholder='Buscar taller' noOptionsMessage={() => 'No se encontro ningun repuesto'} isSearchable isClearable />
      </div>
      <div onClick={handleSubmit} style={{ cursor: 'pointer' }} className={styles2.buttonSearch}>
        <ion-icon style={{ color: 'white', fontSize: '20px' }} name="search-outline"></ion-icon>
      </div>
    </form>
  )
}