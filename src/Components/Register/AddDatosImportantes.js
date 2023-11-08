import { EDIT_NEGOCIO_VDOS } from '@/graphql/mutations'
import styles from '@/styles/Faq.module.css'
import { handleFileUpload } from '@/utils/base64'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import AddHorario from './AddHorario'
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router'
import Icon, { IconCatalog } from '../Icon/Icon'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'
import AddFotoPerfil from './AddFotoPerfil'

export default function AddDatosImportantes({ setPage, setDataImportante, dataImportante }) {
  const [editNegocioVDos, { loading, data, error }] = useMutation(EDIT_NEGOCIO_VDOS)
  const [errorInput, setErrorInput] = useState(false)
  const router = useRouter()


  const handleChange = (e) => {
    setDataImportante({ ...dataImportante, [e.target.name]: e.target.value })
    setErrorInput(false)
  }



  let disabled = dataImportante.ciudad.length <= 0 || dataImportante?.pais.length <= 0 || dataImportante?.direccion.length <= 0 || dataImportante?.telefono.length <= 0 || dataImportante?.whatsapp.length <= 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (disabled) {
      return setErrorInput('Debes completar todos los campos')
    }
    editNegocioVDos({ variables: dataImportante })
  }
  useEffect(() => {
    if (data) {
      router.push(data?.editNegocioVDos.userName)
    }
  }, [data])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
      <Icon name={IconCatalog.chevronBackOutline} size={'md'} onClick={() => setPage(2)} />

      <h1 className={styles.titleAccess}>Agreguemos la foto de tu taller y unos datos de contacto.</h1>
      <AddFotoPerfil setDataImportante={setDataImportante} dataImportante={dataImportante}/>
      
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.compassOutline} size='md' />

        </div>
        <input value={dataImportante.direccion} onChange={handleChange} className={styles.inputsAddInfo} type='text' name='direccion' placeholder='Agregar direccion' />
        {dataImportante?.direccion?.length > 3 ? <Icon name={IconCatalog.checkmarkCircle} size='md'style={{ color: '#4EDD76', }} />: <Icon name={IconCatalog.alertCircle} size='md'style={{ color: '#f50057', }} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.earthOutline} size='md' />
        </div>
        <input value={dataImportante.ciudad} onChange={handleChange} className={styles.inputsAddInfo} type='text' name='ciudad' placeholder='Agregar ciudad' />
        {dataImportante?.ciudad?.length > 3 ? <Icon name={IconCatalog.checkmarkCircle} size='md'style={{ color: '#4EDD76', }} />: <Icon name={IconCatalog.alertCircle} size='md'style={{ color: '#f50057', }} />}

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.earthOutline} size='md' />
        </div>
        <input value={dataImportante.pais} onChange={handleChange} className={styles.inputsAddInfo} type='text' name='pais' placeholder='Agregar pais' />
        {dataImportante?.pais?.length > 3 ? <Icon name={IconCatalog.checkmarkCircle} size='md'style={{ color: '#4EDD76', }} />: <Icon name={IconCatalog.alertCircle} size='md'style={{ color: '#f50057', }} />}

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.callOutline} size='md' />
        </div>
        <input value={dataImportante.telefono} onChange={handleChange} className={styles.inputsAddInfo} type='tel' name='telefono' placeholder='Agregar numero de telefono' />
        {dataImportante?.telefono?.length > 3 ?<Icon name={IconCatalog.checkmarkCircle} size='md'style={{ color: '#4EDD76', }} />: <Icon name={IconCatalog.alertCircle} size='md'style={{ color: '#f50057', }} />}

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.logoWhatsapp} size='md' />
        </div>
        <input value={dataImportante.whatsapp} onChange={handleChange} className={styles.inputsAddInfo} type='tel' name='whatsapp' placeholder='Agregar numero de WhatsApp' />
        {dataImportante?.whatsapp?.length > 3 ? <Icon name={IconCatalog.checkmarkCircle} size='md'style={{ color: '#4EDD76', }} />: <Icon name={IconCatalog.alertCircle} size='md'style={{ color: '#f50057', }} />}

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
          <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.calendarOutline} size='md' />
          </div>
          <p style={{ fontSize: '14px', fontWeight: '600' }}>Horario</p>
        </div>

        {/* <input value={dataImportante.horario} onChange={handleChange} className={styles.inputsAddInfo} type='text' name='horario' placeholder='Agregar horario' />
				{dataImportante?.horario?.length > 3 ? <ion-icon style={{ fontSize: '20px', color: '#4EDD76', }} name="checkmark-circle"></ion-icon> : <ion-icon style={{ fontSize: '20px', }} name="ellipse-outline"></ion-icon>} */}
        <AddHorario setDataImportante={setDataImportante} dataImportante={dataImportante} />
      </div>
      {(error || errorInput) && (
        <p
          style={{
            color: '#f50057',
            fontSize: '14px',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Icon name={IconCatalog.alertCircle} size='md' />
          {error?.message || errorInput}
        </p>
      )}
      <button style={{ backgroundColor: !disabled || loading ? '#f50057' : '#c5c5c5' }} onClick={handleSubmit} type="submit" className={styles.button2}>
        {loading ?
          <p style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            Guardando
            <Image src="/loader.svg" alt="loader" width={24} height={24} />
          </p>
          : 'Guardar cambios'
        }

      </button>

    </div>
  )
}