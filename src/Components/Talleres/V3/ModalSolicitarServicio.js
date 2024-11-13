
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

export default function ModalSolicitarServicio({ setForm, form }) {
  const closeModal = () => {
    router.push(
      { pathname: router.query.id },
      undefined, 
      { shallow: true, scroll:false }  
    );
  }
  const [createSolicitudServicio, { loading, data, error }] = useMutation(CREATE_SOLICITUD_SERVICIO, {
    onCompleted: () => {
      setTimeout(() => {
        closeModal();
      }, 4000);
    }
  })
  const router = useRouter()
  const result = useQuery(GET_WHATSAPP_NEGOCIO, { variables: { id: router.query?.modalSolicitar } } )
  //  AGREGAR MODAL A LA QUERY Y COLOCARLE EL ID DEL ALMACEN PARA NO TENER QUE PASAR POR PROPS EL ID Y EL FORM Y MANEJAR QUE EL MODAL ESTE ABIERTO SI LA QUERY SOLICTAR SERVICIO ESTA
  const whatsapp = result?.data?.getWhatsappNegocio
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.descripcion.length < 12) {
      return alert('Cuentanos mas sobre el problema de tu vehiculo!')
    }
    if (form.referencia !== '' && form.servicios.length > 0 && whatsapp) {
      createSolicitudServicio({ variables: {...form, almacen: router.query?.modalSolicitar, indicativo:form?.indicativo ?form.indicativo:'+57'} })
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
      <div onClick={(e) => e.stopPropagation()}  style={{ maxWidth: '400px', width: '90%', padding: '24px', borderRadius: '16px', margin: '0 auto', backgroundColor: 'white' }}>
        <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
            <p style={{ margin: '0', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Agendar cita</p>
          </div>
          <Icon size='lg' onClick={closeModal} name={IconCatalog.closeOutline} style={{ color: '#6C788E' }} />
        </header>
        {/* <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '16px 0' }} /> */}
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '32px 0 16px 0', }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Tipo de Servicio</label>
          <SelectServicioProfile handleChange={(e) => setForm({ ...form, servicios: [e.label] })} width={'100%'} defaultInitial={form.servicios[0]} form={form} />
        </div>
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Marca y modelo es tu Vehículo</label>
          <SelectBrand width={'80px'} handleChange={(e) => setForm({ ...form, marca: e.value })} handleChangeModelo={(e) => setForm({ ...form, referencia: e.target.value })} form={form} />
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Numero de teléfono</label>
          <SelectPhoneNumber width={'120px'} handleChange={(e) => setForm({ ...form, indicativo: e.value })} handlePhoneNumber={(e) => setForm({ ...form, celular: e.target.value })} form={form} />
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Descripcion del Problema</label>
          <textarea onChange={(e)=>setForm({...form,descripcion:e.target.value})} required name='descripcion' rows="5" value={form?.descripcion} style={{ width: '100%', fontSize: '14px', border: '1px solid #CFD5E1', borderRadius: '12px',  outline: 'none', padding: '16px', resize: 'none', margin: 0 }} type={'text'} placeholder={'Ejemplo: El auto presenta problemas con la transmisión o hace un ruido extraño al arrancar.'} />
        </div>


        <footer style={{ display: 'flex', alignItems: 'end', width: '100%', marginTop: '16px', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} className={'desktopButton'} style={{ alignSelf: 'flex-end', margin: '24px 0 0 0', backgroundColor: '#407BFF', whiteSpace: 'noWrap' }} >Solicitar Revision</Button>
        </footer>

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