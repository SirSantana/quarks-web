import styles from '@/styles/ServiciosAutomotriz.module.css'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import Reseña from './Reseña'
import { useRouter } from 'next/router'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'


export default function Reseñas({ id, ctdCalificaciones, urlMaps, userName}) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const { data } = useQuery(GET_OPINIONES, { variables: { id: id } })
  const router = useRouter()
  const handlerLoginOpinion = () => {
    router.push(`${userName?userName:router.asPath}/crear-resena?ide=${id}`);
  }
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.ribbonOutline} size='lg' />Reseñas </h2>
      <div onClick={handlerLoginOpinion} className={styles.containerHeaderCalendario} style={{ cursor: 'pointer', backgroundColor: '#373737', justifyContent: 'space-between', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px', boxSizing: 'border-box', gap: '16px', margin: '0 auto', borderRadius: '16px', maxWidth: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <Icon size='lg' style={{ color: 'white' }} name={IconCatalog.addCircle} />
          <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', }}>Agregar Reseña</p>
        </div>
      </div>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <Icon size='lg' name={IconCatalog.star} style={{ color: '#FBBC04' }} />
          {data?.getOpiniones.length > 0
            ?
            <>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#373737', }}>{result?.data?.getCalificacionOpiniones}</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }} className={styles.textCategory} > · ({Number(ctdCalificaciones) + data.getOpiniones.length} reseñas)</p>
            </>
            :
            <p>Sin reseñas todavia</p>
          }
        </div>
      </div>
      {data?.getOpiniones.map(reseña => (
        <Reseña reseña={reseña} key={reseña.id}/>
      ))}
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        {data?.getOpiniones.length > 0 && urlMaps&&
          <Button variant={ButtonVariant.outlined} fullWidth link href={urlMaps}>
            Mostrar reseñas
          </Button>
        }
      </div>

    </>
  )
}