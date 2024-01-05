
import { CREATE_CLICK_COMPARTIDO, CREATE_CLICK_MAPA, CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Icon, { IconCatalog } from '../Icon/Icon';


export default function ButtonsFooter({ data, user }) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)

  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)
  const [createClickCompartido] = useMutation(CREATE_CLICK_COMPARTIDO)

  const sendMessageWha = () => {
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}`);

    // createVisitaWhatsapp({ variables: { id: data?.id } })
    // let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    // url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    // window.open(url);
  }

  const handleClickCompartir = () => {
    setVisibleShareArticulo(true)
    createClickCompartido({ variables: { id: data?.id } })
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
  return (
    <div className={styles.divFixed}>
      {!user?.userName === router?.query?.id
        ?
        <>

          <button  className={styles.buttonFixedBlack} onClick={sendMessageWha} ><Icon name={IconCatalog.createOutline} style={{ color: 'white' }} size='md' /> Editar Taller</button>
          <button className={styles.buttonFixedBlack2}  onClick={() => handleClickMapa(data)} ><Icon name={IconCatalog.earthOutline} style={{ color: '#373737' }} size='md' /> </button>

          <button className={styles.buttonFixedBlack2} onClick={handleClickCompartir} ><Icon name={IconCatalog.paperPlaneOutline} style={{ color: '#373737' }} size='md' /> </button>
        </>
        :
        <>
          <button  className={styles.buttonFixedBlack} onClick={sendMessageWha} >Solicitar Revisión <Icon name={IconCatalog.logoWhatsapp} style={{ color: 'white' }} size='md' /></button>
          <button  className={styles.buttonFixedBlack2} onClick={() => handleClickMapa(data)} ><Icon name={IconCatalog.earthOutline} style={{ color: '#373737' }} size='md' /> </button>

          <button className={styles.buttonFixedBlack2} onClick={handleClickCompartir} ><Icon name={IconCatalog.paperPlaneOutline} style={{ color: '#373737' }} size='md' /> </button>
        </>
      }
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    </div>

  )
}