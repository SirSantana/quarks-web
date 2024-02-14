
import styles from '@/styles/Main.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import { useRouter } from 'next/router'
import CalificacionWidget from './CalificacionWidget'
import Image from 'next/image'


export default function ModalButtonsContacto({ data, setVisibleModalButtons }) {
  const router = useRouter()
  const sendMessageWha = () => {
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}`);
  }
  const contactMe = () => {
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}&contactme=true`);

  }
  return (
    <div className={styles.modal} style={{ zIndex: '10000' }}>
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px', width: '90%', maxWidth: '400px', height: 'fit-content' }} className={styles.modalContent}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <Icon name={IconCatalog.callOutline} />
            <p style={{ flex: 1, fontSize: '16px', fontWeight: '600', }}>Contacta a {data?.nombre}</p>
          </div>
          <Icon onClick={() => setVisibleModalButtons(false)} name={IconCatalog.closeOutline} />
        </div>
        <Image width={64} height={64} src={data?.fotoperfil} style={{ objectFit: 'cover', borderRadius: '50%', margin:'0 auto' }} />

        <CalificacionWidget id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />

        <p style={{ fontSize: '14px', marginBottom: '16px' }}>Escoge una opcion para contactarte con el {data?.tipo === 'Mecanico a Domicilio' ? 'mecanico' : 'negocio'}</p>
        <Button onClick={sendMessageWha} variant={ButtonVariant.secondary} fullWidth>
          Contactar por WhatsApp
        </Button>
        <Button onClick={contactMe} variant={ButtonVariant.outlined} fullWidth>
          Solicitar que me contacten
        </Button>
        {/* <Button variant={ButtonVariant.terciary} fullWidth>
          Llamar al celular
        </Button> */}
      </div>

    </div>
  )
}