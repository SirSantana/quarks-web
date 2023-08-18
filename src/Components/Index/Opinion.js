import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from "@/graphql/queries"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import styles from '@/styles/Almacenes.module.css'


const Star = ({ index, calificacion, tamaño }) => {
  return (
    <img src={calificacion < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function Opinion({ almacen, setCalificated }) {
  const [getOpiniones, result] = useLazyQuery(GET_OPINIONES)
  const [email, setEmail] = useState(null)
  const [numCalificaciones, setNumCalificaciones] = useState(0)
  const [getCalificacionOpiniones, { loading, error, data }] = useLazyQuery(GET_CALIFICACION_OPINIONES)



  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  }, [])
  useEffect(() => {
    getCalificacionOpiniones({ variables: { id: almacen } })
    getOpiniones({ variables: { id: almacen } })

  }, [almacen])
  useEffect(() => {
    if (result?.data?.getOpiniones) {
      setNumCalificaciones(result?.data?.getOpiniones?.length)
    }
  }, [result?.data])

  return (
    <>
      {result?.data?.getOpiniones?.length <= 0 &&
        <h6 className={styles.title3} style={{ margin: '4px 0 16px 0', color: '#373737', alignSelf: 'flex-start' }}>Aún no hay opiniones, sé el primero</h6>
      }
      {numCalificaciones > 0 &&
        <div className={styles.containerHeaderOpiniones}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <h2 className={styles.titleOpinion}>{data?.getCalificacionOpiniones}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
                {estrellas.map((el, index) => (
                  <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} calificacion={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={'24'} />
                  </div>
                ))}
              </div>
              <h6 className={styles.subtitle2} style={{ margin: 0, color: '#6D6D6D', alignSelf: 'flex-start' }}>{numCalificaciones} calificaciones</h6>

            </div>
          </div>
          <button style={{ width: '180px', gap: '16px', fontSize: '14px', alignSelf: 'flex-start', borderRadius: '50px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={styles.button}>
            {result?.data?.getOpiniones?.length + ' opiniones'}
            <img src={`../../arrowDown.svg`} style={{ height: '24px', width: '24px', marginRight: '8px' }} />
          </button>
        </div>

      }

      {
        result?.data?.getOpiniones?.map(opinion => {
          const fecha = new Date(opinion?.fecha).toLocaleDateString()
          if (opinion?.email === email) {
            setCalificated(true)
          }

          return (
            <>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                  {estrellas.map((el, index) => (
                    <div id={index} style={{ marginRight: '8px' }}  >
                      <Star index={index} calificacion={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={12} />
                    </div>
                  ))}
                </div>
                <h6 className={styles.subtitle2} style={{ color: '#6D6D6D', justifySelf: 'end', margin: 0 }}> {opinion.email} · {fecha}</h6>

              </div>
              <h6 className={styles.title3} style={{ margin: '4px 0', color: '#373737', alignSelf: 'flex-start' }}>{opinion?.descripcion}</h6>
              <div style={{ backgroundColor: '#d9d9d9', height: '1px', width: '100%', margin: '16px 0' }} />

            </>
          )

        })
      }

    </>

  )
}