
import styles from '@/styles/Main.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import { useRouter } from 'next/router'


export default function ModalButtonsContacto({data, setVisibleModalButtons}) {
  const router = useRouter()
  const sendMessageWha = () => {
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}`);
  }
  const contactMe = ()=>{
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}&contactme=true`);

  }
  return (
    <div className={styles.modal} style={{ zIndex: '10000' }}>
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px', width: '90%', maxWidth: '400px', height:'fit-content' }} className={styles.modalContent}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <Icon name={IconCatalog.callOutline} />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <p style={{ fontSize: '16px', fontWeight: '600', }}>Contactar al negocio</p>
            </div>
          </div>
          <ion-icon onClick={() => setVisibleModalButtons(false)} style={{ fontSize: '20px' }} name={"close-outline"}></ion-icon>
        </div>

        <p style={{ fontSize: '14px', marginBottom:'16px' }}>Escoge una opcion para contactarte con el negocio</p>
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