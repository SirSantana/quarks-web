import { GET_OPINIONES } from "@/graphql/queries"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import styles from '@/styles/Almacenes.module.css'


const Star = ({ index, calificacion }) => {
  return (
    <img src={calificacion < index + 1 ? `../star-outline.svg` : `../star.svg`} style={{ height: '16px', width: '16px' }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function Opinion({ almacen, setCalificated, setNumCalificaciones}) {
  const [getOpiniones, result] = useLazyQuery(GET_OPINIONES)
  const [email, setEmail] = useState(null)



  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  }, [])
  useEffect(() => {
    if (almacen) {
      getOpiniones({ variables: { id: almacen } })
    }
  }, [almacen])
  if(result?.data?.getOpiniones){
    setNumCalificaciones(result?.data?.getOpiniones?.length)
  }
  return (
    <>
      <button style={{ width: '180px',gap:'16px', fontSize: '14px', alignSelf:'flex-start', borderRadius:'50px', margin:'16px 0', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}} className={styles.button}>
      {result?.data?.getOpiniones?.length + ' opiniones'}
      <img src={`../arrowDown.svg`} style={{ height: '24px', width: '24px', marginRight: '8px' }} />
      </button>
      {
        result?.data?.getOpiniones?.map(opinion => {
          const fecha = new Date(opinion?.fecha).toLocaleDateString()
          if(opinion.email === email){
            setCalificated(true)
          }
          
          return (
            <>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent:'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                {estrellas.map((el, index) => (
                  <div id={index} style={{ marginRight: '8px'}}  >
                    <Star index={index} calificacion={opinion?.calificacion} />
                  </div>
                ))}
                </div>
                <h6 className={styles.subtitle2} style={{ color: '#6D6D6D', justifySelf: 'end', margin: 0 }}> {opinion.email } · {fecha}</h6>

              </div>
              <h6 className={styles.subtitle2} style={{ margin: '4px 0', fontSize: '14px', color: '#373737', alignSelf: 'flex-start' }}>{opinion?.descripcion}</h6>
              <div style={{ backgroundColor: '#d9d9d9', height: '1px', width: '100%', margin: '16px 0' }} />

            </>
          )

        })
      }
    </>

  )
}