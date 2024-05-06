import { useEffect, useState } from "react";
import styles from '@/styles/Main.module.css'
import Input from "../Input/Input";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import Image from "next/image";
import PriceFormat from "@/utils/priceFormat";
import Button, { ButtonSize, ButtonVariant } from "../Button/Button";
import { IconCatalog } from "../Icon/Icon";
import Select from 'react-select'

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
    cursor:'pointer'
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

export function ModalGasolineraCard({ data, setVisibleModal, precioAlto, precioAltoExtra }) {
  const [galonesBase, setGalonesBase] = useState(12)
  const [descuento, setDescuento] = useState((precioAlto.price - data?.price) * galonesBase)
  const [combustible, setCombustible] = useState({nombre:'Corriente', index:1})
  let priceCombustible = combustible.index === 1 ? data?.price.toString() : combustible.index == 2? data?.priceDos?.toString():data?.priceTres?.toString()
  let priceMasAlto = combustible.index === 1 ? precioAlto?.price.toString() : precioAltoExtra?.priceDos?.toString()


  const handleChange = (value) => {
    setGalonesBase(value)
    setDescuento((precioAlto.price - priceCombustible) * galonesBase)
  }
  const handleChangeCombustible =(e)=>{
    setCombustible({nombre:e.value, index:e.index})
  }
  useEffect(() => {
    setDescuento((priceMasAlto - priceCombustible) * galonesBase)

  }, [galonesBase, priceMasAlto])


  return (
    <div onClick={() => setVisibleModal(false)} className={styles.modal}>
      <div style={{ gap: '16px', borderRadius: '8px', padding: '24px', width: '90%', maxWidth: '700px' }} className={styles.modalContent} >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h3>{data?.nombre}</h3>
            <p style={{ fontSize: '14px' }}>{data.direccion}. <span style={{fontWeight:'500'}}>{data?.ciudad}</span></p>
          </div>
          <Image
            width={48}
            height={48}
            src={`/${data.img}.png`}
            alt={`Gasolinera ${data.empresa} ubicado en ${data.direccion}`}
          />
        </div>

        <div onClick={(e) => e.stopPropagation()}>
        <Select isSearchable={false} onChange={(e)=>handleChangeCombustible(e)} options={optionsCombustibles} styles={customStyles} placeholder={combustible ? combustible.nombre : 'Selecciona la localidad'} value={combustible.nombre} />

          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5%', marginTop: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Precio esta estacion</p>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '14px' }}>1gl</p>
                <div style={{ width: '100%', flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                <p style={{ fontSize: '14px', fontWeight: '600' }}>{priceCombustible?PriceFormat({ price: priceCombustible }):'Precio desconocido'}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Precio estacion mas costosa</p>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '14px' }}>1gl</p>
                <div style={{ width: '100%', flex: 1, height: '1px', backgroundColor: '#d9d9d9' }} />
                <p style={{ fontSize: '14px', fontWeight: '600' }}>${PriceFormat({ price: priceMasAlto })}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', width: '100%', marginTop: '32px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '50%' }}>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Calcula tu Ahorro</p>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
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
          <div style={{ width: '100%', flex: 1, height: '1px', backgroundColor: '#d9d9d9', margin: '32px 0' }} />


          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* <Button size={ButtonSize.sm} variant={ButtonVariant.gray} icon={IconCatalog.arrowForwardOutline} iconColor='#7D7D7D' sizeIcon='sm' style={{ width: 'fit-content', margin: 0 }}>
              Abrir en Maps
            </Button> */}
            <div style={{width:'100%', display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Ahorro Total</p>
              <p style={{ padding: '8px 12px', fontSize: '20px', backgroundColor: '#D3FFD7', borderRadius: '8px', color: '#2D6600', fontWeight: '700' }}>{priceCombustible?PriceFormat({ price: descuento.toString() }):0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
