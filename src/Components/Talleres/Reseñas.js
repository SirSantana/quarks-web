import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useRouter } from 'next/router'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import CardReseña from './V3/CardReseña'
import styles from '@/styles/Negocio.module.css'


export default function Reseñas({ id, ctdCalificaciones, urlMaps, userName, nombre, promCalificacion }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const { data } = useQuery(GET_OPINIONES, { variables: { id: id } })
  const router = useRouter()

  const handlerLoginOpinion = () => {
    router.push(`/${userName ? userName : router.query.id}/crear-resenaa`, undefined, { shallow: true, scroll: false });
  }
  return (
    <>
      <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px' }} className={styles.titleNegocio}>Calificacion y Opiniones {nombre} </h2>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', gap: '20px', borderRadius: '16px', width: '100%' }}>
        <div className={styles.containerSectionReseñas}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', width: '100%',alignItems:'center', }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={"#407BFF"} // Relleno dinámico según la calificación
              style={{ cursor: "pointer" }}
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.834 1.419 8.243L12 18.897l-7.419 4.603L6 15.257 0 9.423l8.332-1.268z" />
            </svg>
            {data?.getOpiniones.length > 0
              ?
              <>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#373737', }}>{result?.data?.getCalificacionOpiniones}</p>
                <p style={{ fontSize: '14px', marginTop: '4px' }} className={styles.textCategory} > · ({Number(ctdCalificaciones) + data.getOpiniones.length} reseñas)</p>
              </>
              :
              ctdCalificaciones
                ?
                <>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#373737', }}>{promCalificacion}</p>
                  <p style={{ fontSize: '14px', marginTop: '4px' }} className={styles.textCategory} > · ({Number(ctdCalificaciones)} reseñas)</p>
                </>
                : <p>Sin reseñas todavia</p>

            }
          </div>
          <Button onClick={handlerLoginOpinion} variant={ButtonVariant.secondary} fullWidth>
            <Icon size='lg' style={{ color: 'inherit' }} name={IconCatalog.addCircle} />
            Crear reseña
          </Button>
        </div>
      </div>
      {/* {data?.getOpiniones.map(reseña => (
        <Reseña reseña={reseña} key={reseña.id} />
      ))} */}
      <div className={styles.containerRevisionesSlider}>
        {data?.getOpiniones.map(reseña => (
          <CardReseña reseña={reseña} key={reseña.id} />
        ))}
      </div>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        {(data?.getOpiniones.length > 0 || ctdCalificaciones) && urlMaps &&
          <Button variant={ButtonVariant.outlined} fullWidth link href={urlMaps}>
            Mostrar reseñas
          </Button>
        }
      </div>

    </>
  )
}