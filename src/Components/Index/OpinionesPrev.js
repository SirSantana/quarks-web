import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries"
import { useLazyQuery, useQuery } from "@apollo/client"
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect } from "react"


const Star = ({ index, stars, tamaño }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]

export default function OpinionesPrev({id}) {
  const [getCalificacionOpiniones,result] = useLazyQuery(GET_CALIFICACION_OPINIONES, )
  useEffect(()=>{
    getCalificacionOpiniones({ variables: { id: id } })
  },[id])
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
      {estrellas.map((el, index) => (
        <div key={index} id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
          <Star index={index} stars={result?.data?.getCalificacionOpiniones} tamaño={'16'} />
        </div>
      ))}
      <p className={styles.textCategory} >{result?.data?.getCalificacionOpiniones} </p>
    </div>
  )
}