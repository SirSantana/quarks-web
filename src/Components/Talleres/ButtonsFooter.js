
import { CREATE_ACCION,  } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {  useState } from 'react';
import ModalButtonsContacto from './ModalButtonsContacto';
import Button, { ButtonVariant } from '../Button/Button';
import { IconCatalog } from '../Icon/Icon';


export default function ButtonsFooter({ data, user, tipo }) {
  const router = useRouter()
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [visibleModalButtons, setVisibleModalButtons] = useState(false)
  const [createAccion, result] = useMutation(CREATE_ACCION)

  const sendMessageWha = () => {
    setVisibleModalButtons(true)
    if (process.env.NODE_ENV === 'production') {
    return  createAccion({variables:{almacen:data?.id, tipo:'btn-solicitar-revision', estado:'production'}})
    }
  }

  return (
    <div className={styles.divFixed}>
      <>
        {/* <Button onClick={sendMessageWha} size='lg' variant={ButtonVariant.gradient} fullWidt0h icon={IconCatalog.logoWhatsapp}>
          Solicitar cotizacion
        </Button> */}
        <Button style={{fontSize:'14px'}} onClick={sendMessageWha} size='lg' variant={ButtonVariant.whatsapp} fullWidth icon={IconCatalog.logoWhatsapp}>
          Enviar mensaje
        </Button>
        {/* <button aria-label='Ver direccion taller' className={styles.buttonFixedBlack2} onClick={() => handleClickMapa(data)} ><Icon name={IconCatalog.earthOutline} style={{ color: '#373737' }} size='md' /> </button> */}

        {/* <button aria-label='Compartir perfil taller' className={styles.buttonFixedBlack2} onClick={handleClickCompartir} ><Icon name={IconCatalog.paperPlaneOutline} style={{ color: '#373737' }} size='md' /> </button> */}
      </>
      {visibleModalButtons && <ModalButtonsContacto data={data} setVisibleModalButtons={setVisibleModalButtons} />}
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    </div>

  )
}