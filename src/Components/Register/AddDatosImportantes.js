import { EDIT_NEGOCIO_VDOS } from '@/graphql/mutations'
import styles from '@/styles/Faq.module.css'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import AddHorario from './AddHorario'
import Icon, { IconCatalog } from '../Icon/Icon'
import AddFotoPerfil from './AddFotoPerfil'
import { GET_NEGOCIOVDOS_ONE } from '@/graphql/queries'
import SelectIndicativo from './SelectIndicativo'
import dynamic from 'next/dynamic'
import Button, { ButtonVariant } from '../Button/Button'
import Input from '../Input/Input'

const MapDireccion = dynamic(
  () => import('./MapDireccion'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)
const MapCobertura = dynamic(
  () => import('./MapCobertura'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)
export default function AddDatosImportantes({ setPage, setDataImportante, dataImportante, setForm, form, router }) {
  const [editNegocioVDos, { loading, data, error }] = useMutation(EDIT_NEGOCIO_VDOS, { refetchQueries: [{ query: GET_NEGOCIOVDOS_ONE }] })
  const [errorInput, setErrorInput] = useState(false)


  const handleChange = (e) => {
    setDataImportante({ ...dataImportante, [e?.target?.name]: e?.target?.value })
    if (e.target.name === 'telefono') {
      setDataImportante({ ...dataImportante, whatsapp: e?.target?.value, telefono: e?.target?.value, })
    }
    setErrorInput(false)
  }
  const handleChangeIndicativo = (e) => {
    setDataImportante({ ...dataImportante, [e?.target?.name ? e.target.name : e.index]: e?.target?.value ? e?.target?.value : e?.value })
    setErrorInput(false)
  }

  let disabled = dataImportante.ciudad?.length <= 0 || dataImportante?.pais?.length <= 0 || dataImportante?.direccion?.length <= 0 || dataImportante?.telefono?.length <= 0 || dataImportante.coordenadas?.length <= 1 || dataImportante.fotoperfil.length <= 0
  const handleSubmit = (e) => {
    e.preventDefault()
    if (disabled) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return setErrorInput(true)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPage(4)
    router.push(`/signup?page=4`)
    setForm({ ...form, pageCheck: 4 })
    let dataRegistroString = JSON.stringify(dataImportante);
    localStorage.setItem('dataRegistro', dataRegistroString);
  }
  useEffect(() => {
    if (data) {
      router.push(data?.editNegocioVDos.userName)
    }
  }, [data])
  return (
    <div style={{ margin: '32px 0 64px 0', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box', maxWidth: '600px', width: '100%' }}>

      <h2 className={styles.titleAccess}>Ya casi finalizamos!</h2>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', margin: '32px 0 16px 0' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.readerOutline} size='md' />
        </div>
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Datos Basicos</p>
      </div>
      <AddFotoPerfil setDataImportante={setDataImportante} dataImportante={dataImportante} fotoRegister={true} error={errorInput && !dataImportante.fotoperfil} />

      <div className={styles.containerInputsRegister}>
        <SelectIndicativo handleChange={handleChangeIndicativo} name={'indicativo'} value={dataImportante.indicativo} setDataImportante={setDataImportante} dataImportante={dataImportante} />
        <Input type={'number'} name={'telefono'} placeholder={'Tú movil'} onChange={handleChange} value={dataImportante.telefono} error={errorInput && dataImportante.telefono?.length <= 0 && 'Es requerido'} required inputMode={'numeric'} />
      </div>

      <div className={styles.containerInputsRegister} >
        <Input type={'text'} name={'ciudad'} placeholder={'Agregar ciudad'} onChange={handleChange} value={dataImportante.ciudad} error={errorInput && dataImportante.ciudad?.length <= 0 && 'Es requerido'} required />
        <SelectIndicativo handleChange={handleChangeIndicativo} name={'pais'} value={dataImportante.pais} setDataImportante={setDataImportante} dataImportante={dataImportante} />

        {/* <Input type={'text'} name={'pais'} placeholder={'Agregar pais'} onChange={handleChange} value={dataImportante.pais} error={errorInput && dataImportante.pais?.length <= 0 && 'Es requerido'} required /> */}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.calendarOutline} size='md' />
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>Horario</p>
        </div>
        <AddHorario setDataImportante={setDataImportante} dataImportante={dataImportante} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', margin: '32px 0 32px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.globeOutline} size='md' />
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>{dataImportante.tipo === 'Taller'?'Direccion y Ubicacion':'Zona de cobertura'}</p>
        </div>
        <Input type={'text'} name={'direccion'} placeholder={dataImportante.tipo === 'Taller'?'Agregar direccion':'Ejemplo: Bogota y alrededores...'} onChange={handleChange} value={dataImportante.direccion} error={errorInput && dataImportante.direccion?.length <= 0 && 'Es requerido'} required />
        <p style={{ fontSize: '14px', marginTop: '8px', fontWeight: '600', color: errorInput && dataImportante.coordenadas?.length <= 1 && '#f50057' }}>{dataImportante.tipo === 'Taller' ? 'Ubica el punto en el mapa. Esta sera ubicacion que veran los demas' : 'Ajusta tu posicion y el rango de disponibilidad de tus servicios.'}</p>

        {dataImportante.tipo === 'Taller'
          ?
          <MapDireccion setDataImportante={setDataImportante} dataImportante={dataImportante} />
          :
          <MapCobertura setDataImportante={setDataImportante} dataImportante={dataImportante} />
        }
      </div>

      <Button disable={disabled} onClick={handleSubmit} size='lg' variant={ButtonVariant.secondary}>
        Siguiente
      </Button>

    </div>
  )
}