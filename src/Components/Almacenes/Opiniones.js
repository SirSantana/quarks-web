
import { CREATE_OPINION } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/Almacenes.module.css'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import ModalCreateOpinion from './ModalCreateOpinion'
import Opinion from './Opinion'


const Star = ({ index, stars, tamaño }) => {
  return (
    <img src={stars < index + 1 ? `../star-outline.svg` : `../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]


export default function Opiniones({ almacen }) {
  const [visibleOpinion, setVisibleOpinion] = useState(false)
  const [stars, setStars] = useState(0)
  const [calificated, setCalificated] = useState(false)
  const [getCalificacionOpiniones, { loading, error, data }] = useLazyQuery(GET_CALIFICACION_OPINIONES)
  const [numCalificaciones, setNumCalificaciones] = useState(0)

  useEffect(() => {
    if (!visibleOpinion) {
      setStars(0)
    }
  }, [visibleOpinion])
  useEffect(() => {
    getCalificacionOpiniones({ variables: { id: almacen } })
  }, [almacen])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '8px' }} className={styles.title2}>Opiniones</h2>
        {numCalificaciones > 0 &&
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', marginRight: '8px', color: '#f50057' }} className={styles.title2}>{data?.getCalificacionOpiniones}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
                {estrellas.map((el, index) => (
                  <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={data?.getCalificacionOpiniones} tamaño={'12'} />
                  </div>
                ))}
              </div>
              <h6 className={styles.subtitle2} style={{ margin: 0, color: '#6D6D6D', alignSelf: 'flex-start' }}>{numCalificaciones} calificaciones</h6>

            </div>
          </div>
        }
      </div>


      <div className={styles.containerInputOpinion}>
        <h6 className={styles.subtitle} style={{ margin: 0, color: '#373737', fontWeight: '600', fontSize: '14px' }}> Califica y opina</h6>
        <h6 className={styles.subtitle2} style={{ margin: '4px 0 16px 0', color: '#6D6D6D', alignSelf: 'flex-start' }}>{calificated ? 'Ya compartiste tu opinion' : 'Comparte tu experiencia para ayudar a otros usuarios'} </h6>


        {/* <input placeholder='Agrega tu opinion del almacen' type={'text'} className={styles.input} /> */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {!calificated &&
            estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => { setStars(index + 1), setVisibleOpinion(true) }} >
                <Star index={index} stars={stars} tamaño={'24'} />
              </div>
            ))}


        </div>
        {/* <input title='Opinar' onClick={() => setVisibleOpinion(true)} type={'submit'} className={styles.button2} /> */}
        {visibleOpinion &&
          <div className={styles.modal}>
            <ModalCreateOpinion setVisibleOpinion={setVisibleOpinion} setCalificated={setCalificated} />
          </div>}

        <Opinion almacen={almacen} setCalificated={setCalificated} setNumCalificaciones={setNumCalificaciones} />

      </div>
    </>

  )
}