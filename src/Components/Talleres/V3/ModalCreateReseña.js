
import styles from '@/styles/Modales.module.css'
import Icon, { IconCatalog } from '../../Icon/Icon'
import SelectBrand from '../../MenuSelects/SelectBrand'
import SelectServicioProfile from '../../MenuSelects/SelectServicioProfile'
import Button from '../../Button/Button'
import SelectPhoneNumber from '../../MenuSelects/SelectPhoneNumber'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_SOLICITUD_SERVICIO } from '@/graphql/mutations'
import { GET_WHATSAPP_NEGOCIO } from '@/graphql/queries'
import { useRouter } from 'next/router'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'

export default function ModalCreateReseña({ setForm, form }) {
  const router = useRouter()

  const closeModal = () => {
    router.push(`/${router.query.id}/prev` , undefined, { shallow: true, scroll: false });
  }
  
  const [createSolicitudServicio, { loading, data, error }] = useMutation(CREATE_SOLICITUD_SERVICIO, {
    onCompleted: () => {
      setTimeout(() => {
        closeModal();
      }, 4000);
    }
  })
  const result = useQuery(GET_WHATSAPP_NEGOCIO, { variables: { id: router.query?.modalSolicitar } })
  //  AGREGAR MODAL A LA QUERY Y COLOCARLE EL ID DEL ALMACEN PARA NO TENER QUE PASAR POR PROPS EL ID Y EL FORM Y MANEJAR QUE EL MODAL ESTE ABIERTO SI LA QUERY SOLICTAR SERVICIO ESTA
  const whatsapp = result?.data?.getWhatsappNegocio

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.descripcion.length < 12) {
      return alert('Cuentanos mas sobre el problema de tu vehiculo!')
    }
    if (form.referencia !== '' && form.servicios.length > 0 && whatsapp) {
      createSolicitudServicio({ variables: { ...form, almacen: router.query?.modalSolicitar, indicativo: form?.indicativo ? form.indicativo : '+57' } })
      if (process.env.NODE_ENV !== 'development') {
        const message = `¡Hola! Estoy interesado en sus servicios.

        🛠️  *Descripción del Problema:* ${form.descripcion} 
        ⚙️  *Servicio:* ${form.servicios} 
        🚗  *Marca del Vehículo:* ${form.marca} 
        🔍  *Referencia del Vehículo:* ${form.referencia} 
        Perfil del Taller: https://www.quarks.com.co/${router.query?.id}
  Quedo pendiente.`;
        let url = `https://api.whatsapp.com/send?phone=57${whatsapp?.replace(/\s/g, '')}`;

        url += `&text=${encodeURIComponent(message)}&app_absent=0`;
        window.open(url);
      }

    } else {
      return alert('Por favor, rellena todos los campos.');
    }

  }

  return (
    <div onClick={closeModal} className={styles.modal}  >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '24px', borderRadius: '16px', margin: '0 auto', backgroundColor: 'white' }}>
        <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
            <p style={{ margin: '0', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Crea una Reseña</p>
          </div>
          <Icon size='lg' onClick={closeModal} name={IconCatalog.closeOutline} style={{ color: '#6C788E' }} />
        </header>
        {/* <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '16px 0' }} /> */}

       
      </div>
      {data &&
        <ModalSuccessfull title={`Perfecto`} subtitle={'Tu solicitud ha sido enviada al negocio. Se pondran en concretaciones poco tiempo'} />
      }
      {loading &&
        <ModalLoading title={'Contactando con el taller... '} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error, reintentalo mas tarde'} subtitle={error?.message} />
      }
    </div>

  )
}