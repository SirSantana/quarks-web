
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useQuery } from '@apollo/client'
import Icon, { IconCatalog } from '../Icon/Icon'
import Divider from '../Box/Divider'

const Star = ({ index, stars, tamaño, }) => {
  return (
    // <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
    <Icon size='sm' name={IconCatalog.star} style={{ color: stars < index + 1 ? '#c5c5c5' : '#FBBC04', fontSize: '12px' }} />

  )
}
let estrellas = [1, 2, 3, 4, 5]

export default function CalificacionWidget({ id, ctdCalificaciones, onClick }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const { data, loading } = useQuery(GET_OPINIONES, { variables: { id: id } })
  return (

    <div onClick={onClick} className={styles.containerHeaderCalendario} style={{border:'none', padding:'0', margin:'0 auto', border:0, boxShadow:'none', marginBottom:'16px'}}>
      {loading
        ?
        <div
          className={styles.skeleton}
        />
        :
        data?.getOpiniones.length > 0
          &&
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', width:'100%', justifyContent:'center'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>{result?.data?.getCalificacionOpiniones}</p>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', }}>
                {estrellas.map((el, index) => (
                  <Star index={index} stars={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={'16'} />
                ))}
              </div>

            </div>
            <Divider backgroundColor={'#FBBC04'} />
            <p style={{ fontSize: '14px', fontWeight: '600' }}>{Number(ctdCalificaciones) + data.getOpiniones.length} reseñas</p>
          </div>
         
      }

    </div>

  )
}