

import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Select from 'react-select'
import { customStyles, optionsCombustibles } from './ModalCalcularAhorro'
import { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Button, { ButtonVariant } from '../Button/Button'
import { CREATE_REPORT_PRICE } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'
import { GET_REPORTS_PRICE } from '@/graphql/queries'

let initialForm = {
  nombre: '',
  precio: '',
  email: '',
  gasolinera: '',
  combustible: ''
}
export default function ModalCrearReportePrecio({ priceUno, priceDos, gasolinera, setVisibleModalReportePrecio, }) {
  const [combustible, setCombustible] = useState({ nombre: 'Corriente', index: 1 })
  const [price, setPrice] = useState(combustible.nombre === 'Corriente' ? priceUno : priceDos)
  const [form, setForm] = useState(initialForm)
  const [page, setPage] = useState(0)
  const [error, setError] = useState('')
  const [createReportPrecio, { loading, data, error: errorMutation }] = useMutation(CREATE_REPORT_PRICE, {
    onCompleted: () => {
      setTimeout(() => {
        setVisibleModalReportePrecio(false);
      }, 4000);
    }, refetchQueries: [{ query: GET_REPORTS_PRICE, variables: { gasolinera } }]
  })
  const handleChangeCombustible = (e) => {
    setCombustible({ nombre: e.value, index: e.index })
    setPrice(e.value === 'Corriente' ? priceUno : priceDos)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (page === 1 && form.nombre.length > 2) {
      setError('')
      return createReportPrecio({ variables: form })
    }
    if ((price === priceUno || price === priceDos) || !form.nombre.length > 2) {
      setError(page === 0 ? 'Debes agregar o cambiar el precio' : 'Debes colocar un nombre')
    } else {
      setForm({ ...form, combustible: combustible.nombre, precio: price, gasolinera: gasolinera })
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
            <Input error={error} style={{ marginTop: '16px' }} type={'text'} placeholder={'Ej: Andres López'} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} maxLength={20} />

          </div>
        }
        <Button disable={price === priceUno || price === priceDos} onClick={handleSubmit} variant={ButtonVariant.secondary} fullWidth>
          {page === 0 ? 'Crear reporte' : 'Guardar reporte'}
        </Button>
      </div>

      {data &&
        <ModalSuccessfull title={`Gracias ${form.nombre}`} subtitle={'La comunidad agradece tu apoyo para mantenernos informados'} />
      }
      {loading &&
        <ModalLoading title={'Enviando Reporte... '} />
      }
      {errorMutation &&
        <ModalError title={'Ha ocurrido un error, reintentalo mas tarde'} subtitle={error?.message} />
      }
    </div>
  )

}