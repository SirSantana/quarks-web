import styles from '@/styles/ServiciosAutomotriz.module.css'
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useState } from 'react'

const Star = ({ index, stars, tamaño, }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]

export default function Reseñas({id,numeroCalificacionesMaps}) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: id } })
  const [numCalificaciones, setNumCalificaciones] = useState(0)

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Reseñas </h2>

      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          <p style={{ fontSize: '32px', fontWeight: '700', color: '#373737' }}>{result?.data?.getCalificacionOpiniones}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
            {estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                <Star index={index} stars={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={'20'} />
              </div>
            ))}
            <p style={{ color: '#5c5c5c', fontSize: '12px' }} className={styles.textCategory} > ({Number(numeroCalificacionesMaps) + Number(numCalificaciones)} reseñas)</p>
          </div>
        </div>
      </div>
      <div style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <img style={{ width: '48px', height: '48px', borderRadius: '50%' }} src="https://lh3.googleusercontent.com/a-/AD_cMMSjO8CgcwXvRQtbEtCCZVmH3rSIaSEbz8VDvCu65_1FT2Q=w41-h41-p-rp-mo-br100" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '16px', fontWeight: '600' }}>Jesus Rodriguez</p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {estrellas.map((el, index) => (
                  <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={Math.round(numeroCalificacionesMaps)} tamaño={'16'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '22px', color: '#5c5c5c' }}>
            Soy cliente hace varios años , la atención es buena , la mano de obra es costosa (deberian revisar este tema y desglosar más las actividades ) , usan repuestos originales y conocen la marca Subaru . Lo puedo recomendar. Punto de referencia positiva al sr Jaime quien coordina la atención con seriedad y responsabilidad
          </p>
        </div>
      </div>

      <div style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <img style={{ width: '48px', height: '48px', borderRadius: '50%' }} src="https://lh3.googleusercontent.com/a-/AD_cMMSjO8CgcwXvRQtbEtCCZVmH3rSIaSEbz8VDvCu65_1FT2Q=w41-h41-p-rp-mo-br100" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '16px', fontWeight: '600' }}>Andres Gutierrez</p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {estrellas.map((el, index) => (
                  <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={5} tamaño={'16'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '22px', color: '#5c5c5c' }}>
            Soy cliente hace varios años , la atención es buena ,  y responsabilidad
          </p>
        </div>
      </div>
    </>
  )
}