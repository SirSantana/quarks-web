import styles from '@/styles/Almacenes.module.css'
import { useState } from 'react'
import ModalCategorias from './ModalCategorias'


const marcas = ['Mazda', 'Chevrolet', 'Renault', 'Ford']
const subCategorias = {
  Accesorios: ['Accesorios', 'Alarma', 'Pito', 'Plumillas', 'Parasoles', 'Antena', 'Tapizados', 'Emblemas', 'Tapetes'],
  Baterias: ['Baterias'],
  Clutch: ['Balinera', 'Prensa', 'Kit Clutch', 'Balibomba', 'Guaya', 'Discos', 'Horquilla'],
  "Caja y Transmision": ['Bronces', 'Trenfijo', 'Reten', 'Guaya cambios', 'Corona', 'Palanca cambios',],
  Carroceria: ['Vidrio', 'Capot', 'Boceles', 'Espejos', 'Manijas', 'Bomper', 'Frontales', 'Puertas', 'Guardafango'],
  Correas: ['Distribucion', 'Alternador', 'Aire acondicionado'],
  "Direccion y suspension": ['Amortiguadores', 'Bocines', 'Axiales', 'Rotulas', 'Terminales', 'Espirales', 'Rodamientos', 'Tijeras', 'Ejes', 'Puntas de eje', 'Muñecos', '+2'],
  Electricos: ['Sensores', 'Bobinas', 'Computadores', 'Switch', 'Cables alta', 'Bujias', 'Motores'],
  Filtros: ['Aceite', 'Motor', 'Aire', 'Gasolina'],
  Lubricantes: ['Aceites'],
  Frenado: ['Bomba de freno', 'Mordazas', 'Campanas', 'Pastas', 'Discos', 'Manguera', 'Cilindro', 'Bandas', 'Palanca'],
  Iluminacion: ['Farolas', 'Bombillos', 'Stop', 'Direccional', 'Exploradoras'],
  Motor: ['Anillos', 'Pistones y bielas', 'Balancines', 'Casquetes', 'B. Aceite', 'Piñones', 'Carter', 'Valvulas', 'Kit distribucion', 'Inyectores', 'Soportes', '+5'],
  Refrigeracion: ['B. Agua', 'Ventilador', 'Refrigerador', 'Radiador', 'Termostato', 'Depositos', 'Compresor', '+3']
}
const initialForm = {
  marca: 'Chevrolet',
  categoria: 'Todos'
}
export default function BuscadorAlmacenes({setFormBusqueda}) {
  const [marca, setMarca] = useState('Chevrolet')
  const [visibleMarca, setVisibleMarca] = useState(false)
  const [categoria, setCategoria] = useState('Todos')
  const [visibleCategorias, setVisibleCategorias] = useState(false)
  const [form, setForm] = useState(initialForm)
  const handleSubmit = (e)=>{
    e.preventDefault()
    setFormBusqueda(form)
  }
  return (
    <>
      <div className={styles.containerFirst}>
        <form onSubmit={handleSubmit} className={styles.homeCard}>
          <div className={styles.containerInput}>
          <div onClick={() => setVisibleMarca(true)} className={styles.locationDivMarca} >
            <label htmlFor='marca' className={styles.label}>Marca</label>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }}>
              <img src={`./${marca}.png`} style={{ height: '40px', width: '40px', marginRight:'8px' }} />
              <img src='/arrowDown.svg' style={{ height: '20px', width: '20px' }} />
            </div>
          </div>

          <div onClick={() => setVisibleCategorias(true)} className={styles.locationDivRepuestos}>
            <label htmlFor='referencia' className={styles.label} >Categoria Repuestos</label>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', marginTop: '4px' }}>
              <label htmlFor='marca' className={styles.subtitle}>{categoria}</label>
              <img src='/arrowDown.svg' style={{ height: '20px', width: '20px', marginLeft:'8px' }} />
            </div>
          </div>
          </div>


          <input type={'submit'} className={styles.button} value='Buscar' />


        </form>
        {form?.categoria !== 'Todos' &&
          <div className={styles.cardCategorias}>
            {subCategorias[categoria]?.map(el => (
              <h3 className={styles.subtitle2}>{el} · </h3>
            ))}
          </div>}
          
      </div>
      {visibleMarca &&
        <div onClick={() => setVisibleMarca(visibleMarca ? false : true)} className={styles.modal}>
          <div className={styles.modalContent}>
            {marcas.map(el => (<img key={el} onClick={() => { setMarca(el), setForm({ ...form, marca: el }) }} style={{ height: '40px', width: '40px', cursor: 'pointer' }} src={`./${el}.png`} />))}
          </div>
        </div>
      }
      {visibleCategorias &&
        <div onClick={() => setVisibleCategorias(visibleCategorias ? false : true)} className={styles.modal}>
          <div className={styles.modalCategorias} >
            <ModalCategorias categoria={categoria} setCategoria={setCategoria} form={form} setForm={setForm}/>
          </div>
        </div>
      }
    </>
  )
}