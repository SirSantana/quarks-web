
import { GET_CALIFICACION_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/Almacenes.module.css'
import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'

const Star = ({ index, stars, tamaño }) => {
  return (
    <img src={stars < index + 1 ? `../star-outline.svg` : `../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function HeaderAlmacen({ almacen,  }) {
  const [getCalificacionOpiniones, { loading, error, data }] = useLazyQuery(GET_CALIFICACION_OPINIONES)
  useEffect(() => {
    getCalificacionOpiniones({ variables: { id: almacen?.id } })
  }, [almacen])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
        <h3 className={styles.title3}>{almacen?.direccion} · {almacen?.barrio} - {almacen?.ciudad}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '0' }}>
        <img src={'../storefront-outline.svg'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
        <h1 style={{ marginBottom: 0 }} className={styles.title}>{almacen?.nombre}</h1>
        
      </div>
      {data?.getCalificacionOpiniones?.length>0 &&
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
          {estrellas.map((el, index) => (
            <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
              <Star index={index} stars={data?.getCalificacionOpiniones} tamaño={'16'} />
            </div>
          ))}
        </div>
        <h6 className={styles.subtitle2} style={{ margin: 0, color: '#6D6D6D', alignSelf: 'flex-start' }}>({data?.getCalificacionOpiniones.length})</h6>

      </div>
    </div>
      }
    </>
  )
}