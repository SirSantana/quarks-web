
import styles from '@/styles/Main.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router'
import Button, { ButtonVariant } from '../Button/Button';
import { CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import CalificacionWidget from './CalificacionWidget';



export default function ModalSolicitaServicio({ data, setVisibleModalSolicitaServicio }) {
  const router = useRouter()
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)

  const handleWhatsAppClick = () => {
    // createVisitaWhatsapp({ variables: { id: data?.id } })
    router.push(`/${router.query.id}/solicitar-revision?ide=${data?.id}`);
    
    // let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    // url += `&text=${encodeURI(`Buen dia, encontre su taller en https://quarks.com.co${router?.asPath}, tengo el siguiente problema...`)}&app_absent=0`
    // window.open(url);
  };
  return (
    <div className={styles.modal} style={{ zIndex: '10000' }}>
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px', width: '90%', maxWidth: '400px', height: 'fit-content' }} className={styles.modalContent}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>{data?.nombre.slice(0,25)}</p>
            <ion-icon onClick={() => setVisibleModalSolicitaServicio(false)} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
          </div>
        </header>
        <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
          <Image width={64} height={64} src={data?.fotoperfil} style={{ objectFit: 'cover', borderRadius: '50%' }} />
         
          <p style={{ fontSize: '20px', marginTop: '8px', fontWeight: '700', textAlign: 'center' }}>Cuida tu vehiculo con nosotros</p>
          
          <p style={{ fontSize: '14px', fontWeight: '400', textAlign: 'center' }}>¡Dale a tu vehículo la atención que se merece! Haz clic en 'Solicitar Servicio' ahora.</p>
        
        </body>
        <CalificacionWidget id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />

        <footer style={{ display: 'flex', width: '100%', marginTop: '16px' }}>
          <Button onClick={handleWhatsAppClick} variant={ButtonVariant.secondary} fullWidth>
            Solicitar Servicio
          </Button>
        </footer>
      </div>

    </div>

  )
}