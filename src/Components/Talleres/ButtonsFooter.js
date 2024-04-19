
import { CREATE_ACCION, } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button, { ButtonVariant } from '../Button/Button';
import { IconCatalog } from '../Icon/Icon';


export default function ButtonsFooter({ data, setVisibleModalButtons }) {
  const router = useRouter()
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [createAccion, result] = useMutation(CREATE_ACCION)

  const sendMessageWha = () => {
    setVisibleModalButtons(true)
    if (process.env.NODE_ENV === 'production') {
      return createAccion({ variables: { almacen: data?.id, tipo: 'btn-solicitar-revision', estado: 'production' } })
    }
  }

  return (
    <div className={styles.divFixed}>
      <Button style={{ fontSize: '14px' }} onClick={sendMessageWha} size='lg' variant={ButtonVariant.whatsapp} fullWidth icon={IconCatalog.logoWhatsapp}>
        Enviar mensaje
      </Button>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    </div>

  )
}