

import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Select from 'react-select'
import { customStyles, optionsCombustibles } from './ModalCalcularAhorro'
import { useState } from 'react'
import Input from '../Input/Input'
import Button, { ButtonVariant } from '../Button/Button'
import { CREATE_REPORT_PRICE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

let initialForm = {
  nombre: '',
  precio: '',
  email: '',
  gasolinera: '',
  combustible: ''
}
export default function ModalCrearReportePrecio({ priceUno, priceDos, setVisibleModalReportePrecio, }) {
  const [combustible, setCombustible] = useState({ nombre: 'Corriente', index: 1 })
  const [price, setPrice] = useState(combustible.nombre === 'Corriente' ? priceUno : priceDos)
  const [form, setForm] = useState(initialForm)
  const [page, setPage] = useState(0)
  const [error, setError] = useState('')
  const [createReportPrecio, data] = useMutation(CREATE_REPORT_PRICE)

  const handleChangeCombustible = (e) => {
    setCombustible({ nombre: e.value, index: e.index })
    setPrice(e.value === 'Corriente' ? priceUno : priceDos)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (page=== 1) {
     return createReportPrecio({ variables:  form  })
    }
    if (price === priceUno || price === priceDos) {
      setError('Debes agregar o cambiar el precio')
    } else {
      setForm({ ...form, combustible: combustible.nombre, precio: price, gasolinera: 're' })
      setPage(1)
      setError('')
    }
  }
  return (
    <div onClick={() => setVisibleModal(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Icon onClick={() => page === 1 ? setPage(0) : setVisibleModalReportePrecio(false)} name={IconCatalog.chevronBackOutline} />
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>Reportar cambios</p>
        </div>

        {page === 0
          ?
          <div style={{ margin: '32px 0 64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
            <Select isSearchable={false} onChange={(e) => handleChangeCombustible(e)} options={optionsCombustibles} styles={customStyles} placeholder={combustible.nombre} value={combustible.nombre} />
            <Input error={error} style={{ marginTop: '32px' }} stylesInput={{ maxWidth: '200px', width: 'fit-content', textAlign: 'center', fontSize: '48px', margin: '0 auto', }} type={'number'} value={price} onChange={(e) => setPrice(e.target.value)} />
            <p style={{ fontSize: '14px', margin: '16px auto auto auto', marginTop: '16px', textAlign: 'center' }}>Coloca el precio actual y compartelo para ayudar a mas personas</p>

          </div>
          :
          <div style={{ margin: '32px 0 64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
            <p style={{ fontSize: '14px', margin: '16px auto auto auto', marginTop: '16px', textAlign: 'center' }}>Antes de compartir tu reporte coloca tu nombre para que la comunidad te reconozca!</p>
            <Input style={{ marginTop: '16px' }} type={'text'} placeholder={'Ej: Andres López'} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />

          </div>
        }
        <Button disable={price === priceUno || price === priceDos} onClick={handleSubmit} variant={ButtonVariant.secondary} fullWidth>
          {page === 0 ? 'Crear reporte' : 'Guardar reporte'}
        </Button>
      </div>

    </div>
  )

}