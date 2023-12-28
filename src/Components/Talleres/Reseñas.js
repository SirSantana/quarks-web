import styles from '@/styles/ServiciosAutomotriz.module.css'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useState } from 'react'
import Reseña from './Reseña'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import ModalLoginFacebook from '../Almacenes/ModalLoginFacebook'
import ModalCreateOpinion from '../Almacenes/ModalCreateOpinion'

const Star = ({ index, stars, tamaño, }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px`, }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]

export default function Reseñas({ id }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const {data} = useQuery(GET_OPINIONES, { variables: { id: id } })
  const router = useRouter()
  const handlerLoginOpinion = () => {
    router.push(`${router.asPath}/crear-resena?ide=${id}`);
  }

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Reseñas </h2>


      <div onClick={handlerLoginOpinion} className={styles.containerHeaderCalendario} style={{ cursor: 'pointer', justifyContent: 'space-between', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px', boxSizing: 'border-box', gap: '16px', margin: '0 auto', borderRadius: '16px',  maxWidth: '500px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f1f1' }} />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#373737', }}>Agregar Reseña</p>
          <ion-icon style={{ fontSize: '24px' }} name="add-circle-outline"></ion-icon>
        </div>

      </div>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <Star stars={1} tamaño={'28'} />
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#373737', }}>{result?.data?.getCalificacionOpiniones}</p>
          <p style={{ fontSize: '14px', marginTop: '4px' }} className={styles.textCategory} > · ({data?.getOpiniones.length} reseñas)</p>
        </div>
      </div>
      {data?.getOpiniones.map(reseña => (
        <Reseña reseña={reseña} />
      ))}
      {/* {visibleOpinion &&
        <div className={styles.modal}>
          <ModalCreateOpinion setVisibleOpinion={setVisibleOpinion} setCalificated={setCalificated} setVisibleModalLogin={setVisibleModalLogin} />
        </div>} */}
     
    </>
  )
}