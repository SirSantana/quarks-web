import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useRouter } from 'next/router'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import CardReseña from './V3/CardReseña'
import styles from '@/styles/Negocio.module.css'
import { Star, MessageSquarePlus } from 'lucide-react' // Importando iconos de Lucide-react (asumiendo que están disponibles)


export default function Reseñas({ id, ctdCalificaciones, urlMaps, userName, nombre, promCalificacion, setVisibleModalCreateReseña }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const { data } = useQuery(GET_OPINIONES, { variables: { id: id } })
  const router = useRouter()
  const handlerLoginOpinion = () => {
    setVisibleModalCreateReseña(true);
    // router.push(`/${userName ? userName : router.query.id}/crear-resenaa`, undefined, { shallow: true, scroll: false });
  }

  // Lógica para determinar el promedio y la cantidad total de reseñas
  const totalOpinionesNuevas = data?.getOpiniones.length || 0;
  const totalReseñas = Number(ctdCalificaciones || 0) + totalOpinionesNuevas;
  const promedio = result?.data?.getCalificacionOpiniones || promCalificacion;
  const tieneReseñas = totalReseñas > 0;

  return (
    <>
      {/* Título: Usa font-size más moderno y consistente (24px) y mantiene el peso 600 */}
      <h2 style={{ fontSize: '24px', alignSelf: 'flex-start', fontWeight: '600', marginBottom: '24px', color: '#182537' }} className={styles.titleNegocio}>
        Calificación y Opiniones {nombre}
      </h2>

      {/* Contenedor Principal de la Calificación y Botón */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', // Flex column en móvil/defecto
          gap: '24px', 
          width: '100%', 
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB', // Borde limpio
          backgroundColor: '#F9FAFB', // Fondo sutil para destacar la sección
          boxSizing: 'border-box'
        }}
        className={styles.reviewsSummaryContainer} // Usar una clase para hacer que sea row en desktop
      >
        
        {/* Sección de la Calificación */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          
          {tieneReseñas ? (
            <>
              {/* Ícono de Estrella Moderno y Color Primario */}
              <Star size={32} fill="#407BFF" color="#407BFF" /> 
              
              {/* Promedio Grande y Negrita */}
              <p style={{ fontSize: '36px', fontWeight: '700', color: '#182537', lineHeight: 1 }}>{promedio}</p>
              
              {/* Cantidad de Reseñas */}
              <p style={{ fontSize: '16px', color: '#6B7280', alignSelf: 'flex-end', paddingBottom: '4px' }} className={styles.textCategory} > 
                ({totalReseñas} reseñas)
              </p>
            </>
          ) : (
            <p style={{ fontSize: '16px', color: '#6B7280' }}>Sin reseñas todavía.</p>
          )}
        </div>

        {/* Botón para Crear Reseña - Usando variant primary/default para un CTA claro */}
        {/* <div style={{ width: '100%', maxWidth: '300px' }}>
            <Button onClick={handlerLoginOpinion} fullWidth>
                <MessageSquarePlus size={18} style={{ marginRight: '8px' }} /> 
                Escribir Reseña
            </Button>
        </div> */}
      </div>
      
      {/* Listado de Reseñas */}
      <div style={{ marginTop: '24px' }} className={styles.containerRevisionesSlider}>
        {/* Aquí asumimos que CardReseña mantiene el estilo limpio */}
        {data?.getOpiniones.map(reseña => (
          <CardReseña reseña={reseña} key={reseña.id} />
        ))}
      </div>

      {/* Botón para Ver Más Reseñas (si aplica) */}
      <div style={{ margin: '24px auto 0 auto', width: '100%', maxWidth: '600px', boxSizing: 'border-box', padding: '0 24px' }}>
        {(data?.getOpiniones.length > 0 || ctdCalificaciones) && urlMaps &&
          <Button 
            variant={ButtonVariant.outlined} 
            fullWidth 
            link 
            href={urlMaps}
            style={{ 
              height: '48px', 
              border: '1px solid #407BFF', // Borde con color primario
              color: '#407BFF', // Texto con color primario
              backgroundColor: 'white' 
            }}
          >
            Ver todas las {totalReseñas} reseñas
          </Button>
        }
      </div>
    </>
  )
}