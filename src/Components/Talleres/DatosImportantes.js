import { CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO, CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router'
import { forwardRef, useImperativeHandle, useRef } from 'react';


const DatosImportantes = forwardRef(({ data, setVisibleModalTelefono }, ref) => {
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
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Datos Importantes</h2>
      <div onClick={handleClickTelefono} style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px' }} name="call-outline"></ion-icon>
          <p style={{ fontSize: '14px' }}>{data?.telefono}</p>
        </div>
        <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name="call-outline"></ion-icon>

      </div>
      <div onClick={sendMessageWha} style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px' }} name="logo-whatsapp"></ion-icon>
          <p style={{ fontSize: '14px' }}>{data?.whatsapp}</p>
        </div>
        <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name="open-outline"></ion-icon>
      </div>
      <div  ref={myRef} onClick={() => handleClickMapa(data)} style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px' }} name="compass-outline"></ion-icon>
          <p style={{ fontSize: '14px' }}>{data?.direccion}</p>
        </div>
        <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name="open-outline"></ion-icon>

      </div>

      {data?.paginaWeb && <div style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <ion-icon style={{ fontSize: '20px' }} name="arrow-redo-outline"></ion-icon>
          <p style={{ fontSize: '14px' }}>{data?.paginaweb}</p>
        </div>
        <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name="open-outline"></ion-icon>
      </div>}


     
    </>
  )
})
export default DatosImportantes;