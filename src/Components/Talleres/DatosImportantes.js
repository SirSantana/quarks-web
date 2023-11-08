import { CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO, CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router'
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { MagicMotion } from 'react-magic-motion';
import WidgetComplete from '../Icon/WidgetComplete';
import { IconCatalog } from '../Icon/Icon';


const DatosImportantes = forwardRef(({ data, setVisibleModalTelefono, setEditPerfil, editPerfil, editMode, result}, ref) => {
  const router = useRouter()
  const myRef = useRef(null);
  const [createClickTelefono] = useMutation(CREATE_CLICK_TELEFONO)
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)

  const handleClickTelefono = (modal) => {
    if (modal) {
      setVisibleModalTelefono(true)
    }
    createClickTelefono({ variables: { id: data?.id } })
  }
  const abrirGoogleMaps = (direccion) => {
    const direccionFormatoURL = encodeURIComponent(direccion);
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionFormatoURL}`;
    window.open(url, '_blank');
  };
  const handleClickMapa = (data) => {
    createClickMapaDireccion({ variables: { id: data?.id } })
    abrirGoogleMaps(data?.direccion)
  }
  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: data?.id } })
    let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }
  const handleChange=(e)=>{
    setEditPerfil({...editPerfil, [e.target.name]: e.target.value})
  }
  // Permite al componente padre acceder a la función scrollToRef
  useImperativeHandle(ref, () => ({
    scrollToRef: () => {
      if (myRef.current) {
        window.scrollTo({
          top: myRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    },
  }));

  return (
    <MagicMotion>
      
      <WidgetComplete editMode={editMode} onChange={handleChange} name={'telefono'} onClick={!editMode ?handleClickTelefono:undefined} withBorder={false} text={data?.telefono} icon={IconCatalog.callOutline} icon2={IconCatalog.callOutline} editPerfil={editPerfil} valueEditCheck={result?.data?.editNegocioVDos.telefono}/>
      <WidgetComplete editMode={editMode}onChange={handleChange} name={'whatsapp'}onClick={!editMode ?sendMessageWha:undefined} withBorder={false} text={data?.whatsapp} icon={IconCatalog.logoWhatsapp} icon2={IconCatalog.openOutline}editPerfil={editPerfil} valueEditCheck={result?.data?.editNegocioVDos.whatsapp}/>
      <WidgetComplete editMode={editMode}onChange={handleChange} name={'direccion'}onClick={!editMode ? () => handleClickMapa(data) : undefined} withBorder={false} text={data?.direccion} icon={IconCatalog.compassOutline} icon2={IconCatalog.openOutline}editPerfil={editPerfil} valueEditCheck={result?.data?.editNegocioVDos.direccion}/>

      {/* <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Datos Importantes</h2> */}
     

      {data?.paginaWeb && <div style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px' }} name="arrow-redo-outline"></ion-icon>
          <p style={{ fontSize: '14px' }}>{data?.paginaweb}</p>
        </div>
        <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name="open-outline"></ion-icon>
      </div>}


     
    </MagicMotion>
  )
})
export default DatosImportantes;