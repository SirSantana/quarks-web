import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect, useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'
import Select from 'react-select'
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import Input from '../Input/Input';
import PriceFormat from '@/utils/priceFormat';
export const optionsCombustibles = [
  { value: 'Corriente', label: 'Gasolina Corriente', index: 1 },
  { value: 'Extra', label: 'Gasolina Extra', index: 2 },
]
export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #d9d9d9', // Quitar el borde
    boxShadow: 'none',
    fontSize: '14px',
    width: '160px',
    height: '32px',
    ':hover': {
      borderColor: '#373737', // Cambiar el color de fondo cuando se realiza un hover
    },
    cursor: 'pointer'
  }),
  menu: (provided) => ({
    ...provided,
    width: '160px',  // Ajusta este valor según tus necesidades
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'flex', // Ocultar el icono de flecha
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
    zIndex: '999',
    display: 'flex', // Hacer que el contenedor sea un flexbox
  }),
};
export default function ModalCalcularAhorro({ data, setVisibleModal, precioAlto, precioAltoExtra }) {
  const [galonesBase, setGalonesBase] = useState(12)
  const [combustible, setCombustible] = useState({ nombre: 'Corriente', index: 1 })
  const [descuento, setDescuento] = useState((precioAlto.price - data?.price) * galonesBase)

  let priceCombustible = combustible.index === 1 ? data?.price.toString() : combustible.index == 2? data?.priceDos?.toString():data?.priceTres?.toString()
  let priceMasAlto = combustible.index === 1 ? precioAlto?.price.toString() : precioAltoExtra?.priceDos?.toString()

  const handleChange = (value) => {
    setGalonesBase(value)
    setDescuento((precioAlto.price - priceCombustible) * galonesBase)
  }
  const handleChangeCombustible = (e) => {
    setCombustible({ nombre: e.value, index: e.index })
  }

  useEffect(() => {
    setDescuento((priceMasAlto - priceCombustible) * galonesBase)

  }, [galonesBase, priceMasAlto])
  return (
    <div onClick={() => setVisibleModal(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Icon onClick={() => setVisibleModal(false)} name={IconCatalog.chevronBackOutline} />
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>Calcula tu ahorro</p>
        </div>

        <div style={{ margin: '64px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0 auto', fontSize: '48px', fontWeight: '700' }}>${priceCombustible?PriceFormat({ price: descuento.toString() }):0}</p>
          <p style={{ fontSize: '14px', margin: '16px auto auto auto', marginTop: '16px', }}>En comparacion estacion mas costosa</p>
        </div>

        <div style={{ margin: '32px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems:'flex-end' }}>

          <Select isSearchable={false} onChange={(e) => handleChangeCombustible(e)} options={optionsCombustibles} styles={customStyles} placeholder={combustible ? combustible.nombre : 'Selecciona la localidad'} value={combustible.nombre} />

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop:'16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
              <Input style={{ width: '75px' }} type={'number'} value={galonesBase} onChange={(e) => handleChange(e.target.value)} max={100} />
              {/* <input step="1" style={{ border: 'none', width: '100px' }} type="number"  value={galonesBase} /> */}
              <label style={{ fontSize: '14px', marginLeft: '8px' }} >/Gl</label>
            </div>
            <Slider
              min={0}
              max={50}
              defaultValue={galonesBase}
              onChange={(value) => handleChange(value)}
              value={galonesBase}
              trackStyle={[{ backgroundColor: '#f50057', height: '8px' }]}
              handleStyle={[
                { backgroundColor: '#f50057', height: '18px', width: '18px' },
              ]}
            />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '14px' }}>0 gl</p>
              <p style={{ fontSize: '14px' }}>50 gl</p>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}